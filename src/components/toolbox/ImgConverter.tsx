import { useEffect, useRef, useState } from "react";

type ImageFormat = "png" | "jpg" | "webp";

export function ImgConverter() {
	const [file, setFile] = useState<File | null>(null);
	const [sourceFormat, setSourceFormat] = useState<ImageFormat | null>(null);
	const [targetFormat, setTargetFormat] = useState<ImageFormat>("png");
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		if (!file) {
			setPreviewUrl(null);
			return;
		}

		const url = URL.createObjectURL(file);
		setPreviewUrl(url);

		return () => URL.revokeObjectURL(url);
	}, [file]);

	const handleFileChange = (selected: File | null) => {
		if (!selected) {
			setFile(null);
			setSourceFormat(null);
			return;
		}

		const format = getFormatFromFileName(selected.name);
		setFile(selected);
		setSourceFormat(format);
		setTargetFormat(format);
	};

	const convert = async () => {
		if (!file || !sourceFormat) {
			return;
		}

		const image = await loadImage(previewUrl!);
		const canvas = canvasRef.current!;
		const ctx = canvas.getContext("2d")!;

		canvas.width = image.width;
		canvas.height = image.height;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		if (targetFormat === "jpg") {
			ctx.fillStyle = "#ffffff";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		}

		ctx.drawImage(image, 0, 0);

		const blob = await canvasToBlob(canvas, targetFormat);
		const name = replaceExtension(file.name, targetFormat);

		download(blob, name);
	};

	return (
		<fieldset className="image-format-converter">
			<legend>Image Format Converter</legend>

			<input
				type="file"
				accept="image/png,image/jpeg,image/webp"
				onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
			/>

			<div className="image-format-converter-preview-container">
				{previewUrl ? (
					<img
						className="image-format-converter-preview"
						src={previewUrl}
						alt=""
					/>
				) : (
					<div className="image-format-converter-preview-placeholder" />
				)}
			</div>

			<div className="image-format-converter-controls">
				<select
					value={targetFormat}
					onChange={(e) => setTargetFormat(e.target.value as ImageFormat)}
					disabled={!sourceFormat}
				>
					<option value="png">png</option>
					<option value="jpg">jpg</option>
					<option value="webp">webp</option>
				</select>

				<button type="button" onClick={convert} disabled={!file}>
					Download
				</button>
			</div>

			<canvas ref={canvasRef} hidden />
		</fieldset>
	);
}

function getFormatFromFileName(name: string): ImageFormat {
	const ext = name.split(".").pop()?.toLowerCase();

	if (ext === "jpg" || ext === "jpeg") return "jpg";
	if (ext === "png") return "png";
	if (ext === "webp") return "webp";

	throw new Error("Unsupported format");
}

function loadImage(src: string): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = reject;
		img.src = src;
	});
}

function canvasToBlob(
	canvas: HTMLCanvasElement,
	format: ImageFormat,
): Promise<Blob> {
	const mimeMap: Record<ImageFormat, string> = {
		png: "image/png",
		jpg: "image/jpeg",
		webp: "image/webp",
	};

	return new Promise((resolve) => {
		canvas.toBlob((blob) => resolve(blob!), mimeMap[format]);
	});
}

function replaceExtension(name: string, format: ImageFormat): string {
	return name.replace(/\.[^.]+$/, `.${format}`);
}

function download(blob: Blob, name: string) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = name;
	a.click();
	URL.revokeObjectURL(url);
}
