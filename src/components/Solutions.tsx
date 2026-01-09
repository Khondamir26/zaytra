"use client";


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Store,
  Palette,
  Users,
  Mail,
  BarChart3,
  Smartphone,
  Globe,
  Blocks,
  Bot,
  ArrowRight
} from "lucide-react";
import Link from 'next/link';
import StarBackground from './StarBackground';

const Solutions = () => {
  return (
    <section className="py-24 animate-fade-in-up bg-muted">
      <StarBackground />
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <Link className="inline-flex items-center justify-center gap-1 px-2 py-0.5 text-xs font-medium whitespace-nowrap w-fit 
                     rounded-full border border-primary/20 bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer hover-lift transition-transform duration-200 " href="/about" >
            Our Solutions
            <ArrowRight className="w-3 h-3" />
          </Link>
          <h2 className="text-4xl md:text-5xl font-bold  text-foreground text-center font-extrabold leading-tight">
            Everything You Need to Scale Globally
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Two powerful platforms working together to accelerate your growth
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          {/* AI Marketing Engine */}
          <Card className="hover:bg-muted ring-3 hover:ring-accent cursor-default border shadow-floating hover:scale-105 transition-all duration-300">
            <CardHeader className="text-center pb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-ai rounded-full mx-auto mb-4">
                <Brain className="w-8 h-8" />
              </div>
              <CardTitle className="text-3xl font-bold text-foreground">
                Zaytra AI Marketing Engine
              </CardTitle>
              <p className="text-muted-foreground">
                Complete automated marketing system powered by AI
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Palette className="w-5 h-5" />
                  <span className="text-sm font-medium">GPT-based content & copy</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Smartphone className="w-5 h-5" />
                  <span className="text-sm font-medium">AI visuals generation</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Users className="w-5 h-5 " />
                  <span className="text-sm font-medium">Auto social media posting</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm font-medium">Lead gen & outreach</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <BarChart3 className="w-5 h-5" />
                  <span className="text-sm font-medium">CRM sync & analytics</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Bot className="w-5 h-5" />
                  <span className="text-sm font-medium">Email/SMS flows</span>
                </div>
              </div>
              <Link href="/ai-tools" className="group">
                <Button variant="default" className="shadow-lg w-full mt-6 rounded-full cursor-pointer ">
                  Explore AI Engine
                  <ArrowRight className="transition-transform group-hover:translate-x-1 w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Marketplace Platform */}
          <Card className="hover:bg-muted ring-3 hover:ring-accent cursor-default border shadow-floating hover:scale-105 transition-all duration-300">
            <CardHeader className="text-center pb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-growth rounded-full mx-auto mb-4">
                <Store className="w-8 h-8" />
              </div>
              <CardTitle className="text-3xl font-bold text-foreground">
                Zaytra Marketplace Platform
              </CardTitle>
              <p className="text-muted-foreground">
                Global B2B marketplace with AI-powered features
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Globe className="w-5 h-5" />
                  <span className="text-sm font-medium">Global software listings</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Blocks className="w-5 h-5 " />
                  <span className="text-sm font-medium">No-code app builder</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Users className="w-5 h-5 " />
                  <span className="text-sm font-medium">Demo & lead tracking</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <BarChart3 className="w-5 h-5" />
                  <span className="text-sm font-medium">Analytics & reporting</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Bot className="w-5 h-5" />
                  <span className="text-sm font-medium">AI assistants</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Smartphone className="w-5 h-5" />
                  <span className="text-sm font-medium">Installable modules</span>
                </div>
              </div>
              <Link href="/marketplace" className="group">
                <Button variant="default" className="shadow-lg w-full mt-6 rounded-full cursor-pointer">
                  Join Marketplace
                  <ArrowRight className="transition-transform group-hover:translate-x-1 w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Solutions;