"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Send, CalendarClock, FileText, ArrowRight } from "lucide-react";
import type { ElementType } from "react";
import { Button }   from "@/components/ui/button";
import { Input }    from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast }    from "sonner";
import { sanitizePayload } from "@/lib/sanitizePayload";
import { useLanguage } from "@/context/LanguageContext";

const contactIcons: { icon: ElementType; href: string }[] = [
  { icon: MapPin,        href: "https://maps.app.goo.gl/sYWq4tavJdwGZzMm7" },
  { icon: Phone,         href: "tel:+998950868000" },
  { icon: Mail,          href: "mailto:support@binovalabs.com" },
  { icon: CalendarClock, href: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1rg4TOS2A6ZBwxCNsTekCavRGrw5Zckt4yujmekISbEpd8hf9ER--clf0BNO54B4-vrt6n1wkf" },
];

const contactDetails = [
  "Tashkent, Uzbekistan",
  "+998 95 086 80 00",
  "support@binovalabs.com",
  "",
];

interface FormData {
  name: string; email: string; company: string;
  phone: string; service: string; message: string;
}

const ContactSection = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", company: "", phone: "", service: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof FormData, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sanitizePayload(formData)),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Message received!", { description: "Our team will get back to you within 1 business day." });
        setFormData({ name: "", email: "", company: "", phone: "", service: "", message: "" });
      } else {
        toast.error("Error", { description: data.message || "Something went wrong." });
      }
    } catch {
      toast.error("Network Error", { description: "Please check your connection and try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfoLabels = [
    t.contact.locationLabel,
    t.contact.phoneLabel,
    t.contact.emailLabel,
    t.contact.bookCallLabel,
  ];

  const contactInfoDetails = [
    contactDetails[0],
    contactDetails[1],
    contactDetails[2],
    t.contact.bookCallDetail,
  ];

  return (
    <section id="contact" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">

        <div className="reveal text-center mb-10 md:mb-16 space-y-3">
          <p className="font-mono text-xs font-semibold tracking-widest uppercase text-[#00C3C1]">{t.contact.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-black leading-tight">{t.contact.title}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">{t.contact.subtitle}</p>
        </div>

        <div className="reveal grid lg:grid-cols-5 gap-6 md:gap-8 items-start">

          {/* Left sidebar */}
          <div className="lg:col-span-2 space-y-3">
            {contactIcons.map(({ icon: Icon, href }, i) => (
              <Link
                key={href}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card hover:border-[#00C3C1]/40 hover:shadow-md transition-all duration-200 group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#00C3C1]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00C3C1]/20 transition-colors">
                  <Icon className="w-5 h-5 text-[#00C3C1]" />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] font-bold tracking-wide uppercase text-muted-foreground mb-0.5">{contactInfoLabels[i]}</p>
                  <p className="text-sm font-semibold text-foreground leading-snug">{contactInfoDetails[i]}</p>
                </div>
              </Link>
            ))}

            <div className="pt-2 space-y-3">
              <Link href={contactIcons[3].href} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-2xl w-full gap-2 cursor-pointer bg-[#00C3C1] text-[#0B1F3A] font-bold border-0 hover:bg-[#00a8a6] hover:scale-[1.02] transition-all duration-200">
                  <CalendarClock className="w-4 h-4" /> {t.contact.bookBtn}
                </Button>
              </Link>
              <Link href="/docs/Zaytra.ai_About_us.pdf" download>
                <Button variant="outline" className="rounded-2xl w-full gap-2 cursor-pointer mt-2 hover:scale-[1.02] transition-all duration-200">
                  <FileText className="w-4 h-4" /> {t.contact.deckBtn}
                </Button>
              </Link>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-border bg-card p-5 sm:p-7 md:p-8 shadow-xl">
              <div className="mb-5 md:mb-7">
                <h3 className="text-xl md:text-2xl font-black mb-1">{t.contact.formTitle}</h3>
                <p className="text-sm text-muted-foreground">{t.contact.formSubtitle}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[11px] font-bold tracking-widest uppercase text-muted-foreground">{t.contact.fieldName} *</label>
                    <Input className="rounded-xl h-11" required placeholder={t.contact.namePlaceholder} value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-mono text-[11px] font-bold tracking-widest uppercase text-muted-foreground">{t.contact.fieldEmail} *</label>
                    <Input className="rounded-xl h-11" required type="email" placeholder={t.contact.emailPlaceholder} value={formData.email} onChange={(e) => handleChange("email", e.target.value)} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[11px] font-bold tracking-widest uppercase text-muted-foreground">{t.contact.fieldPhone}</label>
                    <Input className="rounded-xl h-11" type="tel" placeholder={t.contact.phonePlaceholder} value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-mono text-[11px] font-bold tracking-widest uppercase text-muted-foreground">{t.contact.fieldService}</label>
                    <Select value={formData.service} onValueChange={(v) => handleChange("service", v)}>
                      <SelectTrigger className="rounded-xl h-11 w-full"><SelectValue placeholder={t.contact.fieldServicePlaceholder} /></SelectTrigger>
                      <SelectContent>
                        {t.contact.serviceOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] font-bold tracking-widest uppercase text-muted-foreground">{t.contact.fieldMessage} *</label>
                  <Textarea
                    required
                    rows={5}
                    placeholder={t.contact.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    className="rounded-xl resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="rounded-2xl w-full gap-2 cursor-pointer bg-[#00C3C1] text-[#0B1F3A] font-bold border-0 hover:bg-[#00a8a6] hover:scale-[1.02] transition-all duration-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <><div className="w-4 h-4 border-2 border-[#0B1F3A] border-t-transparent rounded-full animate-spin" /> {t.contact.sendingBtn}</>
                  ) : (
                    <><Send className="w-4 h-4" /> {t.contact.sendBtn} <ArrowRight className="w-4 h-4" /></>
                  )}
                </Button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
