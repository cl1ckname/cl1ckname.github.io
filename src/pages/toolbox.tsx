import "@/styles/toolbox.css";
import {
	UnitConverter,
	EncodingConverter,
	BaseConverter,
	ImgConverter,
	Pub2Addr,
	PrivToPub,
	UnixTimeConverter,
	RandomFields,
	ColorConverter,
} from "@/components/toolbox";

export default function() {
	return (
		<div>
			<h1>Clickname's toolbox</h1>
			<div className="converters">
				<EncodingConverter />
				<UnitConverter />
				<BaseConverter />
				<Pub2Addr />
				<PrivToPub />
				<ImgConverter />
				<UnixTimeConverter />
				<RandomFields />
				<ColorConverter />
			</div>
		</div>
	);
}
