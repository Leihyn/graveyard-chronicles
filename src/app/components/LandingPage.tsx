"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import AllianceGrid from "./AllianceGrid";
import LanguageSelect from "./LanguageSelect";
import ComicReader from "./ComicReader";

export default function LandingPage() {
  const [lang, setLang] = useState("en");

  return (
    <div className="relative">
      <Navbar lang={lang} onLangChange={setLang} />
      <HeroSection lang={lang} />
      <AllianceGrid lang={lang} />
      <LanguageSelect lang={lang} selected={lang} onSelect={setLang} />
      <ComicReader initialLang={lang} onLangChange={setLang} />
    </div>
  );
}
