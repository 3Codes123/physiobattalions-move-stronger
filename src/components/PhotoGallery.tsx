import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Using placeholder images that won't cause build errors
const communityPhysioImages = [
  {
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
    alt: "Community physiotherapy - outdoor assistance",
    title: "Outdoor Mobility Support"
  },
  {
    src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
    alt: "Home physiotherapy session",
    title: "Home-Based Care"
  },
  {
    src: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop",
    alt: "Rehabilitation with parallel bars",
    title: "Mobility Training"
  },
  {
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    alt: "Group physiotherapy class",
    title: "Community Programs"
  },
  {
    src: "https://images.unsplash.com/photo-1559757175-0eb30cd2ecbb?w=800&h=600&fit=crop",
    alt: "Clinical physiotherapy treatment",
    title: "Professional Treatment"
  },
  {
    src: "https://images.unsplash.com/photo-1594824797284-d3f8bb41b745?w=800&h=600&fit=crop",
    alt: "Prenatal physiotherapy",
    title: "Specialized Care"
  }
];

interface PhotoGalleryProps {
  title?: string;
  subtitle?: string;
}

const PhotoGallery = ({ title = "Community Physiotherapy Gallery", subtitle = "See our community physiotherapy services in action" }: PhotoGalleryProps) => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">{title}</h3>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{subtitle}</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {communityPhysioImages.map((image, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden border-0 shadow-soft">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover hover:scale-105 transition-smooth"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-sm">{image.title}</h4>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;