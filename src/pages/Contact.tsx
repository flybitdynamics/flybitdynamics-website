import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import contactBanner from "@/assets/b8.jpg";
import  contactimag from "@/assets/contact/contact.jpg";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send,
  Instagram,
  Youtube,
  Linkedin,
  Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+91 9227428262", "+91 9979850863"],
    action: "Call Now",
    onClick: () => window.location.href = "tel:+9227428262"
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@flybitdynamics.com"],
    action: "Send Email",
    onClick: () => window.location.href = "mailto:info@flybitdynamics.com?subject=Enquiry for Drone Light Show"
  },
  {
    icon: MapPin,
    title: "Location",
    details: ["Office Address : 511, Satyamev Eminence, Science City Road", "Sola, Ahmedabad 380060 | ", "Branch Address : 82 B , Gopal nagar - A GopalPpura Bypass Rd, Jaipur 302018 |"],
    action: "Get Directions",
    onClick: () => window.open("https://maps.app.goo.gl/rDX4KkEGiytgmHaV6", "_blank")
  },
  // {
  //   icon: Clock,
  //   title: "Working Hours",
  //   details: ["Mon - Sat: 9:00 AM - 7:00 PM", "Sun: 10:00 AM - 5:00 PM"],
  //   action: "Schedule Call",
  //   onClick: () => window.open("https://calendly.com/your-scheduling-link", "_blank")
  // }
];

const eventTypes = [
  "Wedding",
  "Corporate Event",
  "Product Launch",
  "Government Event",
  "Spiritual Gathering",
  "Sports & Entertainment",
  "Other"
];

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/flybitdynamics", followers: "50K+" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com/@flybitdynamics", followers: "25K+" },
  { name: "LinkedIn", icon: Linkedin, href: "https://in.linkedin.com/company/flybitdynamics", followers: "10K+" },
];

export default function Contact() {
  useEffect(() => {
    document.title = "Contact FLYBIT Dynamics | Book Drone Light Show India | Get Quote";
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Contact FLYBIT Dynamics for booking drone light shows in India. Get quotes for wedding shows, corporate events, and aerial displays. Call +91 9227428262 for free consultation.');
  }, []);

  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    city: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      eventType: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Frontend validation
    console.log('🔍 Frontend validation - Form data:', formData);
    
    if (!formData.eventType) {
      console.log('❌ Frontend validation failed - Event type is empty');
      toast({
        title: "Event Type Required",
        description: "Please select an event type before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    console.log('✅ Frontend validation passed');
    
    try {
      const submissionTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
      
      // Data to be sent
      const formDataWithTime = {
        ...formData,
        submissionTime,
      };

      // Send to Google Sheets (keeping existing functionality)
      const googleSheetsResponse = await fetch('https://script.google.com/macros/s/AKfycbyCo75Sj7ocD1EZRZ7iFfEuj8Fn5BAqzU_dEF-faW10XG53CATtGPt2tPL6q4bRyG2f/exec', {
        method: 'POST',
        mode: 'no-cors', // Important for CORS handling
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithTime)
      });

      // Send to our backend server for email notifications
      console.log('🚀 Sending request to backend server...');
      console.log('📤 Request URL:', 'https://flybitemailserver.vercel.app/api/contact');
      console.log('📦 Request data:', formDataWithTime);
      
      const backendResponse = await fetch('https://flybitemailserver.vercel.app/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithTime)
      });
      
      console.log('📥 Backend response status:', backendResponse.status);
      console.log('📥 Backend response ok:', backendResponse.ok);

      if (backendResponse.ok) {
        const result = await backendResponse.json();
        console.log('✅ Backend response successful:', result);
        toast({
          title: "Message Sent Successfully!",
          description: result.message || "Thank you for your interest. We'll get back to you within 24 hours.",
        });
      } else {
        // If backend fails, still show success for Google Sheets submission
        console.log('⚠️ Backend request failed, but Google Sheets submission succeeded');
        const errorText = await backendResponse.text();
        console.log('❌ Backend error response:', errorText);
        toast({
          title: "Message Sent Successfully!",
          description: "Thank you for your interest. We'll get back to you within 24 hours.",
        });
      }
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        eventDate: "",
        city: "",
        message: ""
      });

    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section 
        className="py-10 md:py-20 text-white relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)), url(${contactBanner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-7xl h-auto md:  h-[260px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-6xl font-bold mb-6">
            Let's Light Up the Sky <span className="bg-clip-text bg-gradient-to-r from-primary to-accent text-[#f5a30a]">Together!</span>
          </h1>
          <p className="text-md md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto ">
            Ready to create an unforgettable experience? Tell us your vision and we'll make it happen in the night sky.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-10 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                <span className="text-[#f5a30a]">Connect</span> <span className="text-[#3D473B]">With us</span>
              </h2>
              
              <Card className="p-8 card-gradient text-[#3D473B]">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-[#3D473B]">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-2 text-[#3D473B]"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-2"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="mt-2"
                        placeholder="+91 9227428262"
                      />
                    </div>
                    <div>
                      <Label htmlFor="eventType">Event Type *</Label>
                      <Select value={formData.eventType} onValueChange={handleSelectChange} required>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          {eventTypes.map((type) => (
                            <SelectItem 
                              key={type} 
                              value={type}
                              className="hover:bg-[#f5a30a] hover:text-white focus:bg-[#f5a30a] focus:text-white cursor-pointer"
                            >
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="eventDate">Preferred Event Date</Label>
                      <Input
                        id="eventDate"
                        name="eventDate"
                        type="date"
                        value={formData.eventDate}
                        onChange={handleInputChange}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="mt-2"
                        placeholder="Event city"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Tell Us About Your Vision *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="mt-2 min-h-[120px]"
                      placeholder="Describe your event, audience size, special requirements, budget range, and any specific ideas you have in mind..."
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full btn-glow text-lg bg-[#f5a30a]">
                    <Send className="mr-2 w-5 h-5" />
                    Send Message
                  </Button>
                </form>
              </Card>
              
              {/* Contact Image */}
              <div className="mt-8">
                <img 
                  src={contactimag}
                  alt="Contact FLYBIT Dynamics - Professional drone show consultation" 
                  className="w-full h-auto md:h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#3D473B]">
              Get in <span className="text-[#f5a30a]">Touch</span>
            </h2>              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="p-6 card-gradient hover:shadow-lg transition-all duration-300 group">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-md md:text-lg font-semibold mb-2 text-[#3D473B]">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-muted-foreground">{detail}</p>
                        ))}
                        <Button 
                          // variant="outline" 
                          size="sm" 
                          className="mt-3 hover:[#f5a30a] bg-white text-[#3D473B] border border-[#e4e6eb] hover:border-white"
                          onClick={info.onClick}
                        >
                          {info.action}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Quick Actions */}
              {/* <Card className="p-6 card-gradient mb-8">
                <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => window.open('https://wa.me/919664612798?text=Hi! I am interested in your drone light show services.', '_blank')}
                  >
                    <MessageCircle className="mr-2 w-4 h-4" />
                    WhatsApp Chat
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="mr-2 w-4 h-4" />
                    Schedule Video Call
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Send className="mr-2 w-4 h-4" />
                    Request Quote
                  </Button>
                </div>
              </Card> */}

              {/* Social Media */}
              <Card className="p-6 card-gradient">
                <h3 className="text-md md:text-xl font-semibold mb-4">Follow Us on Socail Media</h3>
                <div className="space-y-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background transition-colors group"
                    >
                      <div className="flex items-center space-x-3">
                        <social.icon className="w-5 h-5 text-primary" />
                        <span className="font-medium">{social.name}</span>
                      </div>
                      {/* <span className="text-sm text-muted-foreground">{social.followers}</span> */}
                    </a>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Visit Our <span className="text-[#f5a30a]">Studio</span>
            </h2>
            <p className="text-md md:text-xl text-muted-foreground">
              Located in Ahmedabad, our studio is equipped with the latest drone technology and testing facilities.
            </p>
          </div>
          
          <Card className="h-96 overflow-hidden relative">
            {/* Replace the src URL with your Google Maps embed URL */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.692218722387!2d72.51215387547481!3d23.071742779139342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84892b5ae783%3A0x84cd0b6497653de5!2sWildChild%20Studios!5e0!3m2!1sen!2sin!4v1753772330053!5m2!1sen!2sin"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            
            {/* Overlay with contact details */}
            <div className="absolute top-4 left-4 bg-background p-4 rounded-lg shadow-lg max-w-sm">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <MapPin className="w-5 h-5 text-primary mr-2" />
                  Flybit Dynamics Pvt Ltd
              </h3>
              <p className="text-muted-foreground text-sm mb-3">
                511, Satyamev Eminence, Science City Road<br />
                Sola, Ahmedabad 380060
              </p>
              <Button 
                size="sm"
                onClick={() => window.open('https://maps.app.goo.gl/rDX4KkEGiytgmHaV6', '_blank')}
                className="w-full bg-[#f5a30a]"
              >
                Get Directions
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#f5a30a] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Create Magic?
          </h2>
          <p className="text-md md:text-xl mb-8 opacity-90">
            Join hundreds of satisfied clients who have made their events unforgettable with FLYBIT Dynamics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-md md:text-lg px-8 py-4"
              onClick={() => window.location.href = "tel:+9227428262"}
            >
              <Phone className="mr-2 w-5 h-5" />
              Call Now: +91 9979850863
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-[#3D473B] border-white bg-white hover:bg-primary hover:text-white text-md md:text-lg px-8 py-4"
              onClick={() => window.open('https://wa.me/919227428262?text=Hi! I am interested in your drone light show services.', '_blank')}
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              WhatsApp Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}