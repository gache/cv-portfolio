import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Erick Franco — QA Automation Engineer & Java Spring Boot Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090B",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Grid pattern */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(129,140,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(129,140,248,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px", display: "flex" }} />

        {/* Accent glow */}
        <div style={{ position: "absolute", top: 200, left: 60, width: 400, height: 400, background: "rgba(129,140,248,0.06)", borderRadius: "50%", filter: "blur(80px)", display: "flex" }} />

        {/* EF_ logo */}
        <div style={{ color: "#818CF8", fontSize: 20, fontWeight: 700, fontFamily: "monospace", marginBottom: 48, letterSpacing: 2, display: "flex" }}>
          EF_
        </div>

        {/* Name */}
        <div style={{ fontSize: 72, fontWeight: 800, color: "#FAFAFA", lineHeight: 1, marginBottom: 20, display: "flex" }}>
          Erick Franco
        </div>

        {/* Title */}
        <div style={{ fontSize: 28, color: "#818CF8", fontWeight: 500, marginBottom: 32, display: "flex" }}>
          QA Automation Engineer &amp; Java Spring Boot Developer
        </div>

        {/* Location */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#71717A", fontSize: 18, fontFamily: "monospace" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ADE80", display: "flex" }} />
          Lille, France · Remote OK
        </div>

        {/* Bottom right terminal */}
        <div style={{ position: "absolute", bottom: 48, right: 80, color: "#3F3F46", fontSize: 64, fontFamily: "monospace", fontWeight: 700, display: "flex" }}>
          $_
        </div>
      </div>
    ),
    { ...size }
  );
}
