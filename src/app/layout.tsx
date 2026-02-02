import type { Metadata } from "next";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { Toaster } from "@/components/ui/sonner"
import { satoshi } from "./fonts";

export const metadata: Metadata = {
  title: "HealPlant.AI",
  description: "Your Bridge to the World's Markets",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${satoshi.className} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <SidebarProvider defaultOpen={defaultOpen}>

            <AppSidebar />
            <main className="w-full">
              <Navbar />
              <div>{children}</div>
            </main>

          </SidebarProvider>

        </ThemeProvider>

        <Toaster position="top-center" richColors duration={5000} />

      </body>
    </html>
  );
}
