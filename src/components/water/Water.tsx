import { useEffect, useRef, useState } from "react";
import { startWater, WaterRenderer } from "@/logic/water/renderer";
import { lighting } from "@/logic/water/timeOfDay";

function formatHour(hour: number) {
  const hh = Math.floor(hour);
  const mm = String(Math.round((hour - hh) * 60) % 60).padStart(2, "0");
  return `${hh}:${mm} · ${lighting(hour).phase}`;
}

// По умолчанию — местное время. ?t=18.5 фиксирует час, ?debug показывает ползунок.
export default function Water() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<WaterRenderer | null>(null);
  const [debugHour, setDebugHour] = useState<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const fixedHour = params.has("t") ? Number(params.get("t")) : null;
    const renderer = startWater(canvasRef.current!, fixedHour);
    rendererRef.current = renderer;
    if (params.has("debug")) {
      const d = new Date();
      setDebugHour(fixedHour ?? d.getHours() + d.getMinutes() / 60);
    }
    return () => {
      renderer.dispose();
      rendererRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (debugHour !== null) rendererRef.current?.setTimeOfDay(debugHour);
  }, [debugHour]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-label="Doodle water"
        style={{ position: "fixed", inset: 0, display: "block", width: "100vw", height: "100vh", background: "#2bb3c0" }}
      />
      {debugHour !== null && (
        <label
          style={{
            position: "fixed",
            left: 16,
            right: 16,
            bottom: 16,
            display: "flex",
            gap: 12,
            alignItems: "center",
            font: "14px/1.2 system-ui, sans-serif",
            color: "#fff",
            background: "#0008",
            padding: "8px 12px",
            borderRadius: 8,
          }}
        >
          <input
            type="range"
            min={0}
            max={24}
            step={0.05}
            value={debugHour}
            onChange={(e) => setDebugHour(Number(e.target.value))}
            style={{ flex: 1 }}
          />
          <span style={{ minWidth: "9em", fontVariantNumeric: "tabular-nums" }}>{formatHour(debugHour)}</span>
        </label>
      )}
    </>
  );
}
