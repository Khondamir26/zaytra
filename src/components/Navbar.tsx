"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Moon, Sun, ChevronDown, Check, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Logo from "@/components/Logo";
import { useLanguage } from "@/context/LanguageContext";
import type { Language } from "@/lib/i18n";

const languages: { code: Language; label: string; icon: string }[] = [
  { code: "EN", label: "English",    icon: "/flags/us.png" },
  { code: "UZ", label: "O'zbekcha", icon: "/flags/uz.png" },
  { code: "RU", label: "Русский",   icon: "/flags/ru.png" },
];

const navHrefs = [
  "/#services",
  "/#how-it-works",
  "/#work",
  "/#team",
  "/#contact",
];

const Navbar = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = React.useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

  const currentLang = languages.find((l) => l.code === language) ?? languages[0];
  const isActive = (path: string) =>
    activeLink === path || (!path.startsWith("/#") && pathname === path);

  const navLinks = [
    { label: t.nav.services, href: navHrefs[0] },
    { label: t.nav.process,  href: navHrefs[1] },
    { label: t.nav.work,     href: navHrefs[2] },
    { label: t.nav.team,     href: navHrefs[3] },
    { label: t.nav.contact,  href: navHrefs[4] },
  ];

  return (
    <nav
      className={`fixed top-0 z-50 w-full bg-[#0B1F3A] transition-shadow duration-300 ${
        isScrolled ? "shadow-lg shadow-black/20" : ""
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-4">

        <Logo />

        {/* Desktop nav links */}
        <div className="hidden lg:flex flex-1 justify-center items-center gap-1">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setActiveLink(item.href)}
              className={`font-mono px-3 xl:px-4 py-2 text-sm tracking-wide font-normal transition-colors duration-200 underline-offset-4 decoration-[#00C3C1] ${
                isActive(item.href)
                  ? "text-white underline"
                  : "text-white/70 hover:text-white hover:underline"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Language selector (desktop) */}
          <div className="hidden lg:block">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-full gap-1 cursor-pointer text-white/70 hover:text-white hover:bg-white/10">
                  <Image src={currentLang.icon} alt={currentLang.code} width={20} height={15} />
                  <span className="font-mono text-sm tracking-wide">{currentLang.code}</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Image src={lang.icon} alt={lang.label} width={20} height={15} />
                      <span>{lang.label}</span>
                    </div>
                    {language === lang.code && <Check className="w-4 h-4 text-[#00C3C1]" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* CTA button (desktop) */}
          <div className="hidden lg:block">
            <Link href="/#contact">
              <Button size="sm" className="font-mono rounded-full px-4 cursor-pointer bg-[#00C3C1] hover:bg-[#00a8a6] text-[#0B1F3A] font-semibold border-0 tracking-wide">
                {t.nav.cta}
              </Button>
            </Link>
          </div>

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full cursor-pointer text-white/70 hover:text-white hover:bg-white/10"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 dark:hidden" />
            <Moon className="h-4 w-4 hidden dark:block" />
          </Button>

          {/* Mobile hamburger */}
          <div className="lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="cursor-pointer text-white/70 hover:text-white hover:bg-white/10">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm h-full overflow-y-auto p-6 bg-[#0B1F3A] text-white border-l border-white/10">
                <div className="flex flex-col mt-8 space-y-6">

                  <div className="flex justify-between items-center pt-2">
                    <Link href="/#contact" onClick={() => setOpen(false)}>
                      <Button size="sm" className="rounded-full px-4 cursor-pointer bg-[#00C3C1] hover:bg-[#00a8a6] text-[#0B1F3A] font-semibold border-0">
                        {t.nav.cta}
                      </Button>
                    </Link>
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="rounded-full gap-1 cursor-pointer text-white/70">
                          <Image src={currentLang.icon} alt={currentLang.code} width={20} height={15} />
                          <span className="font-mono text-sm">{currentLang.code}</span>
                          <ChevronDown className="w-3 h-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        {languages.map((lang) => (
                          <DropdownMenuItem
                            key={lang.code}
                            onClick={() => setLanguage(lang.code)}
                            className="flex items-center justify-between cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <Image src={lang.icon} alt={lang.label} width={20} height={15} />
                              <span>{lang.label}</span>
                            </div>
                            {language === lang.code && <Check className="w-4 h-4 text-[#00C3C1]" />}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="border-t border-white/10" />

                  <div className="grid grid-cols-2 gap-3">
                    {navLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => { setActiveLink(item.href); setOpen(false); }}
                        className={`flex items-center justify-center rounded-xl px-4 py-3.5 text-sm font-medium transition-colors ${
                          isActive(item.href)
                            ? "bg-white/10 text-white"
                            : "text-white/60 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>

                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00C3C1] via-[#197bc8] to-[#00C3C1]" />
    </nav>
  );
};

export default Navbar;
