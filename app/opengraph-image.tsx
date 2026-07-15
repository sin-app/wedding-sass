import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "WeddingKu — Undangan Pernikahan Digital";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e1b4f 55%, #0f172a 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 72,
            fontWeight: 700,
          }}
        >
          Wedding
          <span
            style={{
              background: "linear-gradient(to right, #22d3ee, #a78bfa)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Ku
          </span>
        </div>
        <div style={{ marginTop: 28, fontSize: 30, color: "#cbd5e1" }}>
          Undangan pernikahan digital yang elegan & cepat
        </div>
      </div>
    ),
    { ...size }
  );
}
