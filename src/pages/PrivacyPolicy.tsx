import { useEffect } from "react";

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy - FLYBIT Dynamics | Best Indian Drone Show Company";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Privacy Policy of FLYBIT Dynamics - India's leading drone show company. Learn how we protect your data and privacy.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Header */}
      <div className="relative h-60 bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative text-center">
          <h1 className="text-4xl md:text-5xl font-space-grotesk font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-white/80">
            Your privacy is important to us
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-space-grotesk font-semibold mb-4">Introduction</h2>
            <p>
              FLYBIT Dynamics ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our drone show services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-space-grotesk font-semibold mb-4">Information We Collect</h2>
            <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Name and contact information</li>
              <li>Email address and phone number</li>
              <li>Event details and requirements</li>
              <li>Payment information</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-2">Non-Personal Information</h3>
            <ul className="list-disc pl-6">
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>IP address</li>
              <li>Website usage data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-space-grotesk font-semibold mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6">
              <li>To provide and maintain our services</li>
              <li>To process your requests and bookings</li>
              <li>To communicate with you about our services</li>
              <li>To improve our website and services</li>
              <li>To send marketing communications (with consent)</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-space-grotesk font-semibold mb-4">Information Sharing</h2>
            <p className="mb-4">We do not sell, trade, or rent your personal information. We may share information in these situations:</p>
            <ul className="list-disc pl-6">
              <li>With service providers who assist in our operations</li>
              <li>When required by law or legal process</li>
              <li>To protect our rights and property</li>
              <li>With your consent</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-space-grotesk font-semibold mb-4">Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-space-grotesk font-semibold mb-4">Your Rights</h2>
            <ul className="list-disc pl-6">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete your information</li>
              <li>Withdraw consent</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-space-grotesk font-semibold mb-4">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4">
              <p><strong>Email:</strong> info@flybitdynamics.com</p>
              <p><strong>Phone:</strong> +91 9979850863</p>
              <p><strong>Address:</strong> 51.1 Satyamev Eminence, Science City Road, Sola, Ahmedabad 380060</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}