/**
 * Marca do KLOJA (produto da TresK para lojas).
 * Símbolo: a etiqueta de preço (o que toda loja tem em cada peça), em dourado TresK,
 * com o K dentro e o ponto azul TresK no canto, que liga o produto à empresa.
 */
export const KLOJA_GOLD = "#C8A96A";
export const TRESK_BLUE = "#2563EB";

export function KlojaTag({ className, size = 44, id = "kl" }: { className?: string; size?: number; id?: string }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F1DDAE" />
          <stop offset=".5" stopColor="#C8A96A" />
          <stop offset="1" stopColor="#8C6F3A" />
        </linearGradient>
      </defs>
      <path
        d="M6 14a8 8 0 0 1 8-8h24.7a8 8 0 0 1 5.66 2.34l13.3 13.3a8 8 0 0 1 0 11.32L36.4 54.2a8 8 0 0 1-11.32 0L8.34 37.46A8 8 0 0 1 6 31.8Z"
        fill={`url(#${id}-g)`}
      />
      <circle cx="17.5" cy="17.5" r="4.2" fill="#0B0B0C" />
      <path d="M26 24v20M26 34.5 37 24M29.6 31.3 38 44" stroke="#0B0B0C" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="47" cy="47" r="6.5" fill={TRESK_BLUE} />
    </svg>
  );
}

export function KlojaWordmark({ className, size = 34 }: { className?: string; size?: number }) {
  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <KlojaTag size={size} id="klw" />
      <span style={{ fontFamily: "var(--font-poppins), sans-serif", fontWeight: 700, fontSize: size * 0.66, letterSpacing: "0.08em", color: "#F5F5F7" }}>
        K<span style={{ color: KLOJA_GOLD }}>LOJA</span>
      </span>
    </span>
  );
}
