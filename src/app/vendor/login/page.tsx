"use client";

import { VendorLoginForm } from "@/components/vendor-login-form";
import Link from "next/link";
import Image from "next/image";

export default function VendorLoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-bold text-2xl text-primary">
          <div className="flex items-center justify-center">
            <Image
              src="/icons/zaytra_ai.png" // путь к логотипу
              alt="Zaytra.AI Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          Zaytra.ai
        </Link>
        <VendorLoginForm />
      </div>
    </div>
  );
}