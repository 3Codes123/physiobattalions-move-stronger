import * as React from "react"
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react"
import { Button } from "./button"
import { cn } from "@/lib/utils"

type CarouselProps = {
  images: {
    src: string
    alt: string
  }[]
  autoPlay?: boolean
  interval?: number
  showDots?: boolean
  showArrows?: boolean
  showPauseButton?: boolean
  className?: string
}

export function ImageCarousel({
  images,
  autoPlay = true,
  interval = 3000,
  showDots = true,
  showArrows = true,
  showPauseButton = true,
  className,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)
  const [touchStart, setTouchStart] = React.useState<number | null>(null)
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null)
  const [visibleSlides, setVisibleSlides] = React.useState(4) // Default for desktop
  const carouselRef = React.useRef<HTMLDivElement>(null)

  // Responsive slides per view
  React.useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth
      if (width < 640) {
        setVisibleSlides(1)
      } else if (width < 1024) {
        setVisibleSlides(2)
      } else if (width < 1280) {
        setVisibleSlides(3)
      } else {
        setVisibleSlides(4)
      }
    }

    updateSlides()
    window.addEventListener('resize', updateSlides)
    return () => window.removeEventListener('resize', updateSlides)
  }, [])

  // Auto slide
  React.useEffect(() => {
    if (!autoPlay || isPaused) return

    const timer = setInterval(() => {
      nextSlide()
    }, interval)

    return () => clearInterval(timer)
  }, [currentIndex, isPaused, autoPlay, interval, images.length])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= Math.ceil(images.length / visibleSlides) - 1 ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex <= 0 ? Math.ceil(images.length / visibleSlides) - 1 : prevIndex - 1
    )
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Touch event handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
    setTouchEnd(null)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || touchEnd === null) return
    
    const diff = touchStart - touchEnd
    if (diff > 5) {
      nextSlide()
    } else if (diff < -5) {
      prevSlide()
    }
    
    setTouchStart(null)
    setTouchEnd(null)
  }

  // Calculate the transform value for the slider
  const transformValue = `translateX(-${currentIndex * (100 / visibleSlides)}%)`

  // Calculate the number of slides
  const totalSlides = Math.ceil(images.length / visibleSlides)

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div 
        ref={carouselRef}
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: transformValue }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((image, index) => (
          <div 
            key={index}
            className="flex-shrink-0"
            style={{ width: `${100 / visibleSlides}%` }}
          >
            <div className="p-2">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 md:h-80 object-cover rounded-lg shadow-md"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showArrows && images.length > visibleSlides && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md z-10"
            aria-label="Previous slide"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md z-10"
            aria-label="Next slide"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Pause/Play Button */}
      {showPauseButton && autoPlay && (
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md z-10"
          aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
        >
          {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
        </button>
      )}

      {/* Dots */}
      {showDots && totalSlides > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-primary scale-125' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
