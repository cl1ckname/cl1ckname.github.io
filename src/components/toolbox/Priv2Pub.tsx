import { useState } from "react";
import { ec as EC } from "elliptic";
import { randomBytes } from "crypto";
import { toHex, hexToBytes } from "ethereum-cryptography/utils.js";

const secp = new EC("secp256k1");

export function PrivToPub() {
	const [privKey, setPrivKey] = useState("");
	const [pubKey, setPubKey] = useState("");
	const [error, setError] = useState<string | null>(null);

	const handleInput = (value: string) => {
		setPrivKey(value);
		setError(null);
		try {
			validatePrivKey(value);
			const pub = privToCompressedPub(hexToBytes(value));
			setPubKey(pub);
		} catch (e) {
			setPubKey("");
			setError((e as Error).message);
		}
	};

	const generateRandom = () => {
		const bytes = randomBytes(32);
		const hex = toHex(bytes);
		setPrivKey(hex);
		handleInput(hex);
	};

	const copy = (v: string) => navigator.clipboard.writeText(v);

	return (
		<fieldset className="priv-to-pub">
			<legend>Private → Compressed Public Key</legend>

			<div className="priv-to-pub-row">
				<input
					placeholder="Private key (hex)"
					value={privKey}
					onChange={(e) => handleInput(e.target.value)}
				/>
				<button type="button" onClick={generateRandom}>
					Random
				</button>
			</div>

			{error && <div className="priv-to-pub-error">{error}</div>}

			<div className="priv-to-pub-row">
				<input readOnly value={pubKey} />
				<button type="button" onClick={() => copy(pubKey)}>
					Copy
				</button>
			</div>
		</fieldset>
	);
}

function validatePrivKey(hex: string) {
	if (!/^[0-9a-fA-F]+$/.test(hex)) throw new Error("Invalid hex");
	if (hex.length !== 64)
		throw new Error("Private key must be 32 bytes (64 hex)");
}

function privToCompressedPub(privBytes: Uint8Array): string {
	const key = secp.keyFromPrivate(privBytes);
	const pub = Uint8Array.from(key.getPublic(true, "array"));
	return toHex(pub);
}
