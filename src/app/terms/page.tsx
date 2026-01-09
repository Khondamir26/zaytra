"use client";

import React from "react";
import Footer from "@/components/Footer"; // Adjust the path as needed

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main className="flex-grow px-6 py-16 max-w-6xl mx-auto text-base lg:text-lg leading-relaxed">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

        <p className="mb-6">
          These Terms of Service ("Terms") govern your access to and use of the UzBridge website and services
          ("we", "our", or "us"). By accessing or using our platform, you agree to these Terms.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">1. Acceptance of Terms</h2>
        <p className="mb-6">
          By using our services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree,
          you may not use the site.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">2. Use of the Platform</h2>
        <p className="mb-6">
          You agree to use the platform only for lawful purposes. You must not misuse the service or engage in
          any activity that harms UzBridge or its users.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">3. User Accounts</h2>
        <p className="mb-6">
          Some features may require an account. You are responsible for maintaining the confidentiality of your
          login credentials and any activities under your account.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">4. Intellectual Property</h2>
        <p className="mb-6">
          All content, logos, and trademarks on UzBridge are the property of their respective owners. You may
          not reproduce or distribute any content without permission.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">5. Termination</h2>
        <p className="mb-6">
          We reserve the right to suspend or terminate your access to the platform if you violate these Terms or
          misuse our services.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">6. Disclaimer</h2>
        <p className="mb-6">
          Our platform is provided "as is" without warranties of any kind. We are not liable for any damages
          resulting from your use of the site.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">7. Modifications</h2>
        <p className="mb-6">
          We may update these Terms from time to time. Continued use of the platform constitutes your acceptance
          of the revised terms. Last updated: July 9, 2025.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">8. Contact</h2>
        <p>
          For any questions about these Terms, please contact us at{" "}
          <a href="mailto:info@uz-bridge.com" className="text-blue-600 underline">
            info@uz-bridge.com
          </a>.
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
