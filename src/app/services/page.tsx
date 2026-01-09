"use client"

import { useEffect } from "react";
import { Check, Video, ArrowRight, Megaphone, Users, TrendingUp, MessageSquare, Globe, CalendarClock, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Footer from '@/components/Footer';
import Link from 'next/link';
import StarBackground from "@/components/StarBackground";
import HeroImage from "@/components/HeroImage";


const Services = () => {


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

  const startupsPackages = [
    {
      name: "LaunchPad",
      price: "$250",
      period: "/month",
      description: "Essentials to launch in MEA",
      popular: false,
      features: [
        "4 posts on 1 platform",
        "1 blog & image design",
        "Case study + newsletter",
        "Monthly summary + event access"
      ]
    },
    {
      name: "Growth",
      price: "$750",
      period: "/month",
      description: "Faster Growth via Media",
      popular: true,
      features: [
        "8 posts on 2 platforms",
        "2 blogs + 1 video/graphic",
        "Bi-weekly report, 3 case studies",
        "Media pitch + onboarding support"
      ]
    },
    {
      name: "Pro Package",
      price: "$1,500",
      period: "/month",
      description: "All-in-one for scaling visibility",
      popular: false,
      features: [
        "12 posts on 3 platforms",
        "4 premium content pieces",
        "Weekly insights + competitor check",
        "Case study, interviews, onboarding"
      ]
    }
  ];


  const businessPackages = [
    {
      name: "Market Ready",
      price: "$1,000",
      period: "/month",
      description: "Get set for MEA expansion",
      popular: false,
      features: [
        "12 posts on 2 platforms",
        "2 blogs + visuals",
        "KPI dashboards + case study",
        "Interview & newsletter feature"
      ]
    },
    {
      name: "Regional Reach",
      price: "$2,500",
      period: "/month",
      description: "Full regional visibility + outreach",
      popular: true,
      features: [
        "16 posts + mod (3 platforms)",
        "4 premium assets",
        "2 interviews + 2 platform outreach",
        "Landing page + account manager"
      ]
    },
    {
      name: "Global Play",
      price: "$4,500",
      period: "/month",
      description: "Dominate across MEA & beyond",
      popular: false,
      features: [
        "Full coverage + paid ad mgmt",
        "6 content pieces (localized)",
        "2 case studies + press release",
        "Booth support + brand manager"
      ]
    }
  ];


  const addOnServices = [
    {
      name: "Video Production",
      price: "From $500",
      description: "Professional video\ncreation",
      icon: Video
    },
    {
      name: "Event Representation",
      price: "From $1,000",
      description: "Booth & networking\nat events",
      icon: Users
    },
    {
      name: "Ad Campaign Setup",
      price: "From $350",
      description: "Targeted ad\nlaunch + setup",
      icon: Megaphone
    },
    {
      name: "Arabic Localization",
      price: "$200/page",
      description: "Native translation\n & adaptation",
      icon: Globe
    }
  ];




  return (
    <div className="min-h-screen bg-background ">

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#00C3C1]/65 to-white relative min-h-screen flex items-center justify-center overflow-hidden animate-fade-in-up">
        <StarBackground />
        {/* Левая иконка (только на десктопе) */}
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between ">

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
                Market Entry
                <span className="block text-3xl lg:text-5xl bg-clip-text drop-shadow-sm">
                  Services
                </span>
              </h1>
              <p className="inline-block text-xl border-b-2 border-white pb-1 uppercase text-white font-bold tracking-wide [text-shadow:1px_1px_2px_black]">
               Marketing Services
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 animate-fade-in-up">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="startups" className="w-full">
            <div className="text-center mb-12">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 rounded-full
              dark:bg-muted/70">
                <TabsTrigger
                  value="startups"
                  className="data-[state=active]:bg-primary 
                  data-[state=active]:text-white 
                  dark:data-[state=active]:bg-white 
                  dark:data-[state=active]:text-black 
                  text-muted-foreground cursor-pointer rounded-full"
                >
                  <Users className="w-4 h-4 mr-2 " />
                  Startups
                </TabsTrigger>

                <TabsTrigger
                  value="business"
                  className="data-[state=active]:bg-primary 
                  data-[state=active]:text-white 
                  dark:data-[state=active]:bg-white 
                  dark:data-[state=active]:text-black 
                  text-muted-foreground cursor-pointer rounded-full"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Established Business
                </TabsTrigger>


              </TabsList>
            </div>

            {/* Startups Packages */}
            <TabsContent value="startups" className="space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold">Startup Market Entry Packages</h2>
                <p className="mx-auto max-w-2xl text-muted-foreground ">
                  Perfect for startups and tech companies looking for visibility and export opportunities in MEA markets.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {startupsPackages.map((pkg, index) => (
                  <Card key={index} className={`relative hover-lift ${pkg.popular ? 'ring-3 ring-accent border-accent shadow-xl ' : 'ring'}`}>
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className=" px-4 py-1 rounded-full">
                          Most Popular
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="text-center space-y-4 p-8">
                      <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                      <p className="text-muted-foreground">{pkg.description}</p>
                      <div className="space-y-2">
                        <div className="text-4xl font-bold text-primary-500">
                          {pkg.price}
                        </div>
                        <div className="text-muted-foreground">{pkg.period}</div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-8 pt-0 space-y-6 items-center gap-1 cursor-pointer ">
                      <div className="space-y-3 ">
                        {pkg.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Button variant="default"
                        className={`rounded-full w-full transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer `}
                      >
                        Get Started
                        <ArrowRight className="transition-transform group-hover:translate-x-1 w-4 h-4" />
                      </Button>

                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Business Packages */}
            <TabsContent value="business" className="space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold">Enterprise Market Entry Packages</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  For SMEs, exporters, and scaleups entering or expanding in MEA with aggressive market goals.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {businessPackages.map((pkg, index) => (
                  <Card key={index} className={`relative hover-lift ${pkg.popular ? 'ring-3 ring-accent border-accent shadow-xl' : 'ring'}`}>
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className=" px-4 py-1 rounded-full">
                          Most Popular
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="text-center space-y-4 p-8">
                      <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                      <p className="text-muted-foreground">{pkg.description}</p>
                      <div className="space-y-2">
                        <div className="text-4xl font-bold text-primary-500">
                          {pkg.price}
                        </div>
                        <div className="text-muted-foreground">{pkg.period}</div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-8 pt-0 space-y-6">
                      <div className="space-y-3">
                        {pkg.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Button variant="default"
                        className={`rounded-full w-full transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer `}
                      >
                        Get Started
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Add-on Services */}
      <section className="py-16 bg-gradient-to-b from-[#00C3C1]/65 to-white animate-fade-in-up">
        <StarBackground />
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl dark:[text-shadow:1px_1px_2px_black] font-bold">Custom Add-on Services</h2>
            <p className=" max-w-2xl dark:[text-shadow:1px_1px_2px_black] mx-auto">
              Enhance your package with specialized services tailored to your specific needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOnServices.map((service, index) => (
              <Card key={index} className="hover-lift border-white text-center p-6 cursor-default bg-primary/50 shadow-xl hover:ring-accent ">
                <CardContent className="text-black dark:text-white flex flex-col flex-1 justify-between items-center text-center space-y-4">
                  <div className=" border border-white w-12 h-12 rounded-full flex items-center justify-center bg-accent shadow-xl">
                    <service.icon className="w-6 h-6 " />
                  </div>

                  <div className=" flex-1 flex flex-col justify-between space-y-2">
                    <h3 className="font-semibold tracking-wide whitespace-pre-line ">{service.name}</h3>
                    <p className="text-sm whitespace-pre-line">{service.description}</p>
                  </div>

                  <div className="text-lg font-bold tracking-wide leading-relaxed ">
                    {service.price}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 animate-fade-in-up">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold">Our Proven Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              How we help you successfully enter MEA markets in 4 simple steps.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Market Analysis",
                description: "Deep dive into your target MEA markets and opportunities",
                icon: Globe
              },
              {
                step: "02",
                title: "Strategy Development",
                description: "Create customized go-to-market strategy with localization plan",
                icon: TrendingUp
              },
              {
                step: "03",
                title: "Content & Campaigns",
                description: "Launch targeted marketing campaigns with localized content",
                icon: MessageSquare
              },
              {
                step: "04",
                title: "Sales & Support",
                description: "Dedicated sales representation and ongoing market support",
                icon: Users
              }
            ].map((process, index) => (
              <div key={index} className="text-center space-y-4 group">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <process.icon className="w-10 h-10 " />
                </div>
                <div className="text-2xl font-bold text-primary-500">{process.step}</div>
                <h3 className="text-xl font-semibold">{process.title}</h3>
                <p className="text-muted-foreground">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-[#00C3C1]/65 to-white animate-fade-in-up">
        <StarBackground />
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl dark:[text-shadow:1px_1px_2px_black] font-bold tracking-wide">
              Ready to Enter MEA Markets?
            </h2>
            <p className="text-xl dark:[text-shadow:1px_1px_2px_black]">
              Schedule a free consultation to discuss your market entry strategy and find the perfect package for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact#contact-form" className="w-full sm:w-auto">
                <Button variant="default" size="lg" className="rounded-full w-full transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer">
                  <CalendarClock className="w-5 h-5" />
                  Schedule Free Consultation
                </Button>
              </Link>
              <Link href="/docs/Zaytra.ai_About_us.pdf" target="_blank" className="w-full sm:w-auto">
                <Button variant="ghost" size="lg" className="text-black ring-2 ring-white px-4 py-4 w-full sm:w-auto rounded-full cursor-pointer hover:text-white ">
                  <Download className="w-5 h-5 " />
                  Download Service Guide
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};



export default Services;

