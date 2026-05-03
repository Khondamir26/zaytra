"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Marquee() {
  const { t } = useLanguage();
  const items = [...t.marquee, ...t.marquee];

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-[#0B1F3A] py-4">
      <div className="flex w-max animate-marquee">
        {items.map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 px-6 text-xs font-semibold tracking-[0.18em] uppercase text-white/50"
          >
            {tag}
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C3C1] flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
