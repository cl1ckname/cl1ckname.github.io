import { useState } from "react";
import { keccak256 } from "ethereum-cryptography/keccak.js";
import { sha256 } from "ethereum-cryptography/sha256.js";
import { ripemd160 } from "ethereum-cryptography/ripemd160.js";
import { toHex, hexToBytes } from "ethereum-cryptography/utils.js";
import { ec as EC } from "elliptic";
import { bech32 } from "bech32";
import base58 from "bs58";

const secp = new EC("secp256k1");

export function Pub2Addr() {
	const [compressedPubKey, setCompressedPubKey] = useState("");
	const [uncompressedPubKey, setUncompressedPubKey] = useState("");
	const [addrEth, setAddrEth] = useState("");
	const [addrTron, setAddrTron] = useState("");
	const [addrBtc, setAddrBtc] = useState("");
	const [error, setError] = useState<string | null>(null);

	const handleCompressedInput = (hex: string) => {
		setCompressedPubKey(hex);
		setUncompressedPubKey(""); // сбрасываем другое поле
		setError(null);

		try {
			validateCompressedPubKey(hex);
			const bytes = hexToBytes(hex);
			const uncompressed = Uint8Array.from(
				secp.keyFromPublic(bytes, "hex").getPublic(false, "array"),
			);
			setUncompressedPubKey(toHex(uncompressed));
			updateAddresses(uncompressed);
		} catch (e) {
			clearAddresses();
			setError((e as Error).message);
		}
	};

	const handleUncompressedInput = (hex: string) => {
		setUncompressedPubKey(hex);
		setCompressedPubKey(""); // сбрасываем другое поле
		setError(null);

		try {
			validateUncompressedPubKey(hex);
			const bytes = hexToBytes(hex);
			const compressed = Uint8Array.from(
				secp.keyFromPublic(bytes, "hex").getPublic(true, "array"),
			);
			setCompressedPubKey(toHex(compressed));
			updateAddresses(bytes);
		} catch (e) {
			clearAddresses();
			setError((e as Error).message);
		}
	};

	function clearAddresses() {
		setAddrEth("");
		setAddrTron("");
		setAddrBtc("");
	}

	function updateAddresses(uncompressed: Uint8Array) {
		setAddrEth(pubToEth(uncompressed));
		setAddrTron(pubToTron(uncompressed));
		setAddrBtc(pubToBtcSegWit(uncompressed));
	}

	const copy = (v: string) => navigator.clipboard.writeText(v);

	return (
		<fieldset className="ecdsa-converter">
			<legend>ECDSA Pubkey to address</legend>

			<div className="ecdsa-converter-row">
				<input
					placeholder="compressed public key (hex)"
					value={compressedPubKey}
					onChange={(e) => handleCompressedInput(e.target.value)}
				/>
				<button onClick={() => copy(compressedPubKey)}>Copy</button>
			</div>

			<div className="ecdsa-converter-row">
				<input
					placeholder="uncompressed public key (hex)"
					value={uncompressedPubKey}
					onChange={(e) => handleUncompressedInput(e.target.value)}
				/>
				<button onClick={() => copy(uncompressedPubKey)}>Copy</button>
			</div>

			{error && <div className="ecdsa-converter-error">{error}</div>}

			<div className="ecdsa-converter-row">
				<input readOnly value={addrEth} />
				<button onClick={() => copy(addrEth)}>Copy</button>
			</div>

			<div className="ecdsa-converter-row">
				<input readOnly value={addrTron} />
				<button onClick={() => copy(addrTron)}>Copy</button>
			</div>

			<div className="ecdsa-converter-row">
				<input readOnly value={addrBtc} />
				<button onClick={() => copy(addrBtc)}>Copy</button>
			</div>
		</fieldset>
	);
}

function validateCompressedPubKey(hex: string) {
	if (!/^[0-9a-fA-F]+$/.test(hex)) throw new Error("Invalid hex");
	if (hex.length !== 66)
		throw new Error("Compressed pubkey must be 33 bytes (66 hex)");
}

function validateUncompressedPubKey(hex: string) {
	if (!/^[0-9a-fA-F]+$/.test(hex)) throw new Error("Invalid hex");
	if (hex.length !== 130 || !hex.startsWith("04"))
		throw new Error(
			"Uncompressed public key must be 65 bytes (130 hex, prefix 04)",
		);
}

function pubToEth(uncompressed: Uint8Array): string {
	const hash = keccak256(uncompressed.slice(1));
	return "0x" + toHex(hash.slice(-20));
}

function pubToTron(uncompressed: Uint8Array): string {
	const ethNo0x = toHex(keccak256(uncompressed.slice(1)).slice(-20));
	const tronBytes = Uint8Array.from([0x41, ...hexToBytes(ethNo0x)]);
	const checksum = sha256(sha256(tronBytes));
	return base58.encode(Uint8Array.from([...tronBytes, ...checksum.slice(0, 4)]));
}

function pubToBtcSegWit(uncompressed: Uint8Array): string {
	const sha = sha256(uncompressed);
	const ripe = ripemd160(sha);
	const words = bech32.toWords(ripe);
	return bech32.encode("bc", words);
}
