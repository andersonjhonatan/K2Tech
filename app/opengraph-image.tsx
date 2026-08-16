import { ImageResponse } from "next/og";

export const alt = "K2 Tech — Sites, Sistemas e Soluções Digitais";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#0B0B0C",
          color: "#F5F5F7",
          display: "flex",
          fontFamily: "Arial, sans-serif",
          height: "100%",
          overflow: "hidden",
          padding: "70px 82px",
          position: "relative",
          width: "100%",
        }}
      >
        <div style={{ background: "#2563EB", borderRadius: 999, filter: "blur(30px)", height: 360, opacity: 0.18, position: "absolute", right: -80, top: -90, width: 360 }} />
        <div style={{ background: "#3B82F6", height: 2, left: 82, position: "absolute", top: 124, width: 78 }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", width: "64%" }}>
          <div style={{ color: "#3B82F6", display: "flex", fontSize: 24, fontWeight: 700, letterSpacing: 5 }}>K2 TECH</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 70, fontWeight: 700, letterSpacing: -4, lineHeight: 0.96 }}>
            <span>Ideias que viram</span>
            <span>produtos digitais</span>
            <span style={{ color: "#3B82F6" }}>de verdade.</span>
          </div>
          <div style={{ color: "#C8A96A", display: "flex", fontSize: 18, fontWeight: 700, letterSpacing: 2 }}>SITES · SISTEMAS · WEB DESIGN · EXPERIÊNCIAS</div>
        </div>
        <div style={{ alignItems: "center", display: "flex", justifyContent: "center", position: "relative", width: "36%" }}>
          <div style={{ border: "1px solid rgba(59,130,246,.45)", borderRadius: 999, height: 430, position: "absolute", width: 430 }} />
          <div style={{ border: "1px solid rgba(59,130,246,.2)", borderRadius: 999, height: 330, position: "absolute", width: 330 }} />
          <div style={{ background: "#111522", border: "1px solid #2563EB", borderRadius: 28, boxShadow: "0 24px 60px rgba(0,0,0,.45)", display: "flex", flexDirection: "column", gap: 18, height: 360, padding: 28, position: "relative", transform: "rotate(5deg)", width: 300 }}>
            <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}><span style={{ color: "#7D8BB5", display: "flex", fontSize: 12, letterSpacing: 2 }}>K2 DIGITAL</span><span style={{ background: "#3B82F6", borderRadius: 999, display: "flex", height: 9, width: 9 }} /></div>
            <div style={{ background: "#151B2C", border: "1px solid rgba(255,255,255,.08)", borderRadius: 18, display: "flex", flexDirection: "column", padding: 20 }}><span style={{ color: "#3B82F6", display: "flex", fontSize: 12, letterSpacing: 2 }}>WEB PROJECT</span><strong style={{ display: "flex", fontSize: 34, marginTop: 8 }}>Design + Code</strong></div>
            <div style={{ display: "flex", gap: 10 }}><span style={{ background: "#182033", borderRadius: 999, color: "#AAB3CB", display: "flex", fontSize: 11, padding: "8px 12px" }}>SITE</span><span style={{ background: "#182033", borderRadius: 999, color: "#AAB3CB", display: "flex", fontSize: 11, padding: "8px 12px" }}>SYSTEM</span><span style={{ background: "#182033", borderRadius: 999, color: "#AAB3CB", display: "flex", fontSize: 11, padding: "8px 12px" }}>UI</span></div>
            <div style={{ background: "#2563EB", borderRadius: 14, display: "flex", fontSize: 12, fontWeight: 700, justifyContent: "center", marginTop: "auto", padding: 14 }}>TECNOLOGIA PARA CRESCIMENTO REAL</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
