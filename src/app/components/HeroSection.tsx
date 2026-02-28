"use client";

import { getStrings } from "../i18n";

export default function HeroSection({ lang }: { lang: string }) {
  const t = getStrings(lang);

  return (
    <section className="hero-bg relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Second fog layer for parallax depth */}
      <div className="hero-fog" />

      {/* Title — Gothic blackletter */}
      <h1
        className="animate-title-reveal text-center px-4 leading-[0.95]"
        style={{
          fontFamily: "var(--font-gothic)",
          fontSize: "clamp(3rem, 10vw, 7rem)",
          color: "#e8e0d4",
          animationDelay: "0s",
        }}
      >
        Graveyard
        <br />
        Chronicles
      </h1>

      {/* Subtitle */}
      <p
        className="animate-fade-in-up mt-5 text-sm sm:text-lg md:text-xl font-semibold tracking-[0.3em] uppercase"
        style={{ animationDelay: "0.3s", color: "#c4a35a" }}
      >
        {t.hero.subtitle}
      </p>

      {/* Tagline */}
      <p
        className="animate-fade-in-up mt-6 max-w-md sm:max-w-xl text-center text-sm sm:text-base px-6 leading-relaxed"
        style={{ animationDelay: "0.8s", color: "#9a9590" }}
      >
        {t.hero.tagline[0]}
        <br className="hidden sm:inline" />
        {" "}{t.hero.tagline[1]}
      </p>

      {/* CTA Button */}
      <a
        href="#reader"
        className="animate-fade-in-up animate-cta-pulse mt-10 px-8 py-3 rounded-full font-bold text-sm sm:text-base tracking-wide transition-all duration-300 hover:scale-105"
        style={{
          animationDelay: "1.2s",
          background: "linear-gradient(135deg, #d4a937, #c4a35a)",
          color: "#0c0c0c",
        }}
      >
        {t.hero.cta}
      </a>

      {/* Scroll-down chevron */}
      <div
        className="animate-fade-in-up absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ animationDelay: "1.6s" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(196,163,90,0.4)"
          strokeWidth="2"
          className="animate-bounce-slow"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
