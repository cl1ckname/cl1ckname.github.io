import { ChangeEvent, ReactNode, useState } from "react";

export function UnitConverter() {
	const [wei, setWei] = useState("1000000000000000000");

	const createUnitHandler = (exponent: number) => ({
		value: exponent === 18 ? wei : convertFromWei(wei, exponent),
		onChange: (val: string) => setWei(convertToWei(val, exponent)),
	});

	return (
		<fieldset className="unit-converter">
			<legend>Unit converter</legend>
			<UnitConverterField
				label=<span>
					Wei (10<sup>-18</sup>)
				</span>
				val={createUnitHandler(18).value}
				setVal={createUnitHandler(18).onChange}
				exponent={18}
			/>
			<UnitConverterField
				label=<span>
					Gwei (10<sup>-9</sup>)
				</span>
				val={createUnitHandler(9).value}
				setVal={createUnitHandler(9).onChange}
				exponent={9}
			/>
			<UnitConverterField
				label=<span>Eth (1)</span>
				val={createUnitHandler(0).value}
				setVal={createUnitHandler(0).onChange}
				exponent={0}
			/>
		</fieldset>
	);
}

const convertFromWei = (weiValue: string, exponent: number): string => {
	try {
		const weiBigInt = BigInt(weiValue);
		const exponentDiff = 18 - exponent;
		const divisor = BigInt(10 ** exponentDiff);
		const result = weiBigInt / divisor;

		if (exponentDiff <= 0) {
			return result.toString();
		}

		const remainder = weiBigInt % divisor;
		if (remainder === 0n) {
			return result.toString();
		}

		const fraction = remainder
			.toString()
			.padStart(exponentDiff, "0")
			.replace(/0+$/, "");
		return fraction ? `${result}.${fraction}` : result.toString();
	} catch {
		return "0";
	}
};

const convertToWei = (value: string, exponent: number): string => {
	try {
		const [integer, fraction = ""] = value.split(".");
		const exponentDiff = 18 - exponent;

		if (exponentDiff <= 0) {
			const integerBigInt = BigInt(integer || "0");
			const multiplier = BigInt(10 ** -exponentDiff);
			return (integerBigInt * multiplier).toString();
		}

		const paddedFraction = fraction
			.padEnd(exponentDiff, "0")
			.slice(0, exponentDiff);
		const integerBigInt = BigInt(integer || "0");
		const fractionBigInt = BigInt(paddedFraction || "0");
		const integerWei = integerBigInt * BigInt(10 ** exponentDiff);

		return (integerWei + fractionBigInt).toString();
	} catch {
		return "0";
	}
};

function UnitConverterField(props: {
	label: ReactNode;
	val: string;
	setVal: (val: string) => void;
	exponent: number;
}) {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const rawValue = e.target.value;

		if (props.exponent === 18) {
			const cleanedValue = rawValue.replace(/[^0-9]/g, "");
			props.setVal(cleanedValue);
			return;
		}
		if (rawValue === "" || rawValue === "." || rawValue === "-.") {
			props.setVal(rawValue);
			return;
		}

		if (!/^-?\d*\.?\d*$/.test(rawValue)) {
			return;
		}

		if (rawValue.includes(".")) {
			const parts = rawValue.split(".");
			if (parts.length > 2) {
				return;
			}
			if (parts[1] && parts[1].length > 18 - props.exponent) {
				return;
			}
		}

		props.setVal(rawValue);
	};

	return (
		<div className={"unit-converter-field"}>
			<CopyButton value={props.val} />
			<input
				onChange={handleChange}
				value={props.val}
				type="text"
				inputMode="decimal"
			/>
			<label>{props.label}</label>
		</div>
	);
}

function CopyButton({ value }: { value: string }) {
	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(value);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	return (
		<button type="button" onClick={handleCopy}>
			Copy
		</button>
	);
}
