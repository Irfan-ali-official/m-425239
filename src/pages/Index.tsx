
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import BookingForm from "@/components/BookingForm";
import ApartmentCard from "@/components/ApartmentCard";
import TestimonialsSection from "@/components/TestimonialsSection";
import { Button } from "@/components/ui/button";
import { Compass, Award, BadgeCheck, Building, Pool, Utensils, Wifi, Coffee, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Sample featured apartments data
const featuredApartments = [
  {
    id: "1",
    name: "Deluxe Sea View Suite",
    description: "Luxurious suite with panoramic sea views, modern amenities, and a private balcony.",
    price: 180,
    capacity: 2,
    size: 45,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
    location: "Beachfront",
    features: ["Wi-Fi", "Kitchen", "Bathroom", "Air Conditioning", "TV", "Balcony"]
  },
  {
    id: "3",
    name: "Executive Beach Studio",
    description: "Elegant studio with direct beach access, modern design, and premium finishes.",
    price: 150,
    capacity: 2,
    size: 35,
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&h=600&fit=crop",
    location: "Beachfront",
    features: ["Wi-Fi", "Kitchenette", "Bathroom", "Air Conditioning", "TV"]
  },
  {
    id: "4",
    name: "Luxury Penthouse Suite",
    description: "Exclusive top-floor suite with expansive terrace and panoramic sea views.",
    price: 350,
    capacity: 4,
    size: 90,
    image: "https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?w=800&h=600&fit=crop",
    location: "Beachfront",
    features: ["Wi-Fi", "Full Kitchen", "2 Bathrooms", "Air Conditioning", "TV", "Terrace", "Jacuzzi"]
  }
];

export default function Index() {
  const { t } = useLanguage();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Welcome Section */}
        <section id="welcome" className="section">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="relative animate-fade-in">
                <img 
                  src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop" 
                  alt="Luxury seaside accommodation" 
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-10 -right-10 hidden md:block">
                  <img 
                    src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400&h=300&fit=crop" 
                    alt="Interior view" 
                    className="rounded-lg shadow-xl border-4 border-white dark:border-background"
                  />
                </div>
              </div>
              
              <div className="space-y-6 animate-fade-in [animation-delay:300ms]">
                <div>
                  <span className="text-primary font-medium">
                    {t.home.welcome.subtitle}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mt-2">
                    {t.home.welcome.title}
                  </h2>
                </div>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    {t.home.welcome.description1}
                  </p>
                  <p>
                    {t.home.welcome.description2}
                  </p>
                </div>
                
                <div className="pt-2">
                  <Button asChild variant="outline" className="rounded-full">
                    <Link to="/amenities">
                      {t.home.welcome.learnMore}
                      <Compass className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Booking Section */}
        <section className="section bg-muted">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6 animate-fade-in">
                <div>
                  <span className="text-primary font-medium">
                    {t.home.booking.subtitle}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mt-2">
                    {t.home.booking.title}
                  </h2>
                </div>
                
                <p className="text-muted-foreground">
                  {t.home.booking.description}
                </p>
                
                <ul className="space-y-3">
                  {t.home.booking.benefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <BadgeCheck className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <BookingForm />
            </div>
          </div>
        </section>
        
        {/* Featured Apartments */}
        <section className="section">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
              <span className="text-primary font-medium">
                {t.home.featuredApartments.subtitle}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                {t.home.featuredApartments.title}
              </h2>
              <p className="text-muted-foreground">
                {t.home.featuredApartments.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredApartments.map((apartment, index) => (
                <div 
                  key={apartment.id} 
                  className="animate-fade-in"
                  style={{ animationDelay: `${(index + 1) * 200}ms` }}
                >
                  <ApartmentCard apartment={apartment} />
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12 animate-fade-in [animation-delay:800ms]">
              <Button asChild className="btn-primary">
                <Link to="/apartments">{t.home.featuredApartments.viewAll}</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Amenities Section */}
        <section className="section bg-card">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
              <span className="text-primary font-medium">
                {t.home.amenities.subtitle}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                {t.home.amenities.title}
              </h2>
              <p className="text-muted-foreground">
                {t.home.amenities.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="glass-card p-6 animate-fade-in [animation-delay:100ms]">
                <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary inline-flex">
                  <Building className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {t.home.amenities.features.beachfront.title}
                </h3>
                <p className="text-muted-foreground">
                  {t.home.amenities.features.beachfront.description}
                </p>
              </div>
              
              <div className="glass-card p-6 animate-fade-in [animation-delay:200ms]">
                <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary inline-flex">
                  <Pool className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {t.home.amenities.features.pools.title}
                </h3>
                <p className="text-muted-foreground">
                  {t.home.amenities.features.pools.description}
                </p>
              </div>
              
              <div className="glass-card p-6 animate-fade-in [animation-delay:300ms]">
                <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary inline-flex">
                  <Utensils className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {t.home.amenities.features.restaurant.title}
                </h3>
                <p className="text-muted-foreground">
                  {t.home.amenities.features.restaurant.description}
                </p>
              </div>
              
              <div className="glass-card p-6 animate-fade-in [animation-delay:400ms]">
                <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary inline-flex">
                  <Wifi className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {t.home.amenities.features.wifi.title}
                </h3>
                <p className="text-muted-foreground">
                  {t.home.amenities.features.wifi.description}
                </p>
              </div>
              
              <div className="glass-card p-6 animate-fade-in [animation-delay:500ms]">
                <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary inline-flex">
                  <Coffee className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {t.home.amenities.features.bar.title}
                </h3>
                <p className="text-muted-foreground">
                  {t.home.amenities.features.bar.description}
                </p>
              </div>
              
              <div className="glass-card p-6 animate-fade-in [animation-delay:600ms]">
                <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary inline-flex">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {t.home.amenities.features.location.title}
                </h3>
                <p className="text-muted-foreground">
                  {t.home.amenities.features.location.description}
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12 animate-fade-in [animation-delay:700ms]">
              <Button asChild className="btn-primary">
                <Link to="/amenities">{t.home.welcome.learnMore}</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <TestimonialsSection />
        
        {/* CTA Section */}
        <section className="py-24 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-white blur-3xl" />
          </div>
          
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                {t.home.cta.title}
              </h2>
              <p className="text-white/80 text-lg mb-8">
                {t.home.cta.description}
              </p>
              <Button asChild size="lg" variant="heroSolid" className="bg-white text-primary hover:bg-white/90 rounded-full px-8 text-lg">
                <Link to="/booking">{t.home.cta.bookNow}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
