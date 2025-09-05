import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import communityPhysio1 from "@/assets/community-physio-1.jpg";
import communityPhysio2 from "@/assets/community-physio-2.jpg";
import communityPhysio3 from "@/assets/community-physio-3.jpg";
import communityPhysio4 from "@/assets/community-physio-4.jpg";
import communityPhysio5 from "@/assets/community-physio-5.jpg";
import communityPhysio6 from "@/assets/community-physio-6.jpg";

const communityPhysioImages = [
  {
    src: communityPhysio1,
    alt: "Community physiotherapy - outdoor assistance",
    title: "Outdoor Mobility Support"
  },
  {
    src: communityPhysio2,
    alt: "Home physiotherapy session",
    title: "Home-Based Care"
  },
  {
    src: communityPhysio3,
    alt: "Rehabilitation with parallel bars",
    title: "Mobility Training"
  },
  {
    src: communityPhysio4,
    alt: "Group physiotherapy class",
    title: "Community Programs"
  },
  {
    src: communityPhysio5,
    alt: "Clinical physiotherapy treatment",
    title: "Professional Treatment"
  },
  {
    src: communityPhysio6,
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