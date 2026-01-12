import { useCallback, useState } from "react";

type Base = "bin" | "oct" | "dec" | "hex";

export function BaseConverter() {
	const [topValue, setTopValue] = useState("");
	const [bottomValue, setBottomValue] = useState("");
	const [topBase, setTopBase] = useState<Base>("dec");
	const [bottomBase, setBottomBase] = useState<Base>("hex");
	const [topError, setTopError] = useState<string | null>(null);
	const [bottomError, setBottomError] = useState<string | null>(null);

	const syncFromTop = useCallback(
		(value: string) => {
			setTopValue(value);

			try {
				validate(value, topBase);
				const decimal = parseToDecimal(value, topBase);
				setBottomValue(formatFromDecimal(decimal, bottomBase));
				setTopError(null);
				setBottomError(null);
			} catch (e) {
				setTopError((e as Error).message);
				setBottomValue("");
			}
		},
		[topBase, bottomBase],
	);

	const syncFromBottom = useCallback(
		(value: string) => {
			setBottomValue(value);

			try {
				validate(value, bottomBase);
				const decimal = parseToDecimal(value, bottomBase);
				setTopValue(formatFromDecimal(decimal, topBase));
				setBottomError(null);
				setTopError(null);
			} catch (e) {
				setBottomError((e as Error).message);
				setTopValue("");
			}
		},
		[topBase, bottomBase],
	);

	const handleTopBaseChange = (base: Base) => {
		setTopBase(base);
		setTopError(null);
		setBottomError(null);
		syncFromTop(topValue);
	};

	const handleBottomBaseChange = (base: Base) => {
		setBottomBase(base);
		setTopError(null);
		setBottomError(null);
		syncFromBottom(bottomValue);
	};

	const copy = (value: string) => {
		navigator.clipboard.writeText(value);
	};

	return (
		<fieldset className="number-base-converter">
			<legend>Number Base Converter</legend>

			<div className="number-base-converter-row">
				<div className="number-base-converter-controls">
					<select
						value={topBase}
						onChange={(e) => handleTopBaseChange(e.target.value as Base)}
					>
						<option value="bin">bin</option>
						<option value="oct">oct</option>
						<option value="dec">dec</option>
						<option value="hex">hex</option>
					</select>
					<button type="button" onClick={() => copy(topValue)}>
						Copy
					</button>
				</div>
				<input
					type="text"
					value={topValue}
					aria-invalid={Boolean(topError)}
					onChange={(e) => syncFromTop(e.target.value)}
				/>
			</div>

			<div className="number-base-converter-row">
				<div className="number-base-converter-controls">
					<select
						value={bottomBase}
						onChange={(e) => handleBottomBaseChange(e.target.value as Base)}
					>
						<option value="bin">bin</option>
						<option value="oct">oct</option>
						<option value="dec">dec</option>
						<option value="hex">hex</option>
					</select>
					<button type="button" onClick={() => copy(bottomValue)}>
						Copy
					</button>
				</div>
				<input
					type="text"
					value={bottomValue}
					aria-invalid={Boolean(bottomError)}
					onChange={(e) => syncFromBottom(e.target.value)}
				/>
			</div>
		</fieldset>
	);
}

function validate(value: string, base: Base): void {
	if (value === "") {
		return;
	}

	const patterns: Record<Base, RegExp> = {
		bin: /^[01]+$/,
		oct: /^[0-7]+$/,
		dec: /^[0-9]+$/,
		hex: /^[0-9a-fA-F]+$/,
	};

	if (!patterns[base].test(value)) {
		throw new Error("Invalid number");
	}
}

function parseToDecimal(value: string, base: Base): number {
	const radixMap: Record<Base, number> = {
		bin: 2,
		oct: 8,
		dec: 10,
		hex: 16,
	};

	const result = parseInt(value, radixMap[base]);

	if (Number.isNaN(result)) {
		throw new Error("Invalid number");
	}

	return result;
}

function formatFromDecimal(value: number, base: Base): string {
	const radixMap: Record<Base, number> = {
		bin: 2,
		oct: 8,
		dec: 10,
		hex: 16,
	};

	return value.toString(radixMap[base]);
}
