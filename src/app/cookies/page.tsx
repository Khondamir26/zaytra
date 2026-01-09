"use client";

import React from "react";
import Footer from "@/components/Footer"; // Adjust path if needed

const Cookies = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main className="flex-grow px-6 py-16 max-w-6xl mx-auto text-base lg:text-lg leading-relaxed">
        <h1 className="text-4xl font-bold mb-8">Cookies Policy</h1>

        <p className="mb-6">
          This Cookies Policy explains how UzBridge ("we", "us", or "our") uses cookies and similar technologies
          to recognize you when you visit our website. It explains what these technologies are, why we use them,
          and your rights to control our use of them.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">1. What Are Cookies?</h2>
        <p className="mb-6">
          Cookies are small text files that are placed on your device to store data that can be recalled by a
          web server. They are widely used to “remember” you and your preferences.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">2. Why We Use Cookies</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>To ensure website functionality and security</li>
          <li>To remember your preferences (e.g. language, theme)</li>
          <li>To collect analytics about usage to improve performance</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">3. Types of Cookies We Use</h2>
        <p className="mb-6">
          We use both session and persistent cookies:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Essential Cookies:</strong> Required for core website features.</li>
          <li><strong>Analytics Cookies:</strong> Help us understand how users interact with the site.</li>
          <li><strong>Preference Cookies:</strong> Save your settings such as language or theme.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">4. Managing Cookies</h2>
        <p className="mb-6">
          You can set your browser to refuse some or all cookies or to alert you when cookies are being sent. 
          However, some parts of the website may not function properly without them.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">5. Changes to This Policy</h2>
        <p className="mb-6">
          We may update this Cookies Policy from time to time to reflect changes to the cookies we use or for
          other operational, legal, or regulatory reasons. Last updated: July 9, 2025.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">6. Contact Us</h2>
        <p>
          If you have any questions about our use of cookies, you can contact us at{" "}
          <a href="mailto:info@uz-bridge.com" className="text-blue-600 underline">info@uz-bridge.com</a>.
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default Cookies;
