"use client";

import Image from "next/image";
import ceo from "@/img/ceo.png";
import cto from "@/img/cto.png";
import cmo from "@/img/cmo.png";
import { useLanguage } from "@/context/LanguageContext";
import type { StaticImageData } from "next/image";

const memberImages: StaticImageData[] = [ceo, cto, cmo];
const memberNames = ["Shahzod Nematov", "Khondamir Tuychiev", "Abdushukur Dadajonov"];

const TeamSection = () => {
  const { t } = useLanguage();

  return (
    <section id="team" className="py-14 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="reveal text-center mb-10 md:mb-14 space-y-3">
          <p className="font-mono text-xs font-semibold tracking-widest uppercase text-[#00C3C1]">{t.team.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-black leading-tight">{t.team.title}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">{t.team.subtitle}</p>
        </div>
        <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {t.team.members.map((member, i) => (
            <div key={memberNames[i]} className="reveal group flex flex-col items-center text-center rounded-2xl border border-border bg-card p-6 md:p-8 transition-colors duration-300 hover:border-[#00C3C1]">
              <div className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-border group-hover:ring-[#00C3C1] transition-colors duration-300 mb-5">
                <Image src={memberImages[i]} alt={memberNames[i]} fill className="object-cover" />
              </div>
              <h3 className="font-bold text-base text-foreground">{memberNames[i]}</h3>
              <p className="font-mono text-[11px] font-semibold tracking-wide text-[#00C3C1] mt-1 mb-3 break-words w-full">{member.role}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
