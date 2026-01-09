"use client";

import React from "react";
import Footer from "@/components/Footer"; // update path if needed

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main className="flex-grow px-6 py-16 max-w-6xl mx-auto text-base lg:text-lg leading-relaxed">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <p className="mb-6">
          This Privacy Policy explains how UzBridge (“we”, “our”, or “us”) collects, uses,
          and protects your personal information when you use our website and services.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">1. Information We Collect</h2>
        <p className="mb-6">
          We may collect personal information such as your name, email address, company details, and
          any messages submitted through our forms.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Respond to your inquiries and provide support</li>
          <li>Improve and personalize our platform</li>
          <li>Send updates or promotions (only with your consent)</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">3. Sharing of Information</h2>
        <p className="mb-6">
          We do not sell or rent your personal data. We only share it with trusted service providers
          (like hosting or analytics) under strict confidentiality.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">4. Data Security</h2>
        <p className="mb-6">
          We implement industry-standard security measures to protect your data from unauthorized access.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">5. Your Rights</h2>
        <p className="mb-6">
          You may request to access, update, or delete your personal data anytime by contacting us at{" "}
          <a href="mailto:info@uz-bridge.com" className="text-blue-600 underline">info@uz-bridge.com</a>.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">6. Cookies</h2>
        <p className="mb-6">
          Our website uses cookies to enhance user experience and collect anonymous analytics. You can
          disable cookies in your browser settings.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">7. Changes to This Policy</h2>
        <p className="mb-6">
          We may update this Privacy Policy from time to time. Last updated: July 9, 2025.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">8. Contact</h2>
        <p>
          If you have any questions, please contact us at{" "}
          <a href="mailto:info@uz-bridge.com" className="text-blue-600 underline">info@uz-bridge.com</a>.
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
