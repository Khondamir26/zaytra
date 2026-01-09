"use client";

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { Faq } from "@/components/faq";
import { sanitizePayload } from "@/lib/sanitizePayload";
import StarBackground from '@/components/StarBackground';
import { usePathname, useSearchParams } from "next/navigation";
import HeroImage from "@/components/HeroImage";

// Types for your form data
interface FormData {
  name: string;
  email: string;
  company?: string;
  phone: string;
  service?: string;
  message: string;
}

interface ApiResponse {
  message?: string;
  error?: string;
  details?: string[];
  contact?: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
  };
}



const Contact = () => {
  const formRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const shouldScroll = searchParams.get("scroll") === "1";

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
  useEffect(() => {
    if (pathname !== "/contact" || !shouldScroll || !formRef.current) return;

    // Если где-то глобально включено CSS smooth, отключим на время,
    // чтобы не конфликтовать с кастомной анимацией
    const root = document.documentElement;
    const prevBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    const targetY = formRef.current.getBoundingClientRect().top + window.scrollY;
    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 2500; // медленнее — увеличь число
    let startTime: number | null = null;
    let rafId = 0;

    const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

    const step = (time: number) => {
      if (startTime === null) startTime = time;
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOut(progress);

      window.scrollTo(0, startY + distance * eased);

      if (elapsed < duration) {
        rafId = requestAnimationFrame(step);
      } else {
        root.style.scrollBehavior = prevBehavior; // вернуть поведение
      }
    };

    // даём кадр на layout после навигации
    const rafStart = requestAnimationFrame(() => {
      rafId = requestAnimationFrame(step);
    });

    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(rafStart);
      root.style.scrollBehavior = prevBehavior;
    };
  }, [pathname, shouldScroll]);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: undefined,
    message: '',
  });
  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);


  // Handle form field changes
  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // ✅ THIS IS THE UPDATED handleSubmit FUNCTION
  const handleSubmit = async (e: React.FormEvent) => {
    const cleanedPayload = sanitizePayload(formData);

    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send data to your API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedPayload),
      });

      const data: ApiResponse = await response.json();

      if (response.ok) {
        // Success - show success message
        toast.success("Message sent successfully!", {
          description: "We'll get back to you soon.",
        });

        // Reset form to empty state
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          service: '',
          message: '',
        });
      } else {
        // Handle API errors
        console.error('API Error:', data.error);
        toast.error("Error", {
          description: data.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      // Handle network errors
      console.error('Network error:', error);
      toast.error("Network Error", {
        description: "Please check your connection and try again.",
      });
    } finally {
      // Always set submitting back to false
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-background text-foreground ">
      {/* Header */}
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
                Let&apos;s Start Your
                <span className="block text-3xl lg:text-5xl bg-clip-text drop-shadow-sm">
                  Global Journey
                </span>
              </h1>
              <p className="inline-block text-xl border-b-2 border-white pb-1 uppercase text-white font-bold tracking-wide [text-shadow:1px_1px_2px_black]">
                Get In Touch
              </p>
            </div>

          </div>
        </div>
      </section>
      {/* Contact Form & Info */}
      <section id="contact-form" ref={formRef} className="py-16 animate-fade-in-up">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            {/* Contact Information */}
            <div className="h-full">
              <div className="flex flex-col justify-between h-full space-y-8">
                {/* Top Part: Contact Info */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Contact Information</h2>

                  <div className="space-y-6">
                    {[
                      {
                        icon: MapPin,
                        title: 'Office Location',
                        details: ['Tashkent, Uzbekistan'],
                      },
                      {
                        icon: Phone,
                        title: 'Phone Number',
                        details: ['+998 95 086 80 00 (UZ)'],
                      },
                      {
                        icon: Mail,
                        title: 'Email Addresses',
                        details: ['dev@zaytra.ai', 'tawneyk@zaytra.ai'],
                      },
                      {
                        icon: Clock,
                        title: 'Business Hours',
                        details: [
                          'Mon-Fri: 9:00 AM - 6:00 PM (GMT+5)',
                          'Sat: 10:00 AM - 2:00 PM (GMT+5)',
                        ],
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-semibold">{item.title}</h3>
                          {item.details.map((detail, idx) => (
                            <p key={idx} className="text-sm text-muted-foreground">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Part: Quick Actions */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Quick Actions</h3>
                  <div className="space-y-2 flex flex-col ">
                    <Link
                      href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1rg4TOS2A6ZBwxCNsTekCavRGrw5Zckt4yujmekISbEpd8hf9ER--clf0BNO54B4-vrt6n1wkf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button variant="default" className="rounded-full ring-2 w-full justify-start cursor-pointer">
                        <Globe className="w-4 h-4 mr-2" />
                        Schedule Video Call
                      </Button>
                    </Link>
                    <a href="/docs/Zaytra.ai_About_us.pdf" download="Zaytra.ai_About_us.pdf">
                      <Button variant="outline" className="rounded-full ring-2 w-full justify-start cursor-pointer">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Download Company Brochure
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>


            {/* Contact Form */}
            <div className="lg:col-span-2 h-full ">
              <Card className="ring-2 shadow-xl bg-card text-card-foreground">
                <CardHeader>
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                  <p className="text-muted-foreground">
                    Fill out the form below and we&apos;ll get back to you within 24
                    hours.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Full Name *
                        </label>
                        <Input
                          className='rounded-2xl'
                          required
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) =>
                            handleChange('name', e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Email Address *
                        </label>
                        <Input
                          className='rounded-2xl'
                          required
                          type="email"
                          placeholder="your.email@company.com"
                          value={formData.email}
                          onChange={(e) =>
                            handleChange('email', e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Company Name
                        </label>
                        <Input
                          className='rounded-2xl'
                          type="text"
                          placeholder="Your company name"
                          value={formData.company}
                          onChange={(e) =>
                            handleChange('company', e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium ">
                          Phone Number *
                        </label>
                        <Input
                          className='rounded-2xl'
                          required
                          type="tel"
                          placeholder="+998 91 123 45 67"
                          value={formData.phone}
                          onChange={(e) =>
                            handleChange('phone', e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium ">
                        Service Interest
                      </label>
                      <Select
                        value={formData.service}
                        onValueChange={(value) =>
                          handleChange('service', value)
                        }
                      >
                        <SelectTrigger className="rounded-2xl">
                          <SelectValue placeholder="Select a service you're interested in" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover text-popover-foreground border-border">
                          <SelectItem value="vendor">
                            Become a Vendor
                          </SelectItem>
                          <SelectItem value="marketing">
                            Marketing Services
                          </SelectItem>
                          <SelectItem value="partnership">
                            Partnership Opportunity
                          </SelectItem>
                          <SelectItem value="custom-request">
                            Custom Request
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium ">Message *</label>
                      <Textarea
                        required
                        rows={5}
                        placeholder="Tell us about your business, target markets, and how we can help you..."
                        value={formData.message}
                        onChange={(e) =>
                          handleChange('message', e.target.value)
                        }
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        type="submit"
                        className="rounded-full cursor-pointer hover:opacity-90 flex-1"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2 " />
                            Send Message
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ */}
      <Faq />
      {/*  <section className="py-16 bg-muted animate-fade-in-up">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Common questions about our services and how we can help your
              business expand into MEA markets.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                question: 'How long does it take to enter a new MEA market?',
                answer:
                  'Typically 3-6 months depending on the complexity of your product and target market. We provide a detailed timeline during our initial consultation.',
              },
              {
                question: 'Do you provide local language support?',
                answer:
                  'Yes, we offer content localization in Arabic, French, and other regional languages as part of our comprehensive packages.',
              },
              {
                question: 'What makes UzBridge different from other agencies?',
                answer:
                  'We specialize exclusively in Uzbek tech companies and MEA markets, providing deep cultural understanding and proven local partnerships.',
              },
              {
                question: 'Can you help with regulatory compliance?',
                answer:
                  'Absolutely. Our team includes local experts who guide you through regulatory requirements and compliance procedures in each target market.',
              },
              {
                question: "What's included in the marketplace listing?",
                answer:
                  'Professional company profile, product showcase, lead generation tools, analytics dashboard, and direct buyer connections.',
              },
              {
                question: 'Do you offer flexible payment terms?',
                answer:
                  'Yes, we offer various payment options including monthly subscriptions, quarterly packages, and custom enterprise agreements.',
              },
            ].map((faq, index) => (
              <Card key={index} className="hover-lift cursor-default transition-transform duration-200 ">
                <CardContent className="p-6 space-y-3">
                  <h3 className="font-bold text-lg">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      <Footer />
    </div>
  );
};

export default Contact;
