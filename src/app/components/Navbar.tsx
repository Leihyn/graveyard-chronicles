"use client";

import { useState, useEffect } from "react";

const LANGUAGES = [
  { key: "en", label: "English", flag: "EN" },
  { key: "hi", label: "\u0939\u093F\u0902\u0926\u0940", flag: "\u0939\u093F" },
  { key: "es", label: "Espa\u00f1ol", flag: "ES" },
];

interface Props {
  lang: string;
  onLangChange: (lang: string) => void;
}

export default function Navbar({ lang, onLangChange }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const current = LANGUAGES.find((l) => l.key === lang) || LANGUAGES[0];

  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0c0c0c]/80 backdrop-blur-md border-b border-[#2a2a2a]/50 navbar-glow-border">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between">
        <div className="min-w-0">
          <h1 className="text-sm sm:text-lg font-bold text-[#e8e0d4] tracking-wide truncate" style={{ textShadow: "0 0 15px rgba(196,163,90,0.2)" }}>
            GRAVEYARD CHRONICLES
          </h1>
          <p className="text-[10px] sm:text-xs text-[#9a9590]">
            Solana Graveyard Hackathon 2026
          </p>
        </div>

        {/* Language Switcher */}
        <div className="relative">
          <button
            onClick={(e) => { e.stopPropagation(); setMenuOpen((p) => !p); }}
            className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg border border-[#3a3a3a] bg-[#1e1e1e]/50 text-xs sm:text-sm text-[#c4a35a] hover:bg-[#1e1e1e] hover:border-[#c4a35a]/40 hover:shadow-[0_0_12px_rgba(196,163,90,0.15)] transition-all"
            title="Switch language"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            {current.flag}
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-full mt-1.5 bg-[#1e1e1e] border border-[#3a3a3a] rounded-lg overflow-hidden shadow-2xl z-50 min-w-[140px]">
              {LANGUAGES.map((l) => (
                <button
                  key={l.key}
                  onClick={(e) => { e.stopPropagation(); onLangChange(l.key); setMenuOpen(false); }}
                  className={`flex items-center gap-2.5 w-full text-left px-3.5 py-2.5 text-sm transition-all ${
                    l.key === lang
                      ? "bg-[#2a2a2a] text-[#e8c05a]"
                      : "text-[#9a9590] hover:bg-[#161616] hover:text-white"
                  }`}
                >
                  <span className="text-xs font-mono opacity-60">{l.flag}</span>
                  {l.label}
                  {l.key === lang && (
                    <svg className="ml-auto" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
