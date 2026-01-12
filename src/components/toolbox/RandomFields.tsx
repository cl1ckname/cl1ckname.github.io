import { useState } from "react";

export function RandomFields() {
	const [uuid, setUuid] = useState(generateUuid());
	const [number, setNumber] = useState(generateNumber());
	const [color, setColor] = useState(generateColor());

	function generateAll() {
		setUuid(generateUuid());
		setNumber(generateNumber());
		setColor(generateColor());
	}

	const copy = (value: string | number) =>
		navigator.clipboard.writeText(value.toString());

	return (
		<fieldset className="random-generator">
			<legend>Random Data Generator</legend>

			<div className="random-generator-row">
				<input readOnly value={uuid} />
				<button type="button" onClick={() => copy(uuid)}>
					Copy
				</button>
			</div>

			<div className="random-generator-row">
				<input readOnly value={number} />
				<button type="button" onClick={() => copy(number)}>
					Copy
				</button>
			</div>

			<div className="random-generator-row">
				<input readOnly value={color} />
				<button type="button" onClick={() => copy(color)}>
					Copy
				</button>
			</div>

			<button type="button" onClick={generateAll}>
				Regenerate
			</button>
		</fieldset>
	);
}

// ---------------- Helpers ----------------

function generateUuid() {
	return crypto.randomUUID() || "00000000-0000-0000-0000-000000000000";
}

function generateNumber() {
	return Math.floor(Math.random() * 100) + 1;
}

function generateColor() {
	const n = Math.floor(Math.random() * 0xffffff);
	return `#${n.toString(16).padStart(6, "0")}`;
}
