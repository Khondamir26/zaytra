"use client";

import AgentForm from "@/components/AgentForm";
import { marketingAgents } from "@/config/agentsConfig";
import HeroImage from "@/components/HeroImage";
import StarBackground from "@/components/StarBackground";
import { useEffect, useRef, useState } from "react";
import { TrendingUp, Search, Lightbulb, Calendar, PenTool, BarChart3, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
// Friendly labels (для меток полей)
const fieldLabels: Record<string, string> = {
  query: "Message",
  product_name: "Enter the Product Name",
  industry: "Enter the Industry",
  target_audience: "Target Audience",
  campaign_goal: "Campaign Goal",
  competitor: "Enter Competitor",
  platform: "Platform (Instagram, LinkedIn, etc.)",
  audience: "Audience",
  tone: "Tone",
  recipient: "Recipient Email",
  to: "Recipient Address",
  from_email: "Sender Email",
  password: "Email Password",
  subject: "Email Subject",
  send_email: "Send Email",
  channels: "Channels",
  duration: "Duration",
};

const fieldPlaceholders: Record<string, Record<string, string>> = {
  "market-trend-research": {
    query: "Redefining performance and creativity in the modern workspace",
    product_name: "MacBook Pro 16",
    industry: "Consumer Electronics / Laptops",
    target_audience: "Creative professionals, developers, students",
    campaign_goal: "Increase adoption among professionals switching from Windows",
    competitor: "Microsoft Surface Laptop Studio",
    platform: "LinkedIn",
    audience: "",
    tone: "professional",
    recipient: "",
    to: "",
    from_email: "",
    password: "",
    subject: "",
    send_email: "false",
    channels: '["email"]',
    duration: "1 week",
  },
  "creative-ideas": {
    query: "Generate creative marketing ideas for a new productivity app",
    product_name: "FocusMate Pro",
    industry: "Productivity / Software / Mobile Apps",
    target_audience: "Freelancers, remote workers, students",
    campaign_goal: "Increase app downloads and user engagement",
    competitor: "Todoist, Notion, Trello",
    platform: "Instagram",
    audience: "Business clients, tech enthusiasts",
    tone: "professional",
    recipient: "marketing@company.com",
    to: "client@example.com",
    from_email: "admin@company.com",
    password: "",
    subject: "Company Profile Request",
    send_email: "false",
    channels: '["email", "social"]',
    duration: "1 week",
  },
  "company-profile": {
    query: "Create a company profile for a software startup in Uzbekistan",
    product_name: "TechBridge AI",
    industry: "Software Development / B2B",
    target_audience: "MEA businesses, software buyers",
    campaign_goal: "Showcase company's capabilities and products",
    competitor: "Other local IT service providers",
    platform: "Instagram",
    audience: "Business professionals",
    tone: "professional",
    recipient: "marketing@techbridge.ai",
    to: "client@example.com",
    from_email: "admin@techbridge.ai",
    password: "",
    subject: "Company Profile Request",
    send_email: "false",
    channels: '["email", "social"]',
    duration: "1 week",
  },
  "content-planner": {
    query: "Create a company profile for a software startup in Uzbekistan",
    product_name: "TechBridge AI",
    industry: "Software Development / B2B",
    target_audience: "MEA businesses, software buyers",
    campaign_goal: "Showcase company's capabilities and products",
    competitor: "Other local IT service providers",
    platform: "Instagram",
    audience: "Business professionals",
    tone: "professional",
    recipient: "marketing@techbridge.ai",
    to: "client@example.com",
    from_email: "admin@techbridge.ai",
    password: "",
    subject: "Company Profile Request",
    send_email: "false",
    channels: '["email","social"]',
    duration: "1 week",
  },
  "image-generation": {
    query: "Create a product hero image for a new AI-powered marketing software",
    product_name: "InsightPro Suite",
    industry: "Digital Marketing / B2B",
    target_audience: "Marketing managers, growth teams, and content creators",
    campaign_goal: "Generate visual assets for campaigns and social media posts",
    competitor: "HubSpot, Marketo, Mailchimp",
    platform: "Instagram",
    audience: "Business professionals and marketing decision-makers",
    tone: "Professional",
    recipient: "marketing@insightpro.com",
    to: "client@example.com",
    from_email: "admin@insightpro.com",
    password: "",
    subject: "AI Image Generation Request",
    send_email: "false",
    channels: '["email","social"]',
    duration: "1 week",
  }
};

export default function AIToolsPage() {

  const heroRef = useRef<HTMLElement>(null);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const closeModal = () => setSelectedAgentId(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".animate-fade-in-up");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="bg-gradient-to-b from-[#00C3C1]/65 to-white relative min-h-screen flex items-center justify-center overflow-hidden animate-fade-in-up "
      >
        <StarBackground />

        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
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
              <h1 className="text-4xl lg:text-6xl font-semibold leading-tight text-black">
                Intelligence in Action
                <span className="block text-3xl lg:text-5xl bg-clip-text drop-shadow-sm">
                  Powered by Zaytra
                </span>
              </h1>
              <p className="inline-block text-xl border-b-2 border-white pb-1 uppercase text-white font-bold tracking-wide [text-shadow:1px_1px_2px_black]">
                Discover Our AI Tools
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Agent Forms Section */}
      <div className="space-y-12 p-6">
        {/* Карточки */}
        <div className="container mx-auto mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {marketingAgents.map((agent, index) => {
            // Иконки для примера, можно настроить по agent.id
            const icons = [TrendingUp, Search, Lightbulb, Calendar, PenTool, BarChart3];
            const Icon = icons[index % icons.length];

            return (
              <div
                key={agent.id}
                className="group relative overflow-hidden rounded-2xl border border-primary bg-card p-8 shadow-sm hover:shadow-lg cursor-pointer transition-transform duration-300 hover:-translate-y-1 h-80 flex flex-col justify-between"
                onClick={() => setSelectedAgentId(agent.id)}
              >
                {/* Верхняя полоска */}
                <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-primary to-secondary"></div>

                {/* Иконка */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-[var(--secondary)]/10 group-hover:from-[var(--primary)]/20 group-hover:to-[var(--secondary)]/20 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>

                {/* Текст */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                    {agent.name}
                  </h3>
                  <p className="mt-3 text-[var(--muted-foreground)] leading-relaxed">
                    {agent.description}
                  </p>
                </div>

                {/* Learn More */}
                <div className="mt-6 flex items-center">
                  <span className="inline-flex items-center text-lg font-medium text-primary hover:text-secondary transition-colors duration-200 py-1 rounded-lg">
                    Learn more
                    <ArrowRight className="ml-1 w-4 h-4 " />
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--primary)]/5 to-[var(--secondary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Модальное окно (не трогаем) */}
        {selectedAgentId && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 scrollbar-none"
            onClick={closeModal}
          >
            <div
              className="ring-2 border-navy bg-background rounded-2xl p-6 max-w-7xl w-full shadow-lg relative overflow-y-auto "
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 hover:text-destructive text-xl font-bold cursor-pointer"
                onClick={closeModal}
              >
                ✕
              </button>

              {marketingAgents
                .filter((agent) => agent.id === selectedAgentId)
                .map((agent) => {
                  const placeholders = fieldPlaceholders[agent.id] || {};
                  const fields = agent.defaultPayload
                    ? Object.entries(agent.defaultPayload).map(([key, value]) => {
                      let type: "text" | "textarea" | "checkbox" = "text";
                      if (typeof value === "boolean") type = "checkbox";
                      else if (key === "query" || key === "campaign_goal") type = "textarea";

                      return {
                        key,
                        label: fieldLabels[key] || key,
                        placeholder: String(placeholders[key] ?? ""),
                        type,
                        default: value,
                      };
                    })
                    : [];

                  return (
                    <AgentForm
                      key={agent.id}
                      name={agent.name}
                      endpoint={agent.endpoint}
                      fields={fields}
                    />
                  );
                })}
            </div>
          </div>
        )}

      </div>

      <Footer />
    </div>

  );
}
