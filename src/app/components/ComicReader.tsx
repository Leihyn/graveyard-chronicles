"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Image from "next/image";

/* ── Types ── */
interface LangConfig {
  label: string;
  flag: string;
  dir: string;
  subtitles: string[];
  nav: { prev: string; next: string; hint: string };
}

/* ── Language configs ── */
const LANGUAGES: Record<string, LangConfig> = {
  en: {
    label: "English",
    flag: "EN",
    dir: "/comics",
    subtitles: [
      "The Last Stand", "The Death Notices", "The Empty Streets",
      "The One Who Never Left", "The Bear Descends", "The Call to Arms",
      "The Alliance Forms", "The Battle", "The Bear Falls",
      "The City Rebuilt", "The Message", "Build", "The End",
    ],
    nav: { prev: "Previous", next: "Next", hint: "Arrow keys or click sides to navigate \u2014 F for fullscreen" },
  },
  hi: {
    label: "\u0939\u093F\u0902\u0926\u0940",
    flag: "\u0939\u093F",
    dir: "/comics/hi",
    subtitles: [
      "\u0905\u0902\u0924\u093F\u092E \u0938\u094D\u091F\u0948\u0902\u0921", "\u092E\u0943\u0924\u094D\u092F\u0941 \u0938\u0942\u091A\u0928\u093E\u090F\u0901", "\u0938\u0941\u0928\u0938\u093E\u0928 \u0938\u0921\u093C\u0915\u0947\u0902",
      "\u091C\u094B \u0915\u092D\u0940 \u0928\u0939\u0940\u0902 \u0917\u092F\u093E", "\u092D\u093E\u0932\u0942 \u0915\u093E \u0906\u0917\u092E\u0928", "\u0939\u0925\u093F\u092F\u093E\u0930\u094B\u0902 \u0915\u0940 \u092A\u0941\u0915\u093E\u0930",
      "\u0917\u0920\u092C\u0902\u0927\u0928 \u092C\u0928\u0924\u093E \u0939\u0948", "\u092F\u0941\u0926\u094D\u0927", "\u092D\u093E\u0932\u0942 \u0917\u093F\u0930\u0924\u093E \u0939\u0948",
      "\u0936\u0939\u0930 \u092B\u093F\u0930 \u092C\u0928\u0924\u093E \u0939\u0948", "\u0938\u0902\u0926\u0947\u0936", "\u092C\u0928\u093E\u0913", "\u0905\u0902\u0924",
    ],
    nav: { prev: "\u092A\u093F\u091B\u0932\u093E", next: "\u0905\u0917\u0932\u093E", hint: "\u0928\u0947\u0935\u093F\u0917\u0947\u091F \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u090F\u0930\u094B \u0915\u0940\u091C\u093C \u092F\u093E \u0938\u093E\u0907\u0921 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u0947\u0902" },
  },
  es: {
    label: "Espa\u00f1ol",
    flag: "ES",
    dir: "/comics/es",
    subtitles: [
      "La \u00daltima Resistencia", "Los Obituarios", "Las Calles Vac\u00edas",
      "La Que Nunca Se Fue", "El Oso Desciende", "El Llamado a las Armas",
      "La Alianza Se Forma", "La Batalla", "El Oso Cae",
      "La Ciudad Renace", "El Mensaje", "Construye", "El Final",
    ],
    nav: { prev: "Anterior", next: "Siguiente", hint: "Teclas de flecha o haz clic en los lados para navegar \u2014 F para pantalla completa" },
  },
};

const LANG_KEYS = Object.keys(LANGUAGES);

const PAGE_TITLES = [
  "Cover", "Page 1", "Page 2", "Page 3", "Page 4", "Page 5",
  "Page 6", "Page 7", "Page 8", "Page 9", "Page 10", "Page 11", "Back Cover",
];

const PAGE_FILES = [
  "cover-front.png", "page-01.png", "page-02.png", "page-03.png",
  "page-04.png", "page-05.png", "page-06.png", "page-07.png",
  "page-08.png", "page-09.png", "page-10.png", "page-11.png", "cover-back.png",
];

/* ── Particles — warm amber/gold tones ── */
function Particles() {
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 3,
      delay: Math.random() * 15,
      duration: 10 + Math.random() * 15,
      color: Math.random() > 0.5 ? "rgba(196, 163, 90, 0.35)" : "rgba(154, 149, 144, 0.25)",
    })), []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: "-10px",
            width: p.size,
            height: p.size,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Main Component ── */
export default function ComicReader({ initialLang = "en", onLangChange }: { initialLang?: string; onLangChange?: (lang: string) => void }) {
  const [lang, setLang] = useState(initialLang);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [animClass, setAnimClass] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [inView, setInView] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isAnimating = useRef(false);
  const thumbStripRef = useRef<HTMLDivElement>(null);
  const readerRef = useRef<HTMLDivElement>(null);

  const config = LANGUAGES[lang] || LANGUAGES.en;

  const pages = useMemo(() =>
    PAGE_FILES.map((file, i) => ({
      src: `${config.dir}/${file}`,
      title: PAGE_TITLES[i],
      subtitle: config.subtitles[i],
    })), [config.dir, config.subtitles]
  );

  const progress = ((currentPage + 1) / pages.length) * 100;

  /* ── Navigation ── */
  const goToPage = useCallback(
    (page: number, dir?: "left" | "right") => {
      if (page < 0 || page >= pages.length || isAnimating.current) return;
      isAnimating.current = true;
      const d = dir || (page > currentPage ? "right" : "left");
      setDirection(d);
      setAnimClass(d === "right" ? "page-exit-left" : "page-exit-right");

      setTimeout(() => {
        setCurrentPage(page);
        setImageLoaded(false);
        setAnimClass(d === "right" ? "page-enter-right" : "page-enter-left");
        setTimeout(() => {
          setAnimClass("");
          isAnimating.current = false;
        }, 350);
      }, 250);
    },
    [currentPage, pages.length]
  );

  const nextPage = useCallback(() => goToPage(currentPage + 1, "right"), [currentPage, goToPage]);
  const prevPage = useCallback(() => goToPage(currentPage - 1, "left"), [currentPage, goToPage]);

  const switchLang = useCallback((newLang: string) => {
    setLang(newLang);
    setLangMenuOpen(false);
    setImageLoaded(false);
    onLangChange?.(newLang);
  }, [onLangChange]);

  /* ── Hide hint after first navigation ── */
  useEffect(() => {
    if (currentPage > 0) setShowHint(false);
  }, [currentPage]);

  /* ── Keyboard ── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); nextPage(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); prevPage(); }
      else if (e.key === "Escape") { setIsFullscreen(false); setLangMenuOpen(false); }
      else if (e.key === "f") { setIsFullscreen((p) => !p); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextPage, prevPage]);

  /* ── Touch/swipe ── */
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) < 50 || Math.abs(dy) > Math.abs(dx)) return;
    if (dx < 0) nextPage();
    else prevPage();
  }, [nextPage, prevPage]);

  /* ── Close lang menu on outside click ── */
  useEffect(() => {
    if (!langMenuOpen) return;
    const close = () => setLangMenuOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [langMenuOpen]);

  /* ── Preload adjacent images ── */
  useEffect(() => {
    const toPreload = [currentPage - 1, currentPage + 1].filter(
      (i) => i >= 0 && i < pages.length
    );
    toPreload.forEach((i) => {
      const img = new window.Image();
      img.src = pages[i].src;
    });
  }, [currentPage, pages]);

  /* ── Scroll thumbnail strip to active ── */
  useEffect(() => {
    if (!thumbStripRef.current) return;
    const active = thumbStripRef.current.children[currentPage] as HTMLElement;
    if (active) {
      active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [currentPage]);

  const page = pages[currentPage];

  /* ── Sync lang when parent changes initialLang ── */
  useEffect(() => {
    setLang(initialLang);
    setImageLoaded(false);
  }, [initialLang]);

  /* ── Track whether reader is in viewport ── */
  useEffect(() => {
    if (!readerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "100px 0px 0px 0px", threshold: 0 }
    );
    observer.observe(readerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={readerRef} id="reader" className={`no-select ${isFullscreen ? "fixed inset-0 z-50 bg-black" : "relative"}`} style={{ scrollMarginTop: "2rem" }}>
      <Particles />

      {/* Progress bar — gold gradient (only when reader in view) */}
      <div className={`fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent transition-opacity duration-300 ${inView || isFullscreen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div
          className="progress-bar h-full"
          style={{ width: `${progress}%`, background: "linear-gradient(90deg, #c4a35a, #d4a937, #e8c05a)" }}
        />
      </div>

      {/* Page info bar (only when reader in view, below global navbar) */}
      {!isFullscreen && (
        <div className={`fixed top-[52px] left-0 right-0 z-30 transition-all duration-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
          <div className="max-w-6xl mx-auto px-3 sm:px-4 py-1.5 flex items-center justify-between">
            <span className="text-xs text-[#5a5a5a] hidden md:inline">
              {page.title} : {page.subtitle}
            </span>
            <button
              onClick={() => setIsFullscreen(true)}
              className="p-1.5 rounded-lg text-[#5a5a5a] hover:text-[#c4a35a] hover:bg-[#1e1e1e]/50 transition-all ml-auto"
              title="Fullscreen (F)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Main Comic Display */}
      <main
        className={`flex items-center justify-center ${
          isFullscreen ? "h-screen" : "min-h-screen pt-14 pb-32 sm:pt-16 sm:pb-28"
        }`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="relative mx-auto px-2 sm:px-4 flex items-center justify-center"
          style={{
            height: isFullscreen ? "100vh" : "calc(100vh - 12rem)",
            width: "100%",
            maxWidth: "64rem",
          }}
        >
          <div className="relative group h-full w-full flex items-center justify-center">
            {/* Left click zone */}
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="absolute left-0 top-0 w-1/3 h-full z-10 cursor-w-resize disabled:cursor-default group/left"
              aria-label="Previous page"
            >
              <div className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover/left:opacity-100 transition-opacity duration-200">
                {currentPage > 0 && (
                  <div className="bg-black/70 backdrop-blur-md rounded-full p-2.5 sm:p-3 border border-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                  </div>
                )}
              </div>
            </button>

            {/* Right click zone */}
            <button
              onClick={nextPage}
              disabled={currentPage === pages.length - 1}
              className="absolute right-0 top-0 w-1/3 h-full z-10 cursor-e-resize disabled:cursor-default group/right"
              aria-label="Next page"
            >
              <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover/right:opacity-100 transition-opacity duration-200">
                {currentPage < pages.length - 1 && (
                  <div className="bg-black/70 backdrop-blur-md rounded-full p-2.5 sm:p-3 border border-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                  </div>
                )}
              </div>
            </button>

            {/* Comic page */}
            <div className={`page-glow rounded-lg overflow-hidden relative ${animClass}`} style={{ maxHeight: "100%", maxWidth: "min(100%, 500px)" }}>
              {/* Loading skeleton */}
              {!imageLoaded && (
                <div className="absolute inset-0 skeleton-pulse rounded-lg" style={{ aspectRatio: "1536/2752" }} />
              )}
              <Image
                key={page.src}
                src={page.src}
                alt={`${page.title} - ${page.subtitle}`}
                width={1536}
                height={2752}
                className={`object-contain rounded-lg transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                style={{
                  maxHeight: isFullscreen ? "100vh" : "calc(100vh - 12rem)",
                  width: "auto",
                  height: "auto",
                  maxWidth: "100%",
                }}
                priority={currentPage < 3}
                quality={90}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className={`fixed bottom-0 left-0 right-0 z-40 bg-[#0c0c0c]/95 backdrop-blur-md border-t border-[#2a2a2a] transition-all duration-300 ${isFullscreen ? "hidden" : ""} ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none"}`}>
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2">
          {/* Thumbnail strip */}
          <div ref={thumbStripRef} className="thumb-strip flex items-center justify-start sm:justify-center gap-1 sm:gap-1.5 mb-1.5 overflow-x-auto py-0.5">
            {pages.map((p, i) => (
              <button
                key={i}
                onClick={() => goToPage(i, i > currentPage ? "right" : "left")}
                className={`shrink-0 transition-all duration-200 rounded overflow-hidden ${
                  i === currentPage
                    ? "ring-2 ring-[#c4a35a] ring-offset-1 ring-offset-[#0c0c0c] shadow-[0_0_12px_rgba(196,163,90,0.3)]"
                    : "opacity-35 hover:opacity-70 hover:scale-110 hover:shadow-[0_0_8px_rgba(196,163,90,0.2)]"
                }`}
                aria-label={`Go to ${p.title}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.src}
                  alt={p.title}
                  className="w-[26px] h-[46px] sm:w-[30px] sm:h-[54px] object-cover rounded"
                  loading="lazy"
                />
              </button>
            ))}
          </div>

          {/* Nav row */}
          <div className="flex items-center justify-between">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="flex items-center gap-1 px-3 py-1.5 text-xs text-[#9a9590] hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all rounded-lg hover:bg-[#1e1e1e]/60 hover:shadow-[0_0_8px_rgba(196,163,90,0.1)]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
              {config.nav.prev}
            </button>

            <div className="flex flex-col items-center">
              <span className="text-[10px] text-[#c4a35a]/60 leading-none mb-0.5 sm:hidden">{page.subtitle}</span>
              <span className="text-xs text-[#5a5a5a] font-mono">
                {String(currentPage + 1).padStart(2, "0")} / {String(pages.length).padStart(2, "0")}
              </span>
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage === pages.length - 1}
              className="flex items-center gap-1 px-3 py-1.5 text-xs text-[#9a9590] hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all rounded-lg hover:bg-[#1e1e1e]/60 hover:shadow-[0_0_8px_rgba(196,163,90,0.1)]"
            >
              {config.nav.next}
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen controls */}
      {isFullscreen && (
        <>
          {/* Close */}
          <button
            onClick={() => setIsFullscreen(false)}
            className="fixed top-4 right-4 z-50 bg-black/70 backdrop-blur-md rounded-full p-2 text-gray-400 hover:text-white transition-colors border border-white/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
          {/* Page counter in fullscreen */}
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-black/70 backdrop-blur-md rounded-full px-4 py-1.5 text-xs text-gray-400 font-mono border border-white/10">
            {String(currentPage + 1).padStart(2, "0")} / {String(pages.length).padStart(2, "0")}
          </div>
          {/* Language switcher in fullscreen */}
          <div className="fixed top-4 left-4 z-50 relative">
            <button
              onClick={(e) => { e.stopPropagation(); setLangMenuOpen((p) => !p); }}
              className="bg-black/70 backdrop-blur-md rounded-full px-3 py-1.5 text-xs text-[#c4a35a] border border-white/10 hover:bg-black/90 transition-colors"
            >
              {config.flag}
            </button>
            {langMenuOpen && (
              <div className="absolute left-0 top-full mt-1.5 bg-[#1e1e1e] border border-[#3a3a3a] rounded-lg overflow-hidden shadow-2xl z-50 min-w-[140px]">
                {LANG_KEYS.map((key) => (
                  <button
                    key={key}
                    onClick={(e) => { e.stopPropagation(); switchLang(key); }}
                    className={`flex items-center gap-2.5 w-full text-left px-3.5 py-2.5 text-sm transition-all ${
                      key === lang ? "bg-[#2a2a2a] text-[#e8c05a]" : "text-[#9a9590] hover:bg-[#161616] hover:text-white"
                    }`}
                  >
                    <span className="text-xs font-mono opacity-60">{LANGUAGES[key].flag}</span>
                    {LANGUAGES[key].label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Keyboard/swipe hint */}
      {!isFullscreen && showHint && currentPage === 0 && inView && (
        <div className="fixed bottom-24 sm:bottom-28 left-1/2 -translate-x-1/2 z-30 bg-[#1e1e1e]/80 backdrop-blur-sm border border-[#3a3a3a] rounded-full px-4 py-2 text-[11px] sm:text-xs text-[#9a9590] animate-pulse whitespace-nowrap">
          <span className="hidden sm:inline">{config.nav.hint}</span>
          <span className="sm:hidden">Swipe or tap sides to navigate</span>
        </div>
      )}
    </div>
  );
}
