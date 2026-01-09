"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, CheckCircle, BarChart, Megaphone, Globe2, Target, Store } from "lucide-react";
import StarBackground from './StarBackground';

const problems = [
  {
    icon: AlertCircle,
    problem: "No one knows about your product",
    solution: "Our AI marketing engine drives awareness",
    color: "text-red-500",
    bgColor: "bg-red-50"
  },
  {
    icon: BarChart,
    problem: "No funnel, no CRM",
    solution: "We deliver an automated GTM system.",
    color: "text-orange-500",
    bgColor: "bg-orange-50"
  },
  {
    icon: Megaphone,
    problem: "Product isn't packaged, no social presence",
    solution: "We create. We storytell. We design.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50"
  },
  {
    icon: Globe2,
    problem: "Global market entry is overwhelming",
    solution: "GTM strategy and listings — fully managed.",
    color: "text-blue-500",
    bgColor: "bg-blue-50"
  },
  {
    icon: Target,
    problem: "No inbound leads",
    solution: "AI-driven lead gen and nurturing.",
    color: "text-purple-500",
    bgColor: "bg-purple-50"
  },
  {
    icon: Store,
    problem: "Don't know where to sell",
    solution: "Reach buyers in our B2B marketplace.",
    color: "text-green-500",
    bgColor: "bg-green-50"
  }
];

const ProblemSolution = () => {
  return (
    <section className="py-24 animate-fade-in-up">
      <div className="container px-4 mx-auto space-y-12">
        <div className="text-center mb-16 ">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground text-center font-extrabold leading-tight">
            How We Help You Overcome Growth Blockers
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We understand the challenges every SaaS faces. That&apos;s why we&apos;ve built solutions
            for the most common growth blockers that keep products from reaching their potential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="group relative overflow-hidden transition-all duration-300 hover-lift hover:border-accent dark:hover:border-accent dark:border-white shadow-card shadow-sm ">
                {/* Фон — синхронно с карточкой */}
                <div className="opacity-30 absolute inset-0 -z-10">
                  <StarBackground />
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Problem */}
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${item.bgColor} flex-shrink-0`}>
                        <Icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Problem:</h3>
                        <p className="text-muted-foreground text-sm">{item.problem}</p>
                      </div>
                    </div>

                    {/* Solution */}
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Solution:</h3>
                        <p className="text-muted-foreground text-sm">{item.solution}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;