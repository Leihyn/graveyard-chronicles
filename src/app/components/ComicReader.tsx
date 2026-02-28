"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

type PageOrientation = "portrait" | "landscape";

interface ComicPage {
  src: string;
  title: string;
  subtitle: string;
  orientation: PageOrientation;
}

const PAGES: ComicPage[] = [
  { src: "/comics/cover-front.png", title: "Cover", subtitle: "Graveyard Chronicles", orientation: "portrait" },
  { src: "/comics/page-01.png", title: "Page 1", subtitle: "The Death Notices", orientation: "landscape" },
  { src: "/comics/page-02.png", title: "Page 2", subtitle: "The Empty Streets", orientation: "landscape" },
  { src: "/comics/page-03.png", title: "Page 3", subtitle: "The One Who Stayed", orientation: "portrait" },
  { src: "/comics/page-04.png", title: "Page 4", subtitle: "The Builder", orientation: "landscape" },
  { src: "/comics/page-05.png", title: "Page 5", subtitle: "The First Crack", orientation: "portrait" },
  { src: "/comics/page-06.png", title: "Page 6", subtitle: "Rising", orientation: "portrait" },
  { src: "/comics/page-07.png", title: "Page 7", subtitle: "The Gallery Transforms", orientation: "landscape" },
  { src: "/comics/page-08.png", title: "Page 8", subtitle: "The New Ecosystem", orientation: "landscape" },
  { src: "/comics/page-09.png", title: "Page 9", subtitle: "The Message", orientation: "landscape" },
  { src: "/comics/page-10.png", title: "Page 10", subtitle: "Build", orientation: "landscape" },
  { src: "/comics/cover-back.png", title: "Back Cover", subtitle: "The End", orientation: "landscape" },
];

export default function ComicReader() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const goToPage = useCallback(
    (page: number) => {
      if (page < 0 || page >= PAGES.length || isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage(page);
        setIsTransitioning(false);
      }, 200);
    },
    [isTransitioning]
  );

  const nextPage = useCallback(() => goToPage(currentPage + 1), [currentPage, goToPage]);
  const prevPage = useCallback(() => goToPage(currentPage - 1), [currentPage, goToPage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextPage();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevPage();
      } else if (e.key === "Escape") {
        setIsFullscreen(false);
      } else if (e.key === "f") {
        setIsFullscreen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextPage, prevPage]);

  const page = PAGES[currentPage];
  const isPortrait = page.orientation === "portrait";

  return (
    <div className={`${isFullscreen ? "fixed inset-0 z-50 bg-black" : ""}`}>
      {/* Header */}
      {!isFullscreen && (
        <header className="fixed top-0 left-0 right-0 z-40 bg-[#0a0a0f]/90 backdrop-blur-sm border-b border-purple-900/30">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-white tracking-wide">
                GRAVEYARD CHRONICLES
              </h1>
              <p className="text-xs text-purple-400">
                Solana Graveyard Hackathon 2026
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">
                {page.title} — {page.subtitle}
              </span>
              <button
                onClick={() => setIsFullscreen(true)}
                className="text-gray-400 hover:text-purple-400 transition-colors"
                title="Fullscreen (F)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                </svg>
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Main Comic Display — fixed height container */}
      <main
        className={`flex items-center justify-center ${
          isFullscreen ? "h-screen" : "min-h-screen pt-16 pb-24"
        }`}
      >
        {/* Fixed-height viewport so pages don't jump */}
        <div
          className={`relative mx-auto px-4 flex items-center justify-center transition-all duration-200 ${
            isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
          style={{
            height: isFullscreen ? "100vh" : "calc(100vh - 10rem)",
            width: "100%",
            maxWidth: "64rem",
          }}
        >
          {/* Click zones for navigation */}
          <div className="relative group h-full w-full flex items-center justify-center">
            {/* Left click zone */}
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="absolute left-0 top-0 w-1/3 h-full z-10 cursor-w-resize disabled:cursor-default group/left"
              aria-label="Previous page"
            >
              <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover/left:opacity-100 transition-opacity">
                {currentPage > 0 && (
                  <div className="bg-black/60 backdrop-blur-sm rounded-full p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </div>
                )}
              </div>
            </button>

            {/* Right click zone */}
            <button
              onClick={nextPage}
              disabled={currentPage === PAGES.length - 1}
              className="absolute right-0 top-0 w-1/3 h-full z-10 cursor-e-resize disabled:cursor-default group/right"
              aria-label="Next page"
            >
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover/right:opacity-100 transition-opacity">
                {currentPage < PAGES.length - 1 && (
                  <div className="bg-black/60 backdrop-blur-sm rounded-full p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                )}
              </div>
            </button>

            {/* The comic page image — contained within fixed viewport */}
            <div
              className="page-glow rounded-lg overflow-hidden relative"
              style={{
                maxHeight: "100%",
                maxWidth: isPortrait ? "min(100%, 500px)" : "100%",
              }}
            >
              <Image
                src={page.src}
                alt={`${page.title} - ${page.subtitle}`}
                width={isPortrait ? 1536 : 2816}
                height={isPortrait ? 2752 : 1536}
                className="object-contain rounded-lg"
                style={{
                  maxHeight: isFullscreen ? "100vh" : "calc(100vh - 10rem)",
                  width: "auto",
                  height: "auto",
                  maxWidth: "100%",
                }}
                priority={currentPage < 3}
                quality={90}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav
        className={`fixed bottom-0 left-0 right-0 z-40 bg-[#0a0a0f]/90 backdrop-blur-sm border-t border-purple-900/30 ${
          isFullscreen ? "hidden" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-3">
          {/* Page indicator dots */}
          <div className="flex items-center justify-center gap-2 mb-2">
            {PAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`transition-all duration-200 rounded-full ${
                  i === currentPage
                    ? "w-8 h-2 bg-purple-500"
                    : "w-2 h-2 bg-gray-600 hover:bg-purple-400"
                }`}
                aria-label={`Go to ${PAGES[i].title}`}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="px-4 py-1.5 text-sm text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            <span className="text-sm text-gray-500">
              {currentPage + 1} / {PAGES.length}
            </span>

            <button
              onClick={nextPage}
              disabled={currentPage === PAGES.length - 1}
              className="px-4 py-1.5 text-sm text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen close button */}
      {isFullscreen && (
        <button
          onClick={() => setIsFullscreen(false)}
          className="fixed top-4 right-4 z-50 bg-black/60 backdrop-blur-sm rounded-full p-2 text-gray-400 hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Keyboard hint */}
      {!isFullscreen && currentPage === 0 && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 text-xs text-gray-600 animate-pulse">
          Arrow keys or click sides to navigate — F for fullscreen
        </div>
      )}
    </div>
  );
}
