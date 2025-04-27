
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Phone, Mail, Clock, Check, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to a server
    console.log("Form submitted:", formData);
    setFormSubmitted(true);
    
    toast({
      title: t.contact.messageSent,
      description: t.contact.thankYou,
      duration: 5000,
    });
    
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
    
    // Reset submission status after delay
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };
  
  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };
  
  // FAQ data from translations
  const faqItems = [
    {
      question: t.contact.questions.checkInOut.question,
      answer: t.contact.questions.checkInOut.answer
    },
    {
      question: t.contact.questions.parking.question,
      answer: t.contact.questions.parking.answer
    },
    {
      question: t.contact.questions.pets.question,
      answer: t.contact.questions.pets.answer
    },
    {
      question: t.contact.questions.breakfast.question,
      answer: t.contact.questions.breakfast.answer
    },
    {
      question: t.contact.questions.transfers.question,
      answer: t.contact.questions.transfers.answer
    },
    {
      question: t.contact.questions.amenities.question,
      answer: t.contact.questions.amenities.answer
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Header Section */}
        <section className="py-16 bg-gradient-to-r from-sea-light to-white dark:from-sea-dark dark:to-background">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {t.contact.title}
              </h1>
              <p className="text-muted-foreground text-lg">
                {t.contact.subtitle}
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact Information */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Contact Info Cards */}
              <div className="glass-card p-6 text-center animate-fade-in [animation-delay:100ms]">
                <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary mx-auto w-16 h-16 flex items-center justify-center">
                  <MapPin className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t.contact.address}</h3>
                <p className="text-muted-foreground">
                  123 Seaside Boulevard<br />
                  Costa Bella, 12345<br />
                  Italy
                </p>
              </div>
              
              <div className="glass-card p-6 text-center animate-fade-in [animation-delay:200ms]">
                <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary mx-auto w-16 h-16 flex items-center justify-center">
                  <Phone className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t.contact.phone}</h3>
                <p className="text-muted-foreground">
                  +39 123 4567 890<br />
                  +39 098 7654 321
                </p>
              </div>
              
              <div className="glass-card p-6 text-center animate-fade-in [animation-delay:300ms]">
                <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary mx-auto w-16 h-16 flex items-center justify-center">
                  <Clock className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t.contact.receptionHours}</h3>
                <p className="text-muted-foreground">
                  24/7<br />
                  {t.contact.checkInTime}<br />
                  {t.contact.checkOutTime}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Form and Map */}
        <section className="py-16 bg-card">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="animate-fade-in">
                <h2 className="text-2xl font-bold mb-6">
                  {t.contact.sendMessage}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t.contact.fullName}</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">{t.contact.email}</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t.contact.phoneNumber}</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">{t.contact.subject}</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">{t.contact.message}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder={t.contact.howCanWeHelp}
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="btn-primary"
                    disabled={formSubmitted}
                  >
                    {formSubmitted ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        {t.contact.messageSent}
                      </>
                    ) : (
                      t.contact.send
                    )}
                  </Button>
                </form>
              </div>
              
              {/* Map */}
              <div className="animate-fade-in [animation-delay:300ms]">
                <h2 className="text-2xl font-bold mb-6">
                  {t.contact.findUs}
                </h2>
                
                <div className="aspect-square md:aspect-[4/3] w-full h-full rounded-lg overflow-hidden">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12090.477929592104!2d12.436689!3d41.902783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDU0JzEwLjAiTiAxMsKwMjYnMTIuMSJF!5e0!3m2!1sen!2sit!4v1586958503448!5m2!1sen!2sit" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy"
                    title="Map"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {t.contact.faq}
              </h2>
              <p className="text-muted-foreground">
                {t.contact.faqSubtitle}
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              {faqItems.map((item, index) => (
                <div 
                  key={index}
                  className="border-b last:border-b-0 py-4 animate-fade-in"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <button
                    className="flex justify-between items-center w-full text-left font-medium py-2"
                    onClick={() => toggleQuestion(index)}
                    aria-expanded={openQuestion === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span>{item.question}</span>
                    {openQuestion === index ? (
                      <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </button>
                  
                  {openQuestion === index && (
                    <div 
                      id={`faq-answer-${index}`}
                      className="pt-2 pb-4 text-muted-foreground"
                    >
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
