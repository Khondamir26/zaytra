"use client";

import { Search, PenTool, Code2, Rocket } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { ElementType } from "react";

const stepMeta = [
  { icon: Search as ElementType, accent: "text-[#00C3C1]",   hoverBorder: "hover:border-[#00C3C1]",   number: "01" },
  { icon: PenTool as ElementType, accent: "text-violet-500", hoverBorder: "hover:border-violet-500", number: "02" },
  { icon: Code2 as ElementType,   accent: "text-blue-500",   hoverBorder: "hover:border-blue-500",   number: "03" },
  { icon: Rocket as ElementType,  accent: "text-orange-500", hoverBorder: "hover:border-orange-500", number: "04" },
];

const ProblemSolution = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 sm:px-6 mx-auto">

        <div className="reveal text-center mb-10 md:mb-16 space-y-4">
          <p className="font-mono text-xs font-semibold tracking-widest uppercase text-[#00C3C1]">{t.process.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-foreground">
            {t.process.title}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00C3C1] to-[#197bc8]">
              {t.process.titleAccent}
            </span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.process.subtitle}
          </p>
        </div>

        <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {t.process.steps.map((step, i) => {
            const meta = stepMeta[i];
            const Icon = meta.icon;
            return (
              <div
                key={meta.number}
                className={`reveal relative flex flex-col rounded-2xl border border-border bg-card p-5 md:p-8 transition-colors duration-300 ${meta.hoverBorder}`}
              >
                <span className={`font-mono absolute top-5 right-6 text-7xl font-black opacity-[0.06] ${meta.accent} select-none leading-none`}>
                  {meta.number}
                </span>

                <div className="w-11 h-11 rounded-xl border border-border flex items-center justify-center mb-5">
                  <Icon className={`w-5 h-5 ${meta.accent}`} />
                </div>

                <p className={`font-mono text-[11px] font-bold tracking-widest uppercase mb-3 ${meta.accent}`}>
                  Step {meta.number}
                </p>

                <h3 className="text-base font-bold text-foreground leading-snug mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>

                {i < stepMeta.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-[14px] w-7 items-center justify-center z-10">
                    <div className="w-5 h-[2px] bg-border" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
