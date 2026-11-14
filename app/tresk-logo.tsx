/**
 * Marca da TresK Tecnologia.
 *
 * O símbolo é o K de "TRES + K": três hastes do mesmo tamanho, unidas por uma
 * linha azul que atravessa as três (uma só família, uma só empresa), e o braço
 * do K apontando para frente.
 */

export const TRESK_BLUE = "#1463FF";

export function TreskMark({ className, stems = "currentColor" }: { className?: string; stems?: string }) {
  return (
    <svg viewBox="0 0 376 345" className={className} aria-hidden="true" focusable="false">
      <rect x="0" y="22" width="48" height="301" rx="6" fill={stems} />
      <rect x="85" y="22" width="48" height="301" rx="6" fill={stems} />
      <rect x="170" y="22" width="48" height="301" rx="6" fill={stems} />
      <rect x="0" y="161" width="215" height="18" fill={TRESK_BLUE} />
      <polygon points="340,0 375,30 262,170 375,310 340,340 205,170" fill={TRESK_BLUE} />
    </svg>
  );
}

/** Ícone do Kort (produto para barbearias): símbolo branco num quadrado azul. */
export function KortIcon({ className = "kort-icon" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      <rect width="100" height="100" rx="24" fill={TRESK_BLUE} />
      <g transform="translate(24 27) scale(0.137)">
        <rect x="0" y="22" width="48" height="301" rx="6" fill="#fff" />
        <rect x="85" y="22" width="48" height="301" rx="6" fill="#fff" />
        <rect x="170" y="22" width="48" height="301" rx="6" fill="#fff" />
        <rect x="0" y="161" width="215" height="18" fill="#fff" />
        <polygon points="340,0 375,30 262,170 375,310 340,340 205,170" fill="#0B0D12" />
      </g>
    </svg>
  );
}

/** Logo completo: "TRES" + símbolo, com "TECNOLOGIA" embaixo. */
export function TreskLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? "tresk-logo compact" : "tresk-logo"}>
      <span className="tresk-word">
        TRES
        <TreskMark className="tresk-mark" />
      </span>
      {!compact && <small>TECNOLOGIA</small>}
    </span>
  );
}
