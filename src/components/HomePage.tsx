"use client";

import Link from "next/link";
import Image, { StaticImageData } from "next/image";

import kpi from "@/img/kpi-vid.gif";
import praaktisgo from "@/img/praaktisgo.png";
import turanSecurity from "@/img/turansec.gif";

import { ArrowRight, ArrowUpRight, CheckCircle2, Star, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import Footer from "@/components/Footer";
import ProblemSolution from "./ProblemSolution";
import Solutions from "./Solutions";
import Marquee from "./Marquee";
import HeroImage from "@/components/HeroImage";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import { useLanguage } from "@/context/LanguageContext";

interface Project {
  id: number; name: string; company: string; category: string;
  description: string; rating: number; reviews: number;
  clients: number; image: StaticImageData; link: string;
  tags: string[]; service: string; hoverBorder: string; hoverShadow: string; btnHover: string;
}

const projects: Project[] = [
  {
    id: 1, name: "Kpi.com", company: "TechFlow Solutions",
    category: "ERP / Business Management",
    description: "All-in-one business management platform covering Accounts, Sales, HR, Projects, Payroll, Reports, and Documents — built to streamline enterprise operations at scale.",
    rating: 4.8, reviews: 156, clients: 1500,
    image: kpi, link: "https://www.kpi.com/",
    tags: ["Cloud-based", "Multi-language", "API Integration", "HR & Payroll"],
    service: "SaaS Platform", hoverBorder: "hover:border-[#00C3C1]", hoverShadow: "hover:shadow-[0_0_24px_0px_rgba(0,195,193,0.15)]",
    btnHover: "hover:bg-[#00C3C1]/10 hover:border-[#00C3C1] hover:text-[#00C3C1] group-hover:bg-[#00C3C1]/10 group-hover:border-[#00C3C1] group-hover:text-[#00C3C1]",
  },
  {
    id: 2, name: "PraaktisGo", company: "FinTech Innovations",
    category: "Healthcare / Gym Management",
    description: "A complete gym management SaaS — memberships, multi-branch control, class scheduling, and actionable analytics. Accessible from web and mobile.",
    rating: 4.9, reviews: 89, clients: 120,
    image: praaktisgo, link: "https://www.praaktisgo.com/",
    tags: ["Memberships", "Multi-Branch", "Analytics", "Mobile App"],
    service: "SaaS Platform", hoverBorder: "hover:border-violet-500", hoverShadow: "hover:shadow-[0_0_24px_0px_rgba(139,92,246,0.15)]",
    btnHover: "hover:bg-violet-500/10 hover:border-violet-500 hover:text-violet-500 group-hover:bg-violet-500/10 group-hover:border-violet-500 group-hover:text-violet-500",
  },
  {
    id: 3, name: "TuranSec", company: "Turan Security — White Hat LLC",
    category: "Cybersecurity",
    description: "A professional cybersecurity platform delivering penetration testing, risk assessments, and vulnerability audits — trusted by 850+ enterprise clients.",
    rating: 4.9, reviews: 312, clients: 850,
    image: turanSecurity, link: "https://www.turansec.uz/",
    tags: ["Web Pentest", "Mobile Pentest", "Risk Assessment", "Password Audit"],
    service: "Custom Software", hoverBorder: "hover:border-orange-500", hoverShadow: "hover:shadow-[0_0_24px_0px_rgba(249,115,22,0.15)]",
    btnHover: "hover:bg-orange-500/10 hover:border-orange-500 hover:text-orange-500 group-hover:bg-orange-500/10 group-hover:border-orange-500 group-hover:text-orange-500",
  },
];

const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">

      {/* HERO */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-b from-[#0B1F3A] via-[#0B1F3A]/95 to-background">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center gap-8 md:gap-12 justify-between py-14 md:py-20">

          <div className="flex-1 space-y-6 md:space-y-8 text-center md:text-left w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-white">
              {t.hero.title}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00C3C1] to-[#68a4ff]">
                {t.hero.titleAccent}
              </span>
            </h1>
            <p className="text-base md:text-lg text-white/70 max-w-xl leading-relaxed mx-auto md:mx-0">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {t.hero.badges.map((b, bi) => (
                <span key={bi} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-white/80 border border-white/20">
                  <CheckCircle2 className="w-3 h-3 text-[#00C3C1]" /> {b}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link href="/#contact" className="w-full sm:w-auto">
                <Button size="lg" className="rounded-full px-8 gap-2 bg-[#00C3C1] text-[#0B1F3A] font-bold border-0 shadow-lg hover:bg-[#00a8a6] hover:scale-105 transition-all duration-200 cursor-pointer w-full">
                  {t.hero.cta1} <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/#work" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="rounded-full px-8 gap-2 border-white/30 text-white bg-transparent hover:bg-white/10 hover:text-white hover:border-white/50 hover:scale-105 transition-all duration-200 cursor-pointer w-full">
                  {t.hero.cta2} <ArrowUpRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="hidden sm:flex flex-1 justify-center max-w-md md:max-w-none w-full">
            <HeroImage />
          </div>
        </div>
      </section>

      <Marquee />

      <section id="services"><Solutions /></section>
      <section id="how-it-works"><ProblemSolution /></section>

      {/* CASE STUDIES */}
      <section id="work" className="py-14 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="reveal text-center mb-10 md:mb-14 space-y-3">
            <p className="font-mono text-xs font-semibold tracking-widest uppercase text-[#00C3C1]">{t.work.eyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-black leading-tight">{t.work.title}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">{t.work.subtitle}</p>
          </div>
          <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {projects.map((project) => (
              <div key={project.id} className={`reveal group flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 ${project.hoverBorder} ${project.hoverShadow}`}>
                <div className="relative overflow-hidden">
                  <Image src={project.image} alt={project.name} width={400} height={240} className="w-full h-48 sm:h-52 object-cover" />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-background/90 text-foreground text-xs rounded-full border">{project.service}</Badge>
                  </div>
                </div>
                <div className="flex flex-col flex-1 p-5 md:p-6 space-y-4">
                  <div>
                    <p className="font-mono text-xs font-semibold text-[#00C3C1] tracking-widest uppercase mb-1">{project.category}</p>
                    <h3 className="text-base md:text-lg font-bold text-foreground">{project.name}</h3>
                    <p className="text-xs text-muted-foreground">{project.company}</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs rounded-full">{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-4">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-foreground">{project.rating}</span>
                        <span>({project.reviews})</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {project.clients}+ {t.work.clients}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-green-500 dark:text-green-400">
                      <Clock className="w-3 h-3" /> {t.work.demo}
                    </span>
                  </div>
                  <div className="mt-auto">
                    <Link href={project.link} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className={`w-full rounded-xl gap-2 text-sm font-semibold cursor-pointer transition-all duration-200 ${project.btnHover}`}>
                        {t.work.viewProject} <ArrowUpRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TeamSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
