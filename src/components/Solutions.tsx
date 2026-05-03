"use client";

import { Button } from "@/components/ui/button";
import {
  Code2, Brain, Layers, Cpu, ArrowRight,
  Globe, Smartphone, Zap, Bot, ShieldCheck, BarChart3, Palette,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import type { ElementType } from "react";

const cardMeta = [
  {
    icon: Code2,
    borderColor: "hover:border-[#00C3C1]",
    iconBg: "bg-[#00C3C1]/10",
    iconColor: "text-[#00C3C1]",
    labelColor: "text-[#00C3C1]",
    btnHover: "hover:bg-[#00C3C1]/10 hover:border-[#00C3C1] hover:text-[#00C3C1] group-hover:bg-[#00C3C1]/10 group-hover:border-[#00C3C1] group-hover:text-[#00C3C1]",
    featureIcons: [Globe, Palette, Smartphone, ShieldCheck] as ElementType[],
  },
  {
    icon: Brain,
    borderColor: "hover:border-violet-500",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-500",
    labelColor: "text-violet-500",
    btnHover: "hover:bg-violet-500/10 hover:border-violet-500 hover:text-violet-500 group-hover:bg-violet-500/10 group-hover:border-violet-500 group-hover:text-violet-500",
    featureIcons: [Bot, Zap, BarChart3, Globe] as ElementType[],
  },
  {
    icon: Layers,
    borderColor: "hover:border-blue-500",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
    labelColor: "text-blue-500",
    btnHover: "hover:bg-blue-500/10 hover:border-blue-500 hover:text-blue-500 group-hover:bg-blue-500/10 group-hover:border-blue-500 group-hover:text-blue-500",
    featureIcons: [ShieldCheck, BarChart3, Zap, Globe] as ElementType[],
  },
  {
    icon: Cpu,
    borderColor: "hover:border-orange-500",
    iconBg: "bg-orange-400/10",
    iconColor: "text-orange-500",
    labelColor: "text-orange-500",
    btnHover: "hover:bg-orange-500/10 hover:border-orange-500 hover:text-orange-500 group-hover:bg-orange-500/10 group-hover:border-orange-500 group-hover:text-orange-500",
    featureIcons: [Code2, Layers, ShieldCheck, Smartphone] as ElementType[],
  },
];

const Solutions = () => {
  const { t, language } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">

        <div className="reveal text-center mb-10 md:mb-16 space-y-4">
          <p className="font-mono text-xs font-semibold tracking-widest uppercase text-[#00C3C1]">{t.solutions.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-foreground">
            {t.solutions.title}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00C3C1] to-[#197bc8]">
              {t.solutions.titleAccent}
            </span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.solutions.subtitle}
          </p>
        </div>

        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {t.solutions.cards.map((card, idx) => {
            const meta = cardMeta[idx];
            const Icon = meta.icon;
            return (
              <div
                key={idx}
                className={`reveal group flex flex-col rounded-2xl border border-border bg-card p-5 md:p-8 transition-colors duration-300 ${meta.borderColor}`}
              >
                <div className="flex items-start gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${meta.iconBg}`}>
                    <Icon className={`w-5 h-5 ${meta.iconColor}`} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base md:text-lg font-bold text-foreground leading-snug">{card.label}</h3>
                    <p className={`font-mono text-[11px] font-semibold mt-1 leading-snug ${language === "RU" ? "tracking-wide" : "tracking-wider uppercase"} ${meta.labelColor}`}>{card.tagline}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{card.description}</p>

                <ul className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-y-2 gap-x-3 mb-6">
                  {card.features.map((feat, fi) => {
                    const FIcon = meta.featureIcons[fi];
                    return (
                      <li key={fi} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <FIcon className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${meta.iconColor}`} />
                        <span>{feat}</span>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-auto">
                  <Link href="/#contact">
                    <Button
                      variant="outline"
                      className={`w-full rounded-xl gap-2 text-sm font-semibold cursor-pointer transition-all duration-200 ${meta.btnHover}`}
                    >
                      {card.cta}
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Solutions;
