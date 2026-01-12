import { useState, useEffect } from "react";

export function UnixTimeConverter() {
	const [unixTime, setUnixTime] = useState<number>(
		Math.floor(Date.now() / 1000),
	);
	const [dateStr, setDateStr] = useState<string>("");

	useEffect(() => {
		updateDate(unixTime);
	}, [unixTime]);

	const updateDate = (time: number) => {
		const d = new Date(time * 1000);
		const formatted =
			`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ` +
			`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
		setDateStr(formatted);
	};

	const pad = (n: number) => n.toString().padStart(2, "0");

	const handleChange = (value: string) => {
		const num = parseInt(value, 10);
		if (!isNaN(num)) setUnixTime(num);
	};

	const copy = () => navigator.clipboard.writeText(unixTime.toString());

	return (
		<fieldset className="unix-converter">
			<legend>Unix Time Converter</legend>

			<div className="unix-converter-row">
				<input
					type="number"
					value={unixTime}
					onChange={(e) => handleChange(e.target.value)}
				/>
				<button type="button" onClick={copy}>
					Copy
				</button>
			</div>

			<div className="unix-converter-row">
				<input readOnly value={dateStr} />
			</div>
		</fieldset>
	);
}
