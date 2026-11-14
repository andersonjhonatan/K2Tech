"use client";

import { FiMoon, FiSun } from "react-icons/fi";

/**
 * Botão de tema claro/escuro. O tema fica em <html data-theme> (definido antes da
 * primeira pintura por um script no layout) e a escolha é lembrada no navegador.
 * Os dois ícones são renderizados; o CSS mostra o do tema para o qual o botão troca.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("tresk-theme", next);
    } catch {
      // Sem armazenamento (aba anônima): o tema vale só para esta visita.
    }
  }

  return (
    <button className={`theme-toggle ${className}`} type="button" onClick={toggle} aria-label="Alternar entre tema claro e escuro" title="Tema claro / escuro">
      <FiSun className="theme-icon-sun" aria-hidden="true" />
      <FiMoon className="theme-icon-moon" aria-hidden="true" />
    </button>
  );
}
