
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

type GalleryImage = {
  id: number;
  src: string;
  alt: string;
  category: string;
};

// Sample gallery images
const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1615571022219-eb45cf7faa9d",
    alt: "Beach front view",
    category: "exterior"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    alt: "Luxury suite",
    category: "rooms"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
    alt: "Swimming pool",
    category: "amenities"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c",
    alt: "Studio apartment",
    category: "rooms"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1562790351-d273a961e0e9",
    alt: "Resort exterior",
    category: "exterior"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
    alt: "Beach bar",
    category: "amenities"
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
    alt: "Restaurant",
    category: "amenities"
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
    alt: "Bathroom",
    category: "rooms"
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd",
    alt: "Sea view terrace",
    category: "exterior"
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
    alt: "Hotel spa",
    category: "amenities"
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1540541338287-41700207dee6",
    alt: "Suite bedroom",
    category: "rooms"
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd",
    alt: "Beach lounges",
    category: "exterior"
  },
];

export default function Gallery() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  const filteredImages = selectedCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);
    
  const categories = [
    { id: "all", label: t.gallery.filters.all },
    { id: "exterior", label: t.gallery.filters.exterior },
    { id: "rooms", label: t.gallery.filters.rooms },
    { id: "amenities", label: t.gallery.filters.amenities }
  ];
  
  const openLightbox = (image: GalleryImage) => {
    setLightboxImage(image);
    document.body.style.overflow = "hidden";
  };
  
  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.style.overflow = "";
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Header Section */}
        <section className="py-16 bg-gradient-to-r from-sea-light to-white dark:from-sea-dark dark:to-background">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {t.gallery.title}
              </h1>
              <p className="text-muted-foreground text-lg">
                {t.gallery.subtitle}
              </p>
            </div>
          </div>
        </section>
        
        {/* Gallery Filters */}
        <section className="py-8">
          <div className="container">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="rounded-full"
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Gallery Grid */}
        <section className="pb-16">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image, index) => (
                <div
                  key={image.id}
                  className="relative overflow-hidden rounded-lg aspect-square cursor-pointer group animate-fade-in"
                  style={{ animationDelay: `${(index % 8) * 100}ms` }}
                  onClick={() => openLightbox(image)}
                >
                  <img
                    src={`${image.src}?w=500&h=500&fit=crop&q=80`}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <p className="text-white font-medium">{image.alt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      {/* Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] animate-fade-in">
            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              className="w-full h-full object-contain"
            />
            <button
              className="absolute top-2 right-2 text-white p-2 hover:bg-white/10 rounded-full"
              onClick={closeLightbox}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="sr-only">Close</span>
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-4 py-3">
              <p className="text-white">{lightboxImage.alt}</p>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}
