"use client";

import ceo from "@/img/ceo.png";
import cto from "@/img/cto.png";
import mokhinur from "@/img/mokhinur.png";
import tawney from "@/img/tawney.png";
import { useEffect, useRef } from "react";
import React from "react";
import {
  Lightbulb,
  Handshake,
  Star,
  ArrowRight,
  Globe,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import AnimatedCounter from "@/components/ui/animated-counter";
import Image from "next/image";
import Link from "next/link";
import StarBackground from "@/components/StarBackground";
import HeroImage from "@/components/HeroImage";

const team = [
  {
    name: "Tawney Kruger",
    role: "CEO & Founder",
    image: tawney,
    bio: "Growth-focused leader with expertise in media, marketing, and partnerships — formerly Head of Growth at kpi.com.",
  },
  {
    name: "Muzaffar Karabaev",
    role: "Co-Founder",
    image: ceo,
    bio: "Entrepreneur behind Wing, Zip.24, Le Bazaar, and kpi.com — building startups into global success stories.",
  },
  {
    name: "Khondamir Tuychiev",
    role: "Full-Stack Developer",
    image: cto,
    bio: "Engineer passionate about Next.js and TypeScript — creating seamless B2B solutions through modular design and innovation.",
  },
  {
    name: "Mushtariybonu Khusanova",
    role: "Chief Marketing Officer",
    image: mokhinur,
    bio: "Brand strategist driving customer engagement and growth through storytelling, data-driven campaigns, and market insight.",
  },
];

const milestones = [
  {
    year: "2025 June",
    event: "Zaytra.ai founded with vision to connect Uzbek tech to global markets",
  },
  {
    year: "2025 June",
    event: "First 25 Uzbek companies onboarded to marketplace",
  },
  {
    year: "2025 June",
    event: "Expanded to 8 MEA countries, 150+ partner companies",
  },
  {
    year: "2025 June",
    event: "Launched comprehensive CRM platform for clients",
  },
  {
    year: "2025 June",
    event: "Facilitated $50M+ in business deals across region",
  },
];

const values = [
  {
    title: "Innovation",
    description:
      "We believe in the power of technology to transform businesses and communities.",
    icon: Lightbulb,
  },
  {
    title: "Partnership",
    description:
      "Success comes from genuine collaboration and shared growth.",
    icon: Handshake,
  },
  {
    title: "Excellence",
    description:
      "We maintain the highest standards in everything we deliver to our partners.",
    icon: Star,
  },
  {
    title: "Cultural Bridge",
    description:
      "We understand and respect the diverse cultures we work with across regions.",
    icon: Globe,
  },
];

const About = () => {
  const heroRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll(".animate-fade-in-up");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section ref={heroRef} className="bg-gradient-to-b from-[#00C3C1]/65 to-white relative min-h-screen flex items-center justify-center overflow-hidden animate-fade-in-up">
        <StarBackground />
        {/* Левая иконка (только на десктопе) */}
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between ">

          {/* Left Side - Image */}
          {/* Left Side - Image */}
          <div className="flex-1 flex justify-center">
            <HeroImage />
          </div>

          {/* Right Side - Text */}
          <div className="flex-1 text-center md:justify-end space-y-8 animate-fade-in-up">
            <div className="flex md:justify-end items-center justify-center space-x-4 my-6">

              <p className="text-xl uppercase text-white font-bold tracking-wide [text-shadow:1px_1px_2px_black] ">
                You create. We scale. Join Zaytra.
              </p>


            </div>

            <div className="space-y-4 md:text-right animate-fade-in-up">
              <h1 className=" text-4xl lg:text-6xl font-semibold leading-tight text-black">
                Beyond Borders
                <span className="block text-3xl lg:text-5xl bg-clip-text drop-shadow-sm">
                  Toward Impact
                </span>
              </h1>
              <p className="inline-block text-xl border-b-2 border-white pb-1 uppercase text-white font-bold tracking-wide [text-shadow:1px_1px_2px_black]">
                Who We Are ?
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 animate-fade-in-up">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-8  cursor-default">
          <InfoCard icon={<TrendingUp className="w-8 h-8" />} title="Our Mission">
            To empower tech companies to scale globally through a curated marketplace,
            entry support, and enablement services tailored for MEA markets.
          </InfoCard>
          <InfoCard icon={<Globe className=" w-8 h-8" />} title="Our Vision">
            To become the bridge between Uzbek software providers and MEA regions, fostering innovation and prosperity.
          </InfoCard>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gradient-to-b from-[#00C3C1]/65 to-white animate-fade-in-up">
        <StarBackground />
        <div className="container mx-auto px-4">
          <SectionHeader title="Meet Our Team" subtitle="40+ expert team in Tashkent drives innovation, seamless product development, and top-tier global support." />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((m, i) => (
              <Card key={i} className="border border-white hover:border-accent cursor-default hover:bg-primary/40 text-center shadow-md hover-lift transition-transform duration-200 bg-transparent ">
                <CardContent className="p-6 space-y-4">
                  <Image
                    src={m.image}
                    alt={m.name}
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full mx-auto object-cover"
                  />
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg tracking-wide dark:[text-shadow:1px_1px_2px_black]">{m.name}</h3>
                    <p className="p-2 text-primary text-sm font-semibold tracking-wide ">{m.role}</p>
                    <p className="text-medium  dark:[text-shadow:1px_1px_5px_black]">{m.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 animate-fade-in-up">
        <div className="container mx-auto px-4">
          <SectionHeader title="Our Journey" subtitle="Milestones of connecting Uzbek innovation to the world." />
          <div className="space-y-8 max-w-4xl mx-auto ">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-4 items-center ">
                <div className="w-16 h-16 rounded-full flex items-center justify-center font-bold tracking-wide">
                  {m.year}
                </div>
                <div className="rounded-full bg-card p-6 shadow w-full ring-2 ring-accent/ hover-lift transition-transform duration-200 cursor-default">
                  <p className="">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gradient-to-b from-[#00C3C1]/65 to-white animate-fade-in-up">
        <StarBackground />
        <div className="container mx-auto px-4">
          <SectionHeader title="Our Values" subtitle="What guides Zaytra.ai every day." />
          <div className="grid lg:grid-cols-4 gap-8">
            {values.map((val, i) => (
              <div key={i} className="text-center space-y-4 ">
                <div className="bg-primary w-16 h-16 mx-auto rounded-full flex items-center justify-center bg-background/80 shadow-md hover-lift transition-transform duration-200 cursor-default">
                  <val.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold tracking-wider dark:[text-shadow:1px_1px_2px_black] text-lg ">{val.title}</h4>
                <p className="dark:text-black text-sm ">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 animate-fade-in-up">
        <div className="container mx-auto px-4 text-center space-y-6 max-w-2xl">
          <h2 className="text-4xl font-bold">Ready to Join Our Success Story?</h2>
          <p className="text-lg">
            Whether you&apos;re a tech company looking to expand or a MEA business seeking innovative solutions,
            let&apos;s build something amazing together.
          </p>
          <div className="flex justify-center gap-4 flex-wrap group inline-flex items-center gap-1 cursor-pointer">
            <Link href="/vendor-application">
              <Button variant="default" size="lg" className="rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer">
                Partner With Us <ArrowRight className="transition-transform group-hover:translate-x-1 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className=" rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer ring-2 ring-accent/ ">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const Stat = ({ label, value, suffix = "" }: { label: string; value: number; suffix?: string }) => (
  <div className="text-center">
    <div className="text-3xl font-bold text-primary ">
      <AnimatedCounter end={value} suffix={suffix} />
    </div>
    <div className="text-muted-foreground text-sm ">{label}</div>
  </div>
);

const InfoCard = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <Card className="relative overflow-hidden rounded-2xl p-8 ring-2 hover:ring-accent shadow-md hover-lift transition-transform duration-200">
    <div className="opacity-30 absolute inset-0 -z-10">
      <StarBackground />
    </div>
    <CardContent className="space-y-6">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center ">
        {icon}
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground text-base leading-relaxed">{children}</p>
      </div>
    </CardContent>
  </Card>
);

const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="text-center space-y-2 mb-12 ">
    <h2 className="dark:[text-shadow:1px_1px_2px_black] text-3xl font-bold ">{title}</h2>
    <p className="dark:[text-shadow:1px_1px_2px_black] max-w-2xl mx-auto">{subtitle}</p>
  </div>
);

export default About;