import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Product } from "../types";

interface ProductSectionProps {
  id: string;
  title: string;
  subtitle: string;
  products: Product[];
  onEnquire: (product: Product) => void;
}

export default function ProductSection({
  id,
  title,
  subtitle,
  products,
  onEnquire,
}: ProductSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 320; // approximate width of card
    const container = scrollContainerRef.current;
    
    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      setActiveIndex((prev) => Math.max(0, prev - 1));
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setActiveIndex((prev) => Math.min(products.length - 1, prev + 1));
    }
  };

  const handleDotClick = (index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = index * 320;
    container.scrollTo({ left: scrollAmount, behavior: "smooth" });
    setActiveIndex(index);
  };

  const handleGeneralEnquiry = () => {
    const element = document.getElementById("enquiry-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id={id} className="py-20 bg-white/95 backdrop-blur-md border-b border-stone-100 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 tracking-wide font-light">
            {title}
          </h2>
          <div className="flex justify-center items-center gap-2">
            <span className="w-12 h-[1px] bg-stone-300" />
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <span className="w-12 h-[1px] bg-stone-300" />
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-stone-500 font-sans font-medium">
            {subtitle}
          </p>
        </div>

        {/* Carousel Slider Wrapper */}
        <div className="relative group">
          {/* Navigation Arrows */}
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 md:-ml-6 z-20 bg-stone-50/90 text-stone-800 hover:text-[#d4af37] p-3 rounded-full border border-stone-200 shadow-md backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 md:-mr-6 z-20 bg-stone-50/90 text-stone-800 hover:text-[#d4af37] p-3 rounded-full border border-stone-200 shadow-md backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Products Horizontal Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 px-2"
            style={{ scrollbarWidth: "none" }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="min-w-[270px] sm:min-w-[320px] flex-shrink-0 snap-start bg-[#fcfbf7]/50 border border-stone-200/50 p-4 transition-all duration-500 hover:border-[#d4af37]/40 hover:bg-[#fcfbf7] group/card"
              >
                {/* Product Image Panel */}
                <div className="relative overflow-hidden aspect-[4/5] bg-stone-100 border border-stone-200/40 mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover/card:scale-110 brightness-[0.98]"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle Elegant Label */}
                  <div className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-xs text-white text-[9px] tracking-widest font-sans uppercase py-1 px-2">
                    Ekaani Original
                  </div>
                </div>

                {/* Info Panel */}
                <div className="space-y-2 text-center">
                  <h3 className="font-serif text-lg text-stone-900 group-hover/card:text-[#aa7c11] transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-[11px] uppercase tracking-wider text-stone-500 font-sans">
                    {product.material}
                  </p>
                  <p className="text-xs text-stone-600 line-clamp-2 h-8 font-light max-w-[280px] mx-auto">
                    {product.description}
                  </p>
                  {/* Price hidden at user request */}

                  {/* Micro Enquiry Action */}
                  <div className="pt-2 opacity-100 md:opacity-0 md:group-hover/card:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => onEnquire(product)}
                      className="text-[10px] tracking-widest uppercase font-sans text-stone-900 border-b border-stone-900 hover:text-[#d4af37] hover:border-[#d4af37] pb-0.5 transition-all font-medium"
                    >
                      Enquire For This Item
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Slide Indicators (Dots) */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {products.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx ? "bg-[#d4af37] w-6" : "bg-stone-300 hover:bg-stone-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Huge Centered Enquiry Trigger */}
        <div className="text-center mt-12">
          <button
            onClick={handleGeneralEnquiry}
            className="bg-[#d4af37]/10 text-[#aa7c11] hover:bg-[#d4af37] hover:text-stone-950 border border-[#d4af37]/30 transition-luxury text-xs uppercase font-sans tracking-widest px-8 py-3.5 font-semibold"
          >
            Enquire Now
          </button>
        </div>
      </div>
    </section>
  );
}
