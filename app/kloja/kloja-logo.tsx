/**
 * Marca do KLOJA (produto da TresK para lojas).
 * O símbolo é uma etiqueta de preço com o furinho do barbante e um K dentro:
 * a etiqueta é o que toda loja tem em cada peça.
 */
export const KLOJA_TEAL = "#0F766E";
export const KLOJA_CORAL = "#FF6B4A";

export function KlojaTag({ className, size = 44 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden="true" focusable="false">
      <path d="M6 14a8 8 0 0 1 8-8h24.7a8 8 0 0 1 5.66 2.34l13.3 13.3a8 8 0 0 1 0 11.32L36.4 54.2a8 8 0 0 1-11.32 0L8.34 37.46A8 8 0 0 1 6 31.8Z" fill={KLOJA_TEAL} />
      <circle cx="17.5" cy="17.5" r="4.2" fill="#fff" />
      <path d="M26 24v20M26 34.5 37 24M29.6 31.3 38 44" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="47" cy="47" r="7" fill={KLOJA_CORAL} />
    </svg>
  );
}

export function KlojaWordmark({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <KlojaTag size={38} />
      <span style={{ fontFamily: "var(--font-poppins), sans-serif", fontWeight: 700, fontSize: 24, letterSpacing: "-0.02em", color: light ? "#fff" : "#101418" }}>
        K<span style={{ color: light ? "#7EE0D2" : KLOJA_TEAL }}>LOJA</span>
      </span>
    </span>
  );
}
