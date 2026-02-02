"use client";

import React from 'react';
import { useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  UsersRound,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import ProblemSolution from './ProblemSolution';
import Solutions from './Solutions';
import Testimonials from './Testimonials';
import StarBackground from './StarBackground';
import HeroImage from "@/components/HeroImage";

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);

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
    <div className="min-h-screen bg-background text-foreground transition-colors">

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

              <p className="text-xl uppercase text-white font-bold tracking-wide [text-shadow:1px_1px_2px_black]">
                You create. We scale. Join Zaytra.
              </p>
              
            </div>

            <div className="space-y-4 md:text-right animate-fade-in-up">
              <h1 className=" text-4xl lg:text-6xl font-semibold leading-tight text-black">
                Your Bridge to the
                <span className="block text-3xl lg:text-5xl bg-clip-text drop-shadow-sm">
                  World’s Markets
                </span>
              </h1>
              <p className="inline-block border-b-2 border-white pb-1 uppercase text-white font-bold tracking-wide [text-shadow:1px_1px_2px_black]">
               Sales Enablement & Marketplace Agency
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
              <Link href="/marketplace" passHref>
                <Button variant="default" size="lg" className="cursor-pointer w-full px-6 py-4 rounded-full">
                  Explore Marketplace
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/marketplace" passHref>
                <Button variant="ghost" size="lg" className="w-full text-black ring-2 ring-white px-6 py-4 rounded-full hover:text-white">
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Problem Section */}
      <ProblemSolution />
      {/* Solution Section  */}
      <Solutions />
      {/* Testimonials */}
      <Testimonials />
      {/* Who We Serve */}
      <section className="py-24 animate-fade-in-up bg-gradient-to-b from-[#00C3C1]/65 to-white">
        <StarBackground />
        <div className="container px-4 mx-auto text-center space-y-8">
          <h2 className="dark:[text-shadow:1px_1px_2px_black] text-5xl font-bold">Ready to Grow?</h2>
          <p className="dark:[text-shadow:1px_1px_2px_black] max-w-2xl mx-auto">
            Build your visibility engine — or start selling globally.
            Join thousands of SaaS companies accelerating their growth with Zaytra.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={{ pathname: "/contact", query: { scroll: "1" } }} passHref>
              <Button variant="default" size="lg" className="rounded-full transition-all w-full duration-200 hover:scale-105 hover:shadow-lg cursor-pointer ">
                <UsersRound className="w-5 h-5" />
                Apply as a Zaytra Client
              </Button>
            </Link>
            <Link href={{ pathname: "/vendor-application", query: { scroll: "1" } }} passHref>
              <Button variant='ghost' size="lg" className=" text-black ring-2 ring-white px-4 py-4 w-full sm:w-auto rounded-full cursor-pointer hover:text-white">
                <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Apply as a Vendor
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
