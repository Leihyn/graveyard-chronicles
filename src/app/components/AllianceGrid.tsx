"use client";

import { useEffect, useRef } from "react";
import { getStrings, PROTOCOL_NAMES } from "../i18n";

const COLORS = [
  "#c4a35a", "#9a9590", "#d4a937", "#dc2626", "#b8a88a", "#e8c05a",
  "#7a7a7a", "#c4a35a", "#9a9590", "#e8c05a", "#d4a937", "#c4a35a",
];

const LOGOS: Record<string, string> = {
  "Exchange Art": "/logos/exchange-art.jpg",
  "MagicBlock": "/logos/magicblock.jpg",
  "Realms": "/logos/realms.jpg",
  "Tapestry": "/logos/tapestry.jpg",
  "Audius": "/logos/audius.jpg",
  "Portals": "/logos/portals.jpg",
};

export default function AllianceGrid({ lang }: { lang: string }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const t = getStrings(lang);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".alliance-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card, i) => {
      (card as HTMLElement).style.transitionDelay = `${i * 60}ms`;
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section title */}
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#e8e0d4] tracking-wider">
          {t.alliance.title}
        </h2>
        <div className="mt-3 mx-auto w-16 shimmer-divider" />
        <p className="mt-4 text-sm sm:text-base text-[#9a9590] max-w-md mx-auto">
          {t.alliance.subtitle}
        </p>
      </div>

      {/* Grid */}
      <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {PROTOCOL_NAMES.map((name, i) => (
          <div
            key={name}
            className="alliance-card rounded-lg p-4 border border-[#2a2a2a] bg-[#161616]/80 hover:bg-[#1e1e1e]/60 hover:border-[#3a3a3a] duration-300"
            style={{ borderLeftWidth: 3, borderLeftColor: COLORS[i] }}
          >
            <div className="flex items-center gap-2">
              {LOGOS[name] && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={LOGOS[name]} alt="" className="w-6 h-6 rounded shrink-0 object-cover" loading="lazy" />
              )}
              <h3 className="text-sm sm:text-base font-bold text-[#e8e0d4] leading-tight">{name}</h3>
            </div>
            <p className="text-[10px] sm:text-xs font-semibold mt-0.5 tracking-wide uppercase" style={{ color: COLORS[i] }}>
              {t.alliance.protocols[i].role}
            </p>
            <p className="text-[11px] sm:text-xs text-[#5a5a5a] mt-2 leading-relaxed">
              {t.alliance.protocols[i].desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
