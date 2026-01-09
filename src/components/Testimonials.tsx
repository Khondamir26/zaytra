"use client";

import { useTheme } from "next-themes"
import React, { useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import Image from 'next/image';
import willy from "@/img/willy.jpg";
import sarah from "@/img/sarah.jpg";
import alex from "@/img/alex.jpg";
import john from "@/img/john.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";


const testimonials = [
  {
    quote: "Zaytra helped us go to 120 inbound leads/month.",
    author: "Sarah Chen",
    role: "Founder, TechFlow",
    image: sarah, // Replace with actual paths
    rating: 5
  },
  {
    quote: "Finally, a marketplace that promotes local SaaS, not just global giants.",
    author: "Marcus Rodriguez",
    role: "CEO, DataSync",
    image: john, // Replace with actual paths
    rating: 5
  },
  {
    quote: "Finally, a marketplace that promotes local SaaS, not just global giants.",
    author: "Willy Wonka",
    role: "Marketing Director",
    image: willy, // Replace with actual paths
    rating: 5
  },
  {
    quote: "No-code + vendors = product growth playground.",
    author: "Alex Lee",
    role: "Product Lead, CloudBase",
    image: alex, // Replace with actual paths
    rating: 5
  }
];

const Testimonials = () => {
  const { theme } = useTheme()
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const intervalRef = useRef<number | null>(null);

  // дублируем, чтобы слой никогда не “упирался” и переход всегда выглядел как движение вправо
  const effectiveTestimonials = React.useMemo(() => {
    if (testimonials.length === 0) return [];
    // повторяем дважды (можешь увеличить repeats если нужно ещё более плавно)
    return [...testimonials, ...testimonials];
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const play = () => {
      emblaApi.scrollNext(); // всегда вперёд
    };

    // старт автоплея
    intervalRef.current = window.setInterval(play, 4000);

    // пауза при взаимодействии, затем перезапуск
    const stopAutoplay = () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    const restartAutoplay = () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = window.setInterval(play, 4000);
    };

    emblaApi.on("pointerDown", stopAutoplay);
    emblaApi.on("pointerUp", restartAutoplay);
    emblaApi.on("select", restartAutoplay);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      emblaApi.off("pointerDown", stopAutoplay);
      emblaApi.off("pointerUp", restartAutoplay);
      emblaApi.off("select", restartAutoplay);
    };
  }, [emblaApi]);

  if (!effectiveTestimonials.length) {
    return null;
  }

  return (
    <section className="py-20 animate-fade-in-up bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-3xl font-black mb-6 text-foreground">
            Join hundreds of successful SaaS companies growing with Zaytra.ai
          </h2>
          {/* <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join hundreds of successful SaaS companies growing with Zaytra
          </p> */}
        </div>


        <Carousel
          className="hidden relative overflow-hidden xl:overflow-visible"
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]} >
          <div ref={emblaRef}>
            <CarouselContent>
              {effectiveTestimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="flex-shrink-0 sm:basis-1/1 md:basis-1/1 lg:basis-1/3 ">
                  <Card className="h-full flex flex-col text-center border-0 shadow-card 
                hover:shadow-floating transition-all duration-300 group">
                    <CardContent className="p-8 flex flex-col flex-1 space-y-6 ">
                      <Quote className="w-10 h-10 text-primary/20 mx-auto" />
                      <div className="flex justify-center gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-lg text-foreground leading-relaxed font-medium italic flex-1">
                        {testimonial.quote}
                      </p>
                      {/* Avatar + Name/Role */}
                      <div className="space-y-2">
                        <div className="w-24 h-24 mx-auto relative rounded-full overflow-hidden">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.author}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{testimonial.author}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>

                    </CardContent>
                  </Card>

                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
          <CarouselPrevious />
          <CarouselNext />

        </Carousel>

        {/* Trust indicators */}
        <div className="mt-16 text-center ">
          <p className="text-muted-foreground font-bold mb-6 uppercase">Brands that trust us</p>
          <div className="flex flex-wrap justify-center gap-18 items-center">
            {[
              {
                src:
                  theme === "dark"
                    ? "/icons/turan-dark.png"
                    : "/icons/turan-light.png",
                alt: "TuranSecurity",
              },
              {
                src:
                  theme === "dark"
                    ? "/icons/fintech-dark.png"
                    : "/icons/fintech-light.png",
                alt: "Fintech",
              },
              {
                src:
                  theme === "dark"
                    ? "/icons/it-park-dark.png"
                    : "/icons/it-park-light.png",
                alt: "IT-PARK",
              },
              {
                src:
                  theme === "dark"
                    ? "/icons/praaktisgo-dark.png"
                    : "/icons/praaktisgo-light.png",
                alt: "Praaktisgo",
              },
              {
                src:
                  theme === "dark"
                    ? "/icons/kpi-dark.png"
                    : "/icons/kpi-light.png",
                alt: "KPI",
              },
            ].map((logo, index) => (
              <div key={index} className="transition-transform hover:scale-105 ">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={105}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
