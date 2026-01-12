import { useEffect, useState } from "react";

export function ColorConverter() {
	const [hexInput, setHexInput] = useState("#ff0000");
	const [rgbInput, setRgbInput] = useState("255,0,0");
	const [hsvInput, setHsvInput] = useState("0,100,100");

	const [hexValid, setHexValid] = useState(true);
	const [rgbValid, setRgbValid] = useState(true);
	const [hsvValid, setHsvValid] = useState(true);

	useEffect(() => {
		handleHexChange(generateColor());
	}, []);

	const handleHexChange = (value: string) => {
		setHexInput(value);
		const valid = isValidHex(value);
		setHexValid(valid);
		if (valid) {
			const [r, g, b] = hexToRgb(value);
			setRgbInput(`${r},${g},${b}`);
			const [h, s, v] = rgbToHsv(r, g, b);
			setHsvInput(`${h},${s},${v}`);
		}
	};

	const handleRgbChange = (value: string) => {
		setRgbInput(value);
		const valid = isValidRgb(value);
		setRgbValid(valid);
		if (valid) {
			const parts = value.split(",").map((p) => parseInt(p.trim()));
			const [r, g, b] = parts;
			setHexInput(rgbToHex(r, g, b));
			const [h, s, v] = rgbToHsv(r, g, b);
			setHsvInput(`${h},${s},${v}`);
		}
	};

	const handleHsvChange = (value: string) => {
		setHsvInput(value);
		const valid = isValidHsv(value);
		setHsvValid(valid);
		if (valid) {
			const parts = value.split(",").map((p) => parseFloat(p.trim()));
			const [r, g, b] = hsvToRgb(parts[0], parts[1], parts[2]);
			setRgbInput(`${r},${g},${b}`);
			setHexInput(rgbToHex(r, g, b));
		}
	};

	return (
		<fieldset className="color-converter">
			<legend>Color Converter</legend>

			<div className="color-converter-row-wrapper">
				<div
					className="color-converter-preview"
					style={{ backgroundColor: hexValid ? hexInput : "#fff" }}
				/>
				<div className="color-converter-fields">
					<div className="color-converter-row">
						<label>HEX:</label>
						<input
							value={hexInput}
							onChange={(e) => handleHexChange(e.target.value)}
							className={hexValid ? "" : "invalid"}
						/>
					</div>

					<div className="color-converter-row">
						<label>RGB:</label>
						<input
							value={rgbInput}
							onChange={(e) => handleRgbChange(e.target.value)}
							className={rgbValid ? "" : "invalid"}
						/>
					</div>

					<div className="color-converter-row">
						<label>HSV:</label>
						<input
							value={hsvInput}
							onChange={(e) => handleHsvChange(e.target.value)}
							className={hsvValid ? "" : "invalid"}
						/>
					</div>
				</div>
			</div>
		</fieldset>
	);
}

// ---------------- Helpers ----------------

function hexToRgb(hex: string): [number, number, number] {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return [r, g, b];
}

function rgbToHex(r: number, g: number, b: number): string {
	return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
	r /= 255;
	g /= 255;
	b /= 255;
	const max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	let h = 0,
		s = 0,
		v = max;
	const d = max - min;
	s = max === 0 ? 0 : d / max;
	if (d !== 0) {
		if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
		else if (max === g) h = (b - r) / d + 2;
		else h = (r - g) / d + 4;
		h *= 60;
	}
	return [Math.round(h), Math.round(s * 100), Math.round(v * 100)];
}

function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
	s /= 100;
	v /= 100;
	const c = v * s;
	const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
	const m = v - c;
	let r1 = 0,
		g1 = 0,
		b1 = 0;

	if (0 <= h && h < 60) [r1, g1, b1] = [c, x, 0];
	else if (60 <= h && h < 120) [r1, g1, b1] = [x, c, 0];
	else if (120 <= h && h < 180) [r1, g1, b1] = [0, c, x];
	else if (180 <= h && h < 240) [r1, g1, b1] = [0, x, c];
	else if (240 <= h && h < 300) [r1, g1, b1] = [x, 0, c];
	else[r1, g1, b1] = [c, 0, x];

	return [
		Math.round((r1 + m) * 255),
		Math.round((g1 + m) * 255),
		Math.round((b1 + m) * 255),
	];
}

// ---------------- Validation ----------------

function isValidHex(value: string) {
	return /^#([0-9a-fA-F]{0,6})$/.test(value);
}

function isValidRgb(value: string) {
	const parts = value.split(",").map((p) => parseInt(p.trim()));
	return (
		parts.length <= 3 && parts.every((p) => (p >= 0 && p <= 255) || isNaN(p))
	);
}

function isValidHsv(value: string) {
	const parts = value.split(",").map((p) => parseFloat(p.trim()));
	return parts.length <= 3 && parts.every((p) => !isNaN(p));
}

function generateColor() {
	const n = Math.floor(Math.random() * 0xffffff);
	return `#${n.toString(16).padStart(6, "0")}`;
}
