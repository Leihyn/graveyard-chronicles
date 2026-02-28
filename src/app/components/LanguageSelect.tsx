"use client";

import { getStrings } from "../i18n";

const LANGS = [
  { key: "en", label: "English", cover: "/comics/cover-front.png" },
  { key: "hi", label: "\u0939\u093F\u0902\u0926\u0940", cover: "/comics/hi/cover-front.png" },
  { key: "es", label: "Espa\u00f1ol", cover: "/comics/es/cover-front.png" },
];

interface Props {
  lang: string;
  selected: string;
  onSelect: (lang: string) => void;
}

export default function LanguageSelect({ lang, selected, onSelect }: Props) {
  const t = getStrings(lang);

  const handleClick = (newLang: string) => {
    onSelect(newLang);
    setTimeout(() => {
      document.getElementById("reader")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Section title */}
      <div className="text-center mb-10 sm:mb-14">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#e8e0d4] tracking-wider">
          {t.langSelect.title}
        </h2>
        <div className="mt-3 mx-auto w-16 shimmer-divider" />
        <p className="mt-4 text-sm sm:text-base text-[#9a9590]">
          {t.langSelect.subtitle}
        </p>
      </div>

      {/* Language cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {LANGS.map((l) => (
          <button
            key={l.key}
            onClick={() => handleClick(l.key)}
            className={`group relative rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-[1.02] ${
              selected === l.key
                ? "border-[#c4a35a] ring-2 ring-[#c4a35a]/40 lang-card-selected"
                : "border-[#2a2a2a] hover:border-[#5a5a5a] hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            }`}
          >
            <div className="relative aspect-[3/4] w-full bg-[#161616]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={l.cover}
                alt={`${l.label} cover`}
                className="object-cover w-full h-full transition-opacity duration-300 group-hover:opacity-90"
                loading="lazy"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent" />
            </div>
            {/* Label */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
              <span className="text-base sm:text-lg font-bold text-[#e8e0d4]">{l.label}</span>
              {selected === l.key && (
                <span className="block text-[10px] text-[#c4a35a] mt-1 tracking-wide uppercase">{t.langSelect.selected}</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
