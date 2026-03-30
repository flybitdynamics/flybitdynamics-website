import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Youtube, Linkedin, MessageCircle } from "lucide-react";
import flybitLogo from "@/assets/flybit-logo.png";

const navigation = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Technology", href: "/technology" },
    { name: "Blog", href: "/blog" },
  ],
  services: [
    { name: "Social Events", href: "/services#social" },
    { name: "Corporate Events", href: "/services#corporate" },
    { name: "Government Events", href: "/services#government" },
    { name: "Product Launches", href: "/services#product" },
    { name: "Spiritual Gatherings", href: "/services#spiritual" },
    { name: "Sports & Entertainment", href: "/services#sports" },
  ],
  support: [
    { name: "FAQs", href: "/faqs" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/flybitdynamics" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com/@flybitdynamics" },
  { name: "LinkedIn", icon: Linkedin, href: "https://in.linkedin.com/company/flybitdynamics" },
  { name: "WhatsApp", icon: MessageCircle, href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-[#181C19] text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-6">
              <img src="/lovable-uploads/32653dea-0b30-472d-83b7-4682377a49ba.png" alt="FLYBIT Dynamics" className="h-10 w-auto" />
            </Link>
            <p className="text-secondary-foreground/80 mb-6 max-w-md">
              We are storytellers of the sky, creating magical drone light shows that transform your special moments into unforgettable experiences.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <span>+91 9227428262</span>
                <span>| </span>
                <span>+91 9979850863</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <span>info@flybitdynamics.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span>511, Satyamev Eminence, Science City Road, Sola, Ahmedabad 380060</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-space-grotesk font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-secondary-foreground/80 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-space-grotesk font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-secondary-foreground/80 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-space-grotesk font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-secondary-foreground/80 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-secondary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-secondary-foreground/60 hover:text-primary transition-colors"
                  aria-label={item.name}
                >
                  <item.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
            <p className="text-secondary-foreground/60 text-sm">
              © 2024 Flybit Dynamics. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}