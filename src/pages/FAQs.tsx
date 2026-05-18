import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import faqBanner from "@/assets/b4.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle, Phone, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const faqCategories = [
  {
    title: "General Questions",
    faqs: [
      {
        question: "How many drones do you use in a typical show?",
        answer: "The number of drones varies based on your event size and requirements. We can create stunning shows with as few as 50 drones for intimate events, or spectacular displays with 500+ drones for large-scale celebrations. During consultation, we'll recommend the optimal fleet size for your specific needs and budget."
      },
      {
        question: "What's the cost of a drone light show?",
        answer: "Pricing depends on several factors including the number of drones, show duration, complexity of choreography, location, and special requirements. We provide detailed quotes after understanding your specific needs during our free consultation."
      },
      {
        question: "How much advance notice do you need for booking?",
        answer: "We recommend booking at least 4-6 weeks in advance to ensure availability and allow adequate time for custom choreography design. For peak seasons (wedding season, festivals) or large-scale events, we suggest booking 2-3 months ahead. Rush bookings may be possible with additional coordination fees."
      },
      {
        question: "Do you provide shows across India?",
        answer: "Yes! We provide drone light shows across major cities in India including Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune, and many others. Our team travels to your location with all necessary equipment and handles local coordination, permits, and logistics."
      }
    ]
  },
  {
    title: "Technical & Safety",
    faqs: [
      {
        question: "How much space is needed for a drone show?",
        answer: "The minimum space requirement depends on the number of drones and show complexity. Generally, we need an open area of at least 100m x 100m for smaller shows (50-100 drones) and up to 300m x 300m for large displays (300+ drones). We also require a 30m safety buffer around the performance area and consideration for flight height restrictions."
      },
      {
        question: "Can drone shows be performed indoors?",
        answer: "Indoor shows are possible but require special considerations. The venue must have sufficient ceiling height (minimum 10-15 meters), adequate space, and proper ventilation. Indoor shows typically use fewer drones (10-50) and specialized indoor-rated equipment. We conduct thorough site surveys to determine feasibility."
      },
      {
        question: "What about safety and permissions?",
        answer: "Safety is our top priority. All our drones are equipped with multiple safety systems including collision avoidance, automatic return-to-home, and emergency landing protocols. We handle all necessary permissions including DGCA approvals, local police clearances, and NOCs. Our pilots are certified and we maintain comprehensive insurance coverage."
      },
      {
        question: "What happens if weather conditions are poor?",
        answer: "We continuously monitor weather conditions leading up to your event. Light rain and mild winds (under 15 mph) typically don't affect the show. However, heavy rain, strong winds, or thunderstorms require postponement for safety. We include one free reschedule date and work with you to find alternative solutions."
      }
    ]
  },
  {
    title: "Show Customization",
    faqs: [
      {
        question: "How customizable are the shows?",
        answer: "Every show is 100% customizable! We create bespoke choreography based on your vision, theme, and requirements. This includes custom logos, text, shapes, animations, color schemes, and musical synchronization. Our design team works closely with you through multiple iterations until the show perfectly matches your vision."
      },
      {
        question: "Can you incorporate our company logo or personal messages?",
        answer: "Absolutely! We specialize in creating custom animations featuring company logos, personal messages, names, dates, and even complex graphics. Our 3D animation suite allows us to recreate virtually any design in the sky. We provide preview animations before the show for your approval."
      },
      {
        question: "How long does a typical show last?",
        answer: "Show duration typically ranges from 5-15 minutes depending on your requirements and battery capacity. Most clients prefer 8-10 minute shows which provide excellent entertainment value while maintaining drone performance. For longer events, we can create multiple shorter segments or coordinate with other entertainment elements."
      },
      {
        question: "Can you synchronize the show with music?",
        answer: "Yes! Musical synchronization is one of our specialties. We can choreograph the entire show to match your chosen soundtrack, creating perfectly timed movements, color changes, and formations that enhance the emotional impact. We work with your preferred music or can recommend suitable tracks for your event theme."
      }
    ]
  },
  {
    title: "Booking & Logistics",
    faqs: [
      {
        question: "What's included in your service package?",
        answer: "Our comprehensive package includes: initial consultation and site survey, custom choreography design, all drone equipment and lighting, certified pilots and ground crew, insurance coverage, permit handling, setup and breakdown, backup equipment, and post-show support. We handle everything so you can focus on enjoying your event."
      },
      {
        question: "Do you provide backup plans?",
        answer: "Yes, we always have contingency plans. This includes backup drones, alternative show formats for different weather conditions, backup power systems, and redundant communication equipment. We also have partnerships with local suppliers in major cities for emergency equipment replacement if needed."
      },
      {
        question: "What information do you need to provide a quote?",
        answer: "To provide an accurate quote, we need: event date and time, location details, expected audience size, event type and theme, preferred show duration, number of drones (if you have a preference), budget range, and any specific requirements or custom elements. The more details you provide, the more precise our quote will be."
      },
      {
        question: "What are your payment terms?",
        answer: "We typically require a 50% advance payment upon contract signing to secure your date and begin show preparation, with the remaining 50% due before the event. For large events, we can arrange milestone-based payments. We accept bank transfers, cheques, and digital payments. All payments include applicable taxes."
      }
    ]
  }
];

export default function FAQs() {
  useEffect(() => {
    document.title = "Drone Light Show FAQs India | Common Questions - FLYBIT Dynamics";
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Frequently asked questions about drone light shows in India. Get answers about pricing, booking, safety, and technical specifications from FLYBIT Dynamics experts.');
  }, []);

  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section
        className="py-10 md:py-20 relative w-full overflow-hidden text-white aspect-[4/3] md:aspect-[16/9] lg:aspect-auto lg:min-h-[260px] flex items-center md:py-20"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)), url(${faqBanner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-6xl font-bold mb-6">
            Frequently Asked <span className="bg-clip-text bg-gradient-to-r from-primary to-accent text-[#f5a30a]">Questions</span>
          </h1>
          <p className="text-md md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
            Everything you need to know about FLYBIT Dynamics drone light shows. Can't find your answer? We're here to help!
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {faqCategories.map((category, index) => (
              <Button
                key={index}

                onClick={() => setSelectedCategory(index)}
                className="transition-all duration-300 bg-white text-black border border-[#e4e6eb] hover:text-white "
              >
                {category.title}
              </Button>
            ))}
          </div>

          {/* FAQ Content */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              {faqCategories[selectedCategory].title}
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              {faqCategories[selectedCategory].faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg">
                  <AccordionTrigger className="px-6 py-4 text-left font-semibold hover:no-underline hover:bg-muted/50 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Still Have <span className="text-[#f5a30a]">Questions?</span>
            </h2>
            <p className="text-md md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Our team is here to help you plan the perfect drone light show experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 card-gradient hover:shadow-xl transition-all duration-300 text-center group">
              <Phone className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-md md:text-xl font-semibold mb-4">Call Us</h3>
              <p className="text-muted-foreground mb-4">
                Speak directly with our experts for immediate assistance.
              </p>
              <Button
                variant="outline"
                className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                onClick={() => window.location.href = "tel:+919979850863"}
              >
                +91 9979850863
              </Button>
            </Card>

            <Card className="p-8 card-gradient hover:shadow-xl transition-all duration-300 text-center group">
              <MessageCircle className="w-16 h-16 text-accent mx-auto mb-4" />
              <h3 className="text-md md:text-xl font-semibold mb-4">WhatsApp Chat</h3>
              <p className="text-muted-foreground mb-4">
                Quick responses to your questions via WhatsApp.
              </p>
              <Button
                className="bg-white text-black border border-[#e4e6eb] hover:text-white"
                onClick={() => window.open('https://wa.me/919979850863?text=Hi! I have some questions about your drone light show services.', '_blank')}
              >
                Start Chat
              </Button>
            </Card>

            <Card className="p-8 card-gradient hover:shadow-xl transition-all duration-300 text-center group">
              <Mail className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-md md:text-xl font-semibold mb-4">Email Support</h3>
              <p className="text-muted-foreground mb-4">
                Detailed responses within 24 hours.
              </p>
              <Button
                variant="outline"
                className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                onClick={() => window.location.href = "mailto:info@flybitdynamics.com?subject=Question about Drone Light Show Services"}
              >
                Send Email
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Personalized Assistance?
          </h2>
          <p className="text-md md:text-xl text-muted-foreground mb-8">
            Schedule a free consultation with our team to discuss your specific requirements and get expert recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="btn-glow text-md md:text-lg px-8 py-4 bg-[#f5a30a]">
                Schedule Free Consultation <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" className="text-md md:text-lg px-8 py-4 bg-white text-black border border-[#e4e6eb] hover:text-white ">
              Download FAQ Guide
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}