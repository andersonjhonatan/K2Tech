import { ImageResponse } from "next/og";

export const alt = "K2 Tech — Convites online interativos";
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
          padding: "72px 86px",
          position: "relative",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "68%" }}>
          <div style={{ color: "#3B82F6", display: "flex", fontSize: 24, fontWeight: 700, letterSpacing: 5 }}>K2 TECH</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 700, letterSpacing: -5, lineHeight: 0.94 }}>
            <span>Seu evento</span>
            <span>começa no</span>
            <span style={{ color: "#3B82F6" }}>primeiro clique.</span>
          </div>
          <div style={{ color: "#C8A96A", display: "flex", fontSize: 20, fontWeight: 700, letterSpacing: 2 }}>CONVITES ONLINE INTERATIVOS</div>
        </div>
        <div style={{ alignItems: "center", display: "flex", justifyContent: "center", position: "relative", width: "32%" }}>
          <div style={{ background: "#2563EB", borderRadius: 999, height: 420, opacity: 0.9, position: "absolute", width: 420 }} />
          <div style={{ background: "#11162A", border: "2px solid #3B82F6", boxShadow: "0 24px 60px rgba(0,0,0,.5)", display: "flex", flexDirection: "column", height: 410, justifyContent: "space-between", padding: 30, position: "relative", transform: "rotate(7deg)", width: 250 }}>
            <span style={{ color: "#C8A96A", display: "flex", fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>VOCÊ ESTÁ CONVIDADO</span>
            <span style={{ display: "flex", flexDirection: "column", fontSize: 50, fontWeight: 700, letterSpacing: -4, lineHeight: 0.8 }}>LIA <span style={{ color: "#C8A96A", display: "flex" }}>&amp; CAIO</span></span>
            <span style={{ border: "1px solid #3B82F6", color: "#F5F5F7", display: "flex", fontSize: 12, fontWeight: 700, justifyContent: "center", padding: "12px 4px" }}>CONFIRMAR PRESENÇA</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
