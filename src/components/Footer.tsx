"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Facebook,
  FacebookIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";



const Footer = () => {
  // добавлено: стейт и отправка формы
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setEmail("");
      } else {
        toast.error(data.message || "Subscription failed");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  //
  return (
    <footer className="bg-accent ">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6 text-muted dark:text-white">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/icons/healplant.png" // путь к логотипу
                alt="HealPlant.AI Logo"
                width={65}
                height={65}
                className=" w-10 h-10 object-contain"
              />
              <span className="text-lg text-muted font-semibold dark:text-white [text-shadow:1px_1px_2px_black]">Plant.ai</span>
            </Link>
            <p className="leading-relaxed text-muted dark:text-white">
              Plant.AI helps people identify plants, detect diseases, and improve plant care using AI-powered diagnostics and smart guidance.

            </p>
            <div className="flex space-x-4 ">
              <Link
                href="https://www.linkedin.com/company/khondamir-tuychiev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full p-2 hover:ring-1 ring-accent/ hover:text-black dark:hover:text-white transition-all duration-200 hover:[text-shadow:0_0_0.5px_currentColor] cursor-pointer"
                  aria-label="Linkedin"
                >
                  <Linkedin className="w-5 h-5" />
                </Button>
              </Link>
              <Link
                href="https://www.instagram.com/zaytra.ai/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full p-2 hover:ring-1 ring-accent/ hover:text-black dark:hover:text-white transition-all duration-200 hover:[text-shadow:0_0_0.5px_currentColor] cursor-pointer"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </Button>
              </Link>
              <Link
                href="https://x.com/zaytra_ai"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full p-2 hover:ring-1 ring-accent/ hover:text-black dark:hover:text-white transition-all duration-200 hover:[text-shadow:0_0_0.5px_currentColor] cursor-pointer"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </Button>
              </Link>
              <Link
                href="https://www.facebook.com/people/Zaytraai/61578619650540/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full p-2 hover:ring-1 ring-accent/ hover:text-black dark:hover:text-white transition-all duration-200 hover:[text-shadow:0_0_0.5px_currentColor] cursor-pointer"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6 text-muted dark:text-white">
            <h3 className="text-lg font-semibold [text-shadow:1px_1px_2px_black]">Product</h3>
            <div className="space-y-2">
              {[
                { label: "Plant Scanner", href: "/marketplace" },
                { label: "Features", href: "/services" },
                { label: "How It Works", href: "/vendor-application" },
                { label: "About HealPlant.AI", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block dark:text-white text-muted hover:text-black dark:hover:text-white transition-all duration-200 hover:[text-shadow:0_0_0.5px_currentColor]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-6 text-muted dark:text-white">
            <h3 className="text-lg font-semibold [text-shadow:1px_1px_2px_black]">Support</h3>
            <div className="space-y-4 text-muted dark:text-white">
              <div className="space-y-2 items-center">
                <div className="mail-zaytra flex items-center space-x-3">
                  <Link href="mailto:support@healplant.ai
">
                    <Mail className="w-5 h-5 " />
                  </Link>
                  <Link href="mailto:support@healplant.ai"><span>support@healplant.ai</span>
                  </Link>
                </div>
                <div className="mail-khonda flex items-center space-x-3">
                  <Link href="mailto:support@healplant.ai">
                    <Mail className="w-5 h-5 " />
                  </Link>
                  <Link href="mailto:khondamirtuychiev@gmail.com"><span>khondamirtuychiev@gmail.com</span>

                  </Link>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Link href="tel:+998950868000">
                  <Phone className="w-5 h-5 " />
                </Link>
                <Link href="tel:+998950868000"><span>+998 95 086 80 00</span>
                </Link>

              </div>
              <div className="flex items-start space-x-3">
                <Link href="https://maps.app.goo.gl/sYWq4tavJdwGZzMm7" target="_blank">
                  <MapPin className="w-5 h-5 mt-1" />
                </Link>
                <Link href="https://maps.app.goo.gl/sYWq4tavJdwGZzMm7" target="_blank">
                  <span>
                    Tashkent, Uzbekistan
                  </span>
                </Link>

              </div>
            </div>


          </div>
          {/* Newsletter */}
          <div className="space-y-6 text-muted dark:text-white">
            <h4 className="text-lg font-semibold [text-shadow:1px_1px_2px_black]">Newsletter</h4>
            <p className="text-sm text-muted dark:text-white">
              Get plant care tips and<br />Plant.AI feature updates
            </p>
            <form className="flex space-x-2" onSubmit={handleSubscribe}>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="text-muted dark:border-white rounded-full dark:bg-transparent dark:placeholder:text-muted"
                required
              />
              <Button
                variant="default"
                type="submit"
                className="[text-shadow:1px_1px_2px_black] hover:bg-muted/20 border dark:border-white cursor-pointer rounded-full"
                disabled={loading}
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-muted dark:border-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-muted text-sm dark:text-white [text-shadow:1px_1px_2px_black]">
              © 2026 Plant.ai. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0 [text-shadow:1px_1px_2px_black]">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Cookie Policy", href: "/cookies" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:underline block text-sm dark:text-white text-muted hover:text-black dark:hover:text-white transition-all duration-200 hover:[text-shadow:0_0_0.5px_currentColor]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
