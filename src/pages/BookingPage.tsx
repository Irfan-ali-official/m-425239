
import { useEffect, useState } from "react";
import { format, addDays, differenceInDays } from "date-fns";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CalendarIcon, Users, CreditCard, Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApartmentProps } from "@/components/ApartmentCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Sample apartments data
const apartmentsData: ApartmentProps[] = [
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
    id: "2",
    name: "Premium Family Apartment",
    description: "Spacious apartment ideal for families, with full kitchen and stunning coastal views.",
    price: 250,
    capacity: 4,
    size: 75,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    location: "Second row",
    features: ["Wi-Fi", "Kitchen", "Bathroom", "Air Conditioning", "TV", "Washing Machine"]
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
];

export default function BookingPage() {
  const { t } = useLanguage();
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(addDays(new Date(), 7));
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [selectedApartment, setSelectedApartment] = useState<ApartmentProps | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    paymentMethod: "credit-card",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    specialRequests: ""
  });
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  // Calculate nights and total price
  const nightsCount = startDate && endDate ? differenceInDays(endDate, startDate) : 0;
  const totalPrice = selectedApartment ? selectedApartment.price * nightsCount : 0;
  const cleaningFee = selectedApartment ? 50 : 0;
  const serviceFee = selectedApartment ? Math.round(totalPrice * 0.12) : 0;
  const finalTotal = totalPrice + cleaningFee + serviceFee;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleConfirmBooking = () => {
    // In a real app, this would send the booking data to a server
    console.log("Booking confirmed:", {
      apartment: selectedApartment,
      dates: { startDate, endDate },
      guests: { adults, children },
      guestInfo: formData,
      paymentDetails: {
        method: formData.paymentMethod,
        total: finalTotal
      }
    });
    
    setIsBookingConfirmed(true);
    
    // Reset form after booking
    setCurrentStep(1);
    setSelectedApartment(null);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zipCode: "",
      country: "",
      paymentMethod: "credit-card",
      cardName: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
      specialRequests: ""
    });
  };
  
  const nextStep = () => {
    if (currentStep === 1 && !selectedApartment) {
      return; // Cannot proceed without selecting an apartment
    }
    setCurrentStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };
  
  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Header Section */}
        <section className="py-16 bg-gradient-to-r from-sea-light to-white dark:from-sea-dark dark:to-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {t.booking.title}
              </h1>
              <p className="text-muted-foreground text-lg">
                {t.booking.subtitle}
              </p>
              
              {/* Booking Steps */}
              <div className="flex justify-between items-center mt-8 max-w-2xl mx-auto">
                {[
                  { num: 1, label: t.booking.steps.chooseRoom },
                  { num: 2, label: t.booking.steps.guestDetails },
                  { num: 3, label: t.booking.steps.confirmation }
                ].map((step, index) => (
                  <div key={step.num} className="flex flex-col items-center relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${
                      currentStep === step.num 
                        ? "bg-primary text-primary-foreground" 
                        : currentStep > step.num 
                          ? "bg-primary/80 text-primary-foreground" 
                          : "bg-muted text-muted-foreground"
                    }`}>
                      {currentStep > step.num ? <Check size={18} /> : step.num}
                    </div>
                    <span className={`text-sm ${currentStep === step.num ? "text-primary font-medium" : "text-muted-foreground"}`}>
                      {step.label}
                    </span>
                    
                    {/* Connector line */}
                    {index < 2 && (
                      <div className={`absolute top-5 left-12 w-16 md:w-32 h-0.5 transition-colors ${
                        currentStep > step.num + 1 
                          ? "bg-primary/80" 
                          : "bg-muted"
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Booking Content */}
        <section className="py-12">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form Area */}
              <div className="col-span-1 lg:col-span-2">
                {/* Step 1: Choose Room */}
                {currentStep === 1 && (
                  <div className="space-y-8 animate-fade-in">
                    {/* Date and Guest Selection */}
                    <div className="glass-card p-6 space-y-6">
                      <h3 className="text-xl font-bold">
                        {t.booking.dates.selectDates}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Check-in Date */}
                        <div className="space-y-2">
                          <label htmlFor="check-in" className="block text-sm font-medium">
                            {t.booking.dates.checkIn}
                          </label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                id="check-in"
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !startDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {startDate ? format(startDate, "PPP") : <span>{t.booking.dates.selectDate}</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={startDate}
                                onSelect={setStartDate}
                                initialFocus
                                disabled={(date) => date < new Date()}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        
                        {/* Check-out Date */}
                        <div className="space-y-2">
                          <label htmlFor="check-out" className="block text-sm font-medium">
                            {t.booking.dates.checkOut}
                          </label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                id="check-out"
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !endDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {endDate ? format(endDate, "PPP") : <span>{t.booking.dates.selectDate}</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={endDate}
                                onSelect={setEndDate}
                                initialFocus
                                disabled={(date) => date < (startDate || new Date())}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        
                        {/* Adults */}
                        <div className="space-y-2">
                          <label htmlFor="adults" className="block text-sm font-medium">
                            {t.booking.dates.adults}
                          </label>
                          <Select value={adults} onValueChange={setAdults}>
                            <SelectTrigger id="adults" className="w-full">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6].map((num) => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num} {num === 1 ? t.booking.dates.adult : t.booking.dates.adults}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {/* Children */}
                        <div className="space-y-2">
                          <label htmlFor="children" className="block text-sm font-medium">
                            {t.booking.dates.children}
                          </label>
                          <Select value={children} onValueChange={setChildren}>
                            <SelectTrigger id="children" className="w-full">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {[0, 1, 2, 3, 4].map((num) => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num} {num === 1 ? t.booking.dates.child : t.booking.dates.children}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    {/* Accommodation Selection */}
                    <div className="glass-card p-6">
                      <h3 className="text-xl font-bold mb-4">
                        {t.booking.accommodationSelect.title}
                      </h3>
                      
                      <div className="space-y-4">
                        {apartmentsData.map((apartment) => {
                          const isSelected = selectedApartment?.id === apartment.id;
                          
                          return (
                            <div 
                              key={apartment.id}
                              className={`border rounded-lg p-4 flex items-center transition-colors ${
                                isSelected ? "border-primary bg-primary/5" : "hover:border-muted-foreground/50"
                              }`}
                            >
                              <div className="flex-1">
                                <div className="flex items-center">
                                  <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                                    <img 
                                      src={apartment.image} 
                                      alt={apartment.name} 
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <h4 className="font-semibold">{apartment.name}</h4>
                                    <p className="text-sm text-muted-foreground line-clamp-1">
                                      {apartment.description}
                                    </p>
                                    <div className="flex items-center gap-3 mt-1 text-sm">
                                      <span className="flex items-center">
                                        <Users size={14} className="mr-1" />
                                        {apartment.capacity} {t.booking.accommodationSelect.guests}
                                      </span>
                                      <span>${apartment.price} / {t.booking.summary.night}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="ml-4">
                                <Button 
                                  variant={isSelected ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => setSelectedApartment(apartment)}
                                >
                                  {isSelected ? t.booking.accommodationSelect.selected : t.booking.accommodationSelect.select}
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                        
                        <div className="pt-4 flex justify-end">
                          <Button 
                            onClick={nextStep} 
                            disabled={!selectedApartment}
                            className="btn-primary"
                          >
                            {t.booking.accommodationSelect.continue}
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Step 2: Guest Information */}
                {currentStep === 2 && (
                  <div className="space-y-8 animate-fade-in">
                    {/* Guest Information Form */}
                    <div className="glass-card p-6">
                      <h3 className="text-xl font-bold mb-6">
                        {t.booking.guestInfo.title}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">{t.booking.guestInfo.firstName}</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="lastName">{t.booking.guestInfo.lastName}</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">{t.booking.guestInfo.email}</Label>
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
                          <Label htmlFor="phone">{t.booking.guestInfo.phone}</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="address">{t.booking.guestInfo.address}</Label>
                          <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="city">{t.booking.guestInfo.city}</Label>
                          <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">{t.booking.guestInfo.zipCode}</Label>
                          <Input
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="country">{t.booking.guestInfo.country}</Label>
                          <Input
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="col-span-1 md:col-span-2 space-y-2">
                          <Label htmlFor="specialRequests">{t.booking.guestInfo.specialRequests}</Label>
                          <Textarea
                            id="specialRequests"
                            name="specialRequests"
                            placeholder={t.booking.guestInfo.specialRequestsPlaceholder}
                            value={formData.specialRequests}
                            onChange={handleInputChange}
                            rows={4}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Payment Information */}
                    <div className="glass-card p-6">
                      <h3 className="text-xl font-bold mb-6">
                        {t.booking.payment.title}
                      </h3>
                      
                      <RadioGroup
                        value={formData.paymentMethod}
                        onValueChange={(value) => 
                          setFormData(prev => ({ ...prev, paymentMethod: value }))
                        }
                      >
                        <div className="flex flex-col space-y-6">
                          <div className="flex items-start space-x-3">
                            <RadioGroupItem value="credit-card" id="credit-card" />
                            <div className="grid gap-1.5 leading-none">
                              <label
                                htmlFor="credit-card"
                                className="text-base font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {t.booking.payment.creditCard}
                              </label>
                            </div>
                          </div>

                          {formData.paymentMethod === "credit-card" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-7">
                              <div className="space-y-2">
                                <Label htmlFor="cardName">{t.booking.payment.nameOnCard}</Label>
                                <Input
                                  id="cardName"
                                  name="cardName"
                                  value={formData.cardName}
                                  onChange={handleInputChange}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="cardNumber">{t.booking.payment.cardNumber}</Label>
                                <Input
                                  id="cardNumber"
                                  name="cardNumber"
                                  placeholder={t.booking.payment.cardNumberPlaceholder}
                                  value={formData.cardNumber}
                                  onChange={handleInputChange}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="cardExpiry">{t.booking.payment.expiryDate}</Label>
                                <Input
                                  id="cardExpiry"
                                  name="cardExpiry"
                                  placeholder={t.booking.payment.expiryDatePlaceholder}
                                  value={formData.cardExpiry}
                                  onChange={handleInputChange}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="cardCvc">{t.booking.payment.cvc}</Label>
                                <Input
                                  id="cardCvc"
                                  name="cardCvc"
                                  placeholder={t.booking.payment.cvcPlaceholder}
                                  value={formData.cardCvc}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>
                          )}

                          <div className="flex items-start space-x-3">
                            <RadioGroupItem value="pay-at-property" id="pay-at-property" />
                            <div className="grid gap-1.5 leading-none">
                              <label
                                htmlFor="pay-at-property"
                                className="text-base font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {t.booking.payment.payAtProperty}
                              </label>
                              {formData.paymentMethod === "pay-at-property" && (
                                <p className="text-sm text-muted-foreground mt-2">
                                  {t.booking.payment.payAtPropertyInfo}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="flex justify-between pt-4">
                      <Button 
                        variant="outline" 
                        onClick={prevStep}
                      >
                        {t.booking.confirmation.back}
                      </Button>
                      <Button 
                        onClick={nextStep}
                        className="btn-primary"
                        disabled={!formData.firstName || !formData.lastName || !formData.email}
                      >
                        {t.booking.accommodationSelect.continue}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Step 3: Confirmation */}
                {currentStep === 3 && !isBookingConfirmed && (
                  <div className="space-y-8 animate-fade-in">
                    <div className="glass-card p-6">
                      <h3 className="text-xl font-bold mb-6">
                        {t.booking.confirmation.title}
                      </h3>
                      
                      {selectedApartment && (
                        <div className="space-y-6">
                          {/* Accommodation Details */}
                          <div>
                            <h4 className="text-lg font-semibold mb-3">{t.booking.confirmation.accommodationDetails}</h4>
                            <div className="flex items-center">
                              <div className="w-24 h-16 rounded-md overflow-hidden flex-shrink-0">
                                <img 
                                  src={selectedApartment.image} 
                                  alt={selectedApartment.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="ml-4">
                                <h5 className="font-medium">{selectedApartment.name}</h5>
                                <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                                  <span>{t.booking.summary.checkIn}: {startDate && format(startDate, "PPP")}</span>
                                  <span>{t.booking.summary.checkOut}: {endDate && format(endDate, "PPP")}</span>
                                  <span>{t.booking.summary.guests}: {parseInt(adults) + parseInt(children)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Guest Details */}
                          <div>
                            <h4 className="text-lg font-semibold mb-3">{t.booking.confirmation.guestDetails}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                              <div>
                                <span className="text-sm text-muted-foreground">{t.booking.confirmation.name}</span>
                                <p>{formData.firstName} {formData.lastName}</p>
                              </div>
                              
                              <div>
                                <span className="text-sm text-muted-foreground">{t.booking.confirmation.email}</span>
                                <p>{formData.email}</p>
                              </div>
                              
                              <div>
                                <span className="text-sm text-muted-foreground">{t.booking.confirmation.phone}</span>
                                <p>{formData.phone}</p>
                              </div>
                              
                              <div>
                                <span className="text-sm text-muted-foreground">{t.booking.confirmation.address}</span>
                                <p>{formData.address}</p>
                              </div>
                              
                              <div>
                                <span className="text-sm text-muted-foreground">{t.booking.confirmation.city}</span>
                                <p>{formData.city}</p>
                              </div>
                              
                              <div>
                                <span className="text-sm text-muted-foreground">{t.booking.confirmation.country}</span>
                                <p>{formData.country}</p>
                              </div>
                            </div>
                            
                            {formData.specialRequests && (
                              <div className="mt-3">
                                <span className="text-sm text-muted-foreground">{t.booking.confirmation.specialRequests}</span>
                                <p>{formData.specialRequests}</p>
                              </div>
                            )}
                          </div>
                          
                          {/* Payment Method */}
                          <div>
                            <h4 className="text-lg font-semibold mb-3">{t.booking.confirmation.paymentMethod}</h4>
                            <p>{formData.paymentMethod === "credit-card" ? t.booking.confirmation.creditCard : t.booking.payment.payAtProperty}</p>
                          </div>
                          
                          {/* Price Summary */}
                          <div>
                            <h4 className="text-lg font-semibold mb-3">{t.booking.confirmation.priceSummary}</h4>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span>{selectedApartment.price} x {nightsCount} {nightsCount === 1 ? t.booking.summary.night : t.booking.summary.nights}</span>
                                <span>${totalPrice}</span>
                              </div>
                              
                              <div className="flex justify-between">
                                <span>{t.booking.summary.cleaningFee}</span>
                                <span>${cleaningFee}</span>
                              </div>
                              
                              <div className="flex justify-between">
                                <span>{t.booking.summary.serviceFee}</span>
                                <span>${serviceFee}</span>
                              </div>
                              
                              <div className="flex justify-between font-semibold pt-2 border-t">
                                <span>{t.booking.summary.total}</span>
                                <span>${finalTotal}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Terms and Conditions */}
                          <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="terms" 
                                checked={termsAgreed}
                                onCheckedChange={(checked) => setTermsAgreed(checked === true)}
                              />
                              <label
                                htmlFor="terms"
                                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {t.booking.confirmation.termsAgree} <a href="#" className="text-primary hover:underline">{t.booking.confirmation.termsLink}</a> {t.booking.confirmation.and} <a href="#" className="text-primary hover:underline">{t.booking.confirmation.privacyLink}</a>
                              </label>
                            </div>
                            
                            <p className="text-sm text-muted-foreground">
                              {t.booking.confirmation.cancellationInfo}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-between pt-4">
                      <Button 
                        variant="outline" 
                        onClick={prevStep}
                      >
                        {t.booking.confirmation.back}
                      </Button>
                      <Button 
                        onClick={handleConfirmBooking}
                        className="btn-primary"
                        disabled={!termsAgreed}
                      >
                        {t.booking.confirmation.confirmBooking}
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Booking Confirmation */}
                {isBookingConfirmed && (
                  <div className="text-center py-12 space-y-6 animate-fade-in">
                    <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-8 w-8 text-primary" />
                    </div>
                    
                    <h2 className="text-2xl font-bold">
                      {t.booking.confirmation.success}
                    </h2>
                    
                    <p className="text-muted-foreground max-w-lg mx-auto">
                      {t.booking.confirmation.emailSent} <strong>{formData.email}</strong>
                    </p>
                    
                    <div className="pt-4">
                      <div className="bg-muted inline-block px-4 py-2 rounded-lg">
                        <span className="text-sm text-muted-foreground">{t.booking.confirmation.bookingReference}</span>
                        <p className="font-mono font-semibold">MRS-{Math.floor(Math.random() * 9000 + 1000)}</p>
                      </div>
                    </div>
                    
                    <div className="pt-8">
                      <Button asChild className="btn-primary">
                        <Link to="/">{t.booking.confirmation.returnToHome}</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Booking Summary Sidebar */}
              {currentStep < 3 && !isBookingConfirmed && selectedApartment && (
                <div className="col-span-1">
                  <div className="sticky top-28">
                    <div className="glass-card p-6 space-y-6">
                      <h3 className="text-xl font-bold mb-2">
                        {t.booking.summary.title}
                      </h3>
                      
                      <div className="flex items-center">
                        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={selectedApartment.image} 
                            alt={selectedApartment.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <h4 className="font-medium">{selectedApartment.name}</h4>
                          <p className="text-sm text-muted-foreground">{selectedApartment.location}</p>
                        </div>
                      </div>
                      
                      <div className="pt-2 border-t space-y-2">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">{t.booking.summary.checkIn}</p>
                            <p className="text-sm text-muted-foreground">{startDate && format(startDate, "PPP")}</p>
                          </div>
                          <div>
                            <p className="font-medium">{t.booking.summary.checkOut}</p>
                            <p className="text-sm text-muted-foreground">{endDate && format(endDate, "PPP")}</p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="font-medium">{t.booking.summary.guests}</p>
                          <p className="text-sm text-muted-foreground">
                            {adults} {parseInt(adults) === 1 ? t.booking.dates.adult : t.booking.dates.adults}
                            {parseInt(children) > 0 && `, ${children} ${parseInt(children) === 1 ? t.booking.dates.child : t.booking.dates.children}`}
                          </p>
                        </div>
                      </div>
                      
                      <div className="pt-2 border-t space-y-2">
                        <div className="flex justify-between">
                          <span>{selectedApartment.price} x {nightsCount} {nightsCount === 1 ? t.booking.summary.night : t.booking.summary.nights}</span>
                          <span>${totalPrice}</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span>{t.booking.summary.cleaningFee}</span>
                          <span>${cleaningFee}</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span>{t.booking.summary.serviceFee}</span>
                          <span>${serviceFee}</span>
                        </div>
                        
                        <div className="flex justify-between font-semibold pt-2 border-t">
                          <span>{t.booking.summary.total}</span>
                          <span>${finalTotal}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
