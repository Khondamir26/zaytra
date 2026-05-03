import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ScrollObserver from "@/components/ScrollObserver";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import { Toaster } from "@/components/ui/sonner";
import { instrumentSans, spaceMono, inter } from "./fonts";

export const metadata: Metadata = {
  title: "Binova Labs — Custom Software & AI Development Company",
  description:
    "Binova Labs builds scalable web applications, SaaS platforms, and AI-powered solutions to help businesses launch faster and grow smarter.",
  icons: {
    icon: [
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/images/apple-touch-icon.png",
    shortcut: "/images/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${instrumentSans.variable} ${spaceMono.variable} ${inter.variable} font-sans antialiased`}>
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ScrollObserver />
            <Navbar />
            <main className="pt-[72px]">{children}</main>
          </ThemeProvider>
        </LanguageProvider>

        <Toaster position="top-center" richColors duration={5000} />
      </body>
    </html>
  );
}
