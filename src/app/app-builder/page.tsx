"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Rocket } from "lucide-react";

const AppBuilderPage = () => {
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
    const animatedText = "Coming Soon...".split("");
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-4">
            <div className="space-y-6 text-center animate-fade-in-up max-w-lg w-full">
                <div className="flex items-center justify-center gap-3 flex-wrap">
                    <Rocket className="w-10 h-10 animate-bounce" />
                    {animatedText.map((char, i) => (
                        <span
                            key={i}
                            className={`text-2xl md:text-3xl font-semibold inline-block animate-zoom delay-[${i * 100}ms]`}
                        >
                            {char === " " ? "\u00A0" : char}
                        </span>
                    ))}
                </div>
                <p className="text-center text-muted-foreground">
                    We&apos;re working hard to launch our new platform. <br /> Stay tuned!
                </p>
                <form
                    className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 w-full max-w-md mx-auto"
                    onSubmit={handleSubscribe}
                >
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="rounded-full w-full text-center"
                        required
                    />
                    <Button
                        variant="secondary"
                        type="submit"
                        className="cursor-pointer rounded-full w-full sm:w-auto "
                        disabled={loading}
                    >
                        {loading ? "Notifying..." : "Notify Me"}
                    </Button>
                </form>
            </div>
        </main>

    );
}
export default AppBuilderPage;