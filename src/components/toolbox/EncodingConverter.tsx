import { useCallback, useState } from "react";

type Encoding = "utf8" | "hex" | "base64";

export function EncodingConverter() {
	const [leftValue, setLeftValue] = useState("");
	const [rightValue, setRightValue] = useState("");
	const [leftEncoding, setLeftEncoding] = useState<Encoding>("utf8");
	const [rightEncoding, setRightEncoding] = useState<Encoding>("hex");
	const [leftError, setLeftError] = useState<string | null>(null);
	const [rightError, setRightError] = useState<string | null>(null);

	const syncFromLeft = useCallback(
		(value: string) => {
			setLeftValue(value);
			try {
				validate(value, leftEncoding);
				const bytes = decode(value, leftEncoding);
				setRightValue(encode(bytes, rightEncoding));
				setLeftError(null);
				setRightError(null);
			} catch (e) {
				setLeftError((e as Error).message);
				setRightValue("");
			}
		},
		[leftEncoding, rightEncoding],
	);

	const syncFromRight = useCallback(
		(value: string) => {
			setRightValue(value);
			try {
				validate(value, rightEncoding);
				const bytes = decode(value, rightEncoding);
				setLeftValue(encode(bytes, leftEncoding));
				setRightError(null);
				setLeftError(null);
			} catch (e) {
				setRightError((e as Error).message);
				setLeftValue("");
			}
		},
		[leftEncoding, rightEncoding],
	);

	const handleLeftEncodingChange = (encoding: Encoding) => {
		setLeftEncoding(encoding);
		syncFromLeft(leftValue);
		setLeftError(null);
	};

	const handleRightEncodingChange = (encoding: Encoding) => {
		setRightEncoding(encoding);
		syncFromRight(rightValue);
		setRightError(null);
	};

	const copy = (value: string) => {
		navigator.clipboard.writeText(value);
	};

	return (
		<fieldset className="encoding-converter">
			<legend>Encoding Converter</legend>

			<div className="encoding-converter-column">
				<div className="encoding-converter-controls">
					<select
						value={leftEncoding}
						onChange={(e) =>
							handleLeftEncodingChange(e.target.value as Encoding)
						}
					>
						<option value="utf8">utf8</option>
						<option value="hex">hex</option>
						<option value="base64">base64</option>
					</select>
					<button type="button" onClick={() => copy(leftValue)}>
						Copy
					</button>
				</div>

				<textarea
					value={leftValue}
					aria-invalid={Boolean(leftError)}
					onChange={(e) => syncFromLeft(e.target.value)}
				/>
			</div>

			<div className="encoding-converter-column">
				<div className="encoding-converter-controls">
					<select
						value={rightEncoding}
						onChange={(e) =>
							handleRightEncodingChange(e.target.value as Encoding)
						}
					>
						<option value="utf8">utf8</option>
						<option value="hex">hex</option>
						<option value="base64">base64</option>
					</select>
					<button type="button" onClick={() => copy(rightValue)}>
						Copy
					</button>
				</div>

				<textarea
					value={rightValue}
					aria-invalid={Boolean(rightError)}
					onChange={(e) => syncFromRight(e.target.value)}
				/>
			</div>
		</fieldset>
	);
}

function validate(value: string, encoding: Encoding): void {
	if (value === "") {
		return;
	}

	switch (encoding) {
		case "hex":
			if (!/^[0-9a-fA-F\s]*$/.test(value)) {
				throw new Error("Invalid hex");
			}
			if (value.replace(/\s+/g, "").length % 2 !== 0) {
				throw new Error("Invalid hex length");
			}
			return;

		case "base64":
			if (!/^[A-Za-z0-9+/=\s]*$/.test(value)) {
				throw new Error("Invalid base64");
			}
			atob(value.replace(/\s+/g, ""));
			return;

		case "utf8":
			return;
	}
}

function decode(value: string, encoding: Encoding): Uint8Array {
	switch (encoding) {
		case "utf8":
			return utf8ToBytes(value);
		case "hex":
			return hexToBytes(value);
		case "base64":
			return base64ToBytes(value);
	}
}

function encode(bytes: Uint8Array, encoding: Encoding): string {
	switch (encoding) {
		case "utf8":
			return bytesToUtf8(bytes);
		case "hex":
			return bytesToHex(bytes);
		case "base64":
			return bytesToBase64(bytes);
	}
}

function utf8ToBytes(value: string): Uint8Array {
	return new TextEncoder().encode(value);
}

function bytesToUtf8(bytes: Uint8Array): string {
	return new TextDecoder().decode(bytes);
}

function bytesToHex(bytes: Uint8Array): string {
	return Array.from(bytes)
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
}

function hexToBytes(hex: string): Uint8Array {
	const normalized = hex.replace(/\s+/g, "");
	if (normalized.length % 2 !== 0) {
		throw new Error("Invalid hex");
	}

	const bytes = new Uint8Array(normalized.length / 2);
	for (let i = 0; i < bytes.length; i++) {
		bytes[i] = parseInt(normalized.slice(i * 2, i * 2 + 2), 16);
	}
	return bytes;
}

function bytesToBase64(bytes: Uint8Array): string {
	let binary = "";
	bytes.forEach((b) => (binary += String.fromCharCode(b)));
	return btoa(binary);
}

function base64ToBytes(value: string): Uint8Array {
	const binary = atob(value);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) {
		bytes[i] = binary.charCodeAt(i);
	}
	return bytes;
}
