"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const pathname = usePathname();

  useEffect(() => {
    console.error("404 Error: User attempted to access:", pathname);
  }, [pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4 text-red-600">404</h1>
        <p className="text-xl mb-4">Oops! Page not found.</p>
        <Link href="/" className="text-blue-600 hover:underline">
          <Button variant="destructive" type="button" className="cursor-pointer rounded-full hover:opacity-70">Return to Home</Button>
        </Link>
      </div>
    </div>
  );
}
