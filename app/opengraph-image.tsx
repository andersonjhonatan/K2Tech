import { ImageResponse } from "next/og";

export const alt = "TresK Tecnologia: tecnologia que trabalha pelo seu negócio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BLUE = "#1463FF";

function Mark({ height, stems }: { height: number; stems: string }) {
  return (
    <svg width={(height * 376) / 345} height={height} viewBox="0 0 376 345">
      <rect x="0" y="22" width="48" height="301" rx="6" fill={stems} />
      <rect x="85" y="22" width="48" height="301" rx="6" fill={stems} />
      <rect x="170" y="22" width="48" height="301" rx="6" fill={stems} />
      <rect x="0" y="161" width="215" height="18" fill={BLUE} />
      <polygon points="340,0 375,30 262,170 375,310 340,340 205,170" fill={BLUE} />
    </svg>
  );
}

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0B0B0C",
          color: "#F5F5F7",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Arial, sans-serif",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px 86px",
          position: "relative",
          width: "100%",
        }}
      >
        <div style={{ background: BLUE, borderRadius: 999, height: 520, opacity: 0.22, position: "absolute", right: -140, top: -120, width: 520, display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 52, fontWeight: 800, letterSpacing: -1 }}>
            <span>TRES</span>
            <Mark height={40} stems="#F5F5F7" />
          </div>
          <div style={{ color: "#3B82F6", display: "flex", fontSize: 15, fontWeight: 700, letterSpacing: 9 }}>TECNOLOGIA</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 80, fontWeight: 700, letterSpacing: -4, lineHeight: 0.98 }}>
          <span>Tecnologia que</span>
          <span>trabalha pelo</span>
          <span style={{ color: "#3B82F6" }}>seu negócio.</span>
        </div>
        <div style={{ color: "#C8A96A", display: "flex", fontSize: 20, fontWeight: 700, letterSpacing: 2 }}>SISTEMAS · SITES · PRODUTOS DIGITAIS</div>
      </div>
    ),
    size,
  );
}
