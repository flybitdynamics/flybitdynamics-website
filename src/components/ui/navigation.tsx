import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavItem = {
  name: string;
  href: string;
  subMenu?: { name: string; href: string }[];
};

const navigation: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  // { name: "Projects", href: "/projects" },
  // { 
  //   name: "Our Projects", 
  //   href: "/our-projects",
  //   subMenu: [
  //     { name: "Social Events", href: "/our-projects?category=social-events" },
  //     { name: "Corporate Events", href: "/our-projects?category=corporate-events" },
  //     { name: "Government Events", href: "/our-projects?category=government-events" },
  //     { name: "Product Events", href: "/our-projects?category=product-events" },
  //     { name: "Social Gathering", href: "/our-projcts?category=social-gathering" },
  //     { name: "Sports & Entertainment", href: "/our-projects?category=sports-entertainment" },
  //   ]
  // },
  { name: "Technology", href: "/technology" },
  { name: "FAQs", href: "/faqs" },
  // { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/FLYBIT%20dynamics%20logo_01.png" alt="FLYBIT Dynamics" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div 
                key={item.name} 
                className="relative group"
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  to={item.href}
                  onClick={() => window.scrollTo(0, 0)}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive(item.href) 
                      ? "text-primary" 
                      : "text-[#3D473B] hover:text-primary"
                  )}
                >
                  {item.name}
                </Link>
                {/* Submenu */}
                {item.subMenu && hoveredItem === item.name && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-md border border-white/20 rounded-lg shadow-lg z-50"
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className="py-2">
                      {item.subMenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          onClick={() => {
                            setHoveredItem(null);
                            window.scrollTo(0, 0);
                          }}
                          className="block px-4 py-2 text-sm text-[#3D473B] hover:text-primary hover:bg-primary/5 transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Link to="/contact">
              <Button  className="bg-[#f5a30a]">
                <Phone className="w-4 h-4 mr-2" />
                Book a Show
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#3D473B]"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/100 backdrop-blur-md rounded-lg mt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => {
                    setIsOpen(false);
                    window.scrollTo(0, 0);
                  }}
                  className={cn(
                    "block px-3 py-2 text-base font-medium transition-colors",
                    isActive(item.href) 
                      ? "text-primary" 
                      : "text-white/90 hover:text-primary"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Link to="/contact">
                  <Button variant="default" className="btn-glow w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Book a Show
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}