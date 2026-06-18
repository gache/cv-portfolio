import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: 32,
        height: 32,
        background: "#09090B",
        borderRadius: 7,
        border: "1px solid rgba(129,140,248,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <span
        style={{
          color: "#818CF8",
          fontFamily: "monospace",
          fontSize: 13,
          fontWeight: 800,
          letterSpacing: -0.5,
        }}
      >
        EF
      </span>
      <span
        style={{
          position: "absolute",
          top: 1,
          right: 3,
          color: "#4ADE80",
          fontSize: 9,
          fontWeight: 700,
          lineHeight: "1",
        }}
      >
        ✓
      </span>
    </div>,
    { ...size }
  );
}
