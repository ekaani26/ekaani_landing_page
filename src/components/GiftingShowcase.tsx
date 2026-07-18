import { useState, useRef, useEffect } from "react";
import { Sparkles, Play, Pause, Volume2, VolumeX, Gift, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "../types";
import { MAJESTIC_INVITATIONS, RETURN_FAVORS, BESPOKE_SUITES, INVITATION_VIDEOS } from "../data";

interface GiftingShowcaseProps {
  onEnquire: (product: Product) => void;
}

// Combine all products into a unified collection
const ALL_PRODUCTS: Product[] = [
  ...MAJESTIC_INVITATIONS,
  ...RETURN_FAVORS,
  ...BESPOKE_SUITES
];

// Occasions config mapping to their exact data filters
const OCCASION_SECTIONS = [
  { label: "Wedding Gifts", occasion: "Wedding", desc: "Glorious return keepsakes and souvenirs to honor your distinguished wedding guests." },
  { label: "Wedding Hampers", occasion: "Wedding Hampers", desc: "Opulent unboxing suites designed to carry your respect and high status." },
  { label: "Return Gifts", occasion: "Return Gift", desc: "Exquisite silver plated keepsakes that say an elegant thank you." },
  { label: "Anniversary Gifts", occasion: "Anniversary", desc: "Intricate gold and silver plating items to celebrate eternal milestones." },
  { label: "Trays & Platters", occasion: "Trays", desc: "Heavily chiselled silver bowls, leaf serving trays, and masterwork display sets." },
];

// Budget brackets rows
const BUDGET_SECTIONS = [
  { label: "Under ₹1,000", min: 0, max: 1000, desc: "Charming silver plated diyas and leaf-accented bowls." },
  { label: "₹1,000 - ₹3,000", min: 1000, max: 3000, desc: "Elite single jars, dry fruit bowls, and contemporary silver platters." },
  { label: "₹3,000 - ₹5,000", min: 3000, max: 5000, desc: "Intricate silver tea sets, heavy wooden trunks, and bespoke invitation folders." },
  { label: "Above ₹5,000", min: 5000, max: 1000000, desc: "Palatial multi-compartment leather trunks and absolute heritage masterpieces." },
];

interface ReelVideoCardProps {
  video: {
    id: string;
    title: string;
    thumbnail: string;
    videoUrl?: string;
  };
  product: Product;
  onEnquire: (product: Product) => void;
}

function ReelVideoCard({ video, product, onEnquire }: ReelVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="min-w-[270px] w-[270px] md:min-w-[290px] md:w-[290px] bg-[#fcfbf7]/40 border border-stone-200/60 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col snap-center shrink-0">
      {/* Portrait Video Display */}
      <div className="relative aspect-[9/16] w-full bg-stone-100 overflow-hidden group">
        <video
          ref={videoRef}
          src={video.videoUrl}
          className="w-full h-full object-cover"
          loop
          muted={isMuted}
          playsInline
          autoPlay
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-4 flex flex-col justify-end text-left">
          <span className="text-[9px] font-sans text-[#d4af37] tracking-[0.2em] font-semibold uppercase block">
            ✨ Unboxing
          </span>
          <h4 className="text-xs font-serif text-white tracking-wide mt-0.5 line-clamp-1">
            {video.title}
          </h4>
        </div>

        {/* Play/Pause Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/25">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying(!isPlaying);
            }}
            className="p-3 bg-stone-900/90 text-white rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white text-white" />}
          </button>
        </div>

        {/* Corner Mute Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsMuted(!isMuted);
          }}
          className="absolute top-3 right-3 p-1.5 bg-black/40 hover:bg-black/60 rounded-full text-white transition-all active:scale-90 cursor-pointer"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
        </button>
      </div>

      {/* Clean Light-Themed Body */}
      <div className="p-4 flex flex-col justify-between flex-1 text-left">
        <div className="space-y-1">
          <h4 className="font-serif text-sm md:text-base text-stone-900 tracking-wide font-medium line-clamp-1">
            {product.name}
          </h4>
          <p className="text-[9px] text-stone-500 font-sans uppercase tracking-[0.15em] font-bold block">
            {product.material}
          </p>
          <p className="text-xs text-stone-600 font-light leading-relaxed line-clamp-2 mt-1">
            {product.description}
          </p>
        </div>

        {/* CTA & Price Details Row */}
        <div className="mt-4 pt-3 border-t border-stone-200/50 flex items-center justify-between gap-4">
          <div className="shrink-0 text-left">
            <span className="text-[8px] uppercase tracking-wider text-stone-400 block">Est. Price</span>
            <span className="text-xs font-semibold text-stone-500 block">{product.estimatedPrice || "Inquire"}</span>
          </div>
          <button
            onClick={() => onEnquire(product)}
            className="flex-1 bg-[#d4af37] hover:bg-stone-900 text-stone-950 hover:text-white font-sans text-[10px] tracking-widest uppercase font-bold py-2 px-3 rounded-xs flex items-center justify-center gap-1 transition-all duration-300 active:scale-98 cursor-pointer"
          >
            <Phone className="w-3 h-3" />
            <span>Arrange call</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function GiftingShowcase({ onEnquire }: GiftingShowcaseProps) {
  // Map Video IDs to their corresponding featured product
  const getAssociatedProductForVideo = (videoId: string): Product => {
    if (videoId === "vid-1") return MAJESTIC_INVITATIONS[0];
    if (videoId === "vid-2") return RETURN_FAVORS[1];
    if (videoId === "vid-3") return MAJESTIC_INVITATIONS[2];
    return BESPOKE_SUITES[2];
  };

  // Helper to scroll carousel element
  const scrollContainer = (refId: string, direction: "left" | "right") => {
    const el = document.getElementById(refId);
    if (el) {
      const scrollAmount = 300;
      el.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="space-y-0 bg-transparent">
      
      {/* =========================================================================
          SECTION 1: SHOP BY OCCASION (HORIZONTAL CAROUSELS - NO PRICES, NO TAGS)
          ========================================================================= */}
      <section id="shop-by-occasion" className="py-20 bg-white/10 backdrop-blur-xs border-b border-stone-200/40 relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Aesthetic Section Header */}
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <span className="text-[10px] tracking-[0.25em] text-[#d4af37] font-semibold uppercase block">
              Curated Occasion Collections
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 tracking-wide font-light">
              Shop By Occasion
            </h2>
            <div className="flex justify-center items-center gap-2 py-1">
              <span className="w-8 h-[1px] bg-[#d4af37]/40" />
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="w-8 h-[1px] bg-[#d4af37]/40" />
            </div>
            <p className="text-xs text-stone-500 font-sans font-light">
              Scroll through our meticulously handcrafted collections tailored for each milestone of your celebrations.
            </p>
          </div>

          {/* Render horizontal scroll rows for each occasion */}
          <div className="space-y-16">
            {OCCASION_SECTIONS.map((section) => {
              const products = ALL_PRODUCTS.filter(p => p.occasion === section.occasion);
              const containerId = `occ-scroll-${section.label.toLowerCase().replace(/\s+/g, "-")}`;

              if (products.length === 0) return null;

              return (
                <div key={section.label} className="space-y-4 text-left relative group">
                  {/* Category Row Label */}
                  <div className="flex items-end justify-between border-b border-stone-200/40 pb-2">
                    <div>
                      <h3 className="font-serif text-xl text-stone-950 font-normal tracking-wide">
                        {section.label}
                      </h3>
                      <p className="text-[11px] text-stone-500 font-sans font-light">
                        {section.desc}
                      </p>
                    </div>
                    {/* Arrow triggers for horizontal navigation */}
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => scrollContainer(containerId, "left")}
                        className="p-1.5 border border-stone-200 hover:border-[#d4af37] text-stone-600 hover:text-[#d4af37] rounded-full transition-colors cursor-pointer"
                        aria-label="Scroll left"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => scrollContainer(containerId, "right")}
                        className="p-1.5 border border-stone-200 hover:border-[#d4af37] text-stone-600 hover:text-[#d4af37] rounded-full transition-colors cursor-pointer"
                        aria-label="Scroll right"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Horizontal scrolling card track */}
                  <div
                    id={containerId}
                    className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 scrollbar-thin snap-x snap-mandatory text-left scroll-smooth"
                    style={{ scrollbarWidth: "thin" }}
                  >
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="min-w-[240px] sm:min-w-[280px] md:min-w-[300px] max-w-[320px] snap-start bg-white/80 backdrop-blur-xs border border-stone-200/50 p-3.5 sm:p-4 transition-all duration-300 hover:border-[#d4af37]/45 shadow-xs hover:shadow-md flex flex-col justify-between group/card"
                      >
                        <div>
                          {/* Image Block - STRICTLY NO PRICES OR TAGS */}
                          <div className="relative overflow-hidden aspect-[4/5] bg-stone-50/50 border border-stone-100 mb-3 shrink-0">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                              referrerPolicy="no-referrer"
                              loading="lazy"
                            />
                          </div>

                          {/* Metadata - ONLY name & desc */}
                          <div className="space-y-1">
                            <h4 className="font-serif text-sm sm:text-base text-stone-950 tracking-wide line-clamp-1 group-hover/card:text-[#d4af37] transition-colors duration-200">
                              {product.name}
                            </h4>
                            <p className="text-[10px] text-stone-500 line-clamp-2 leading-relaxed font-light font-sans">
                              {product.description}
                            </p>
                          </div>
                        </div>

                        {/* CTA Block */}
                        <div className="pt-3 border-t border-stone-100 mt-4">
                          <button
                            onClick={() => onEnquire(product)}
                            className="w-full bg-stone-900 hover:bg-[#d4af37] text-white hover:text-stone-950 text-[10px] tracking-widest uppercase py-2.5 px-3 font-semibold transition-all duration-200 cursor-pointer text-center"
                          >
                            Enquire Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: SHOP BY BUDGET (HORIZONTAL CAROUSELS - PRICES ARE SHOWN)
          ========================================================================= */}
      <section id="shop-by-budget" className="py-20 bg-white/5 backdrop-blur-xs border-b border-stone-200/40 relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Aesthetic Section Header */}
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <span className="text-[10px] tracking-[0.25em] text-[#d4af37] font-semibold uppercase block">
              Flexible Investment Curations
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 tracking-wide font-light">
              Shop By Budget
            </h2>
            <div className="flex justify-center items-center gap-2 py-1">
              <span className="w-8 h-[1px] bg-[#d4af37]/40" />
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="w-8 h-[1px] bg-[#d4af37]/40" />
            </div>
            <p className="text-xs text-stone-500 font-sans font-light">
              Explore magnificent keepsakes and custom Hampers clearly grouped by investment price tiers.
            </p>
          </div>

          {/* Render horizontal scroll rows for each budget tier */}
          <div className="space-y-16">
            {BUDGET_SECTIONS.map((section) => {
              const products = ALL_PRODUCTS.filter(p => {
                const val = p.priceValue || 0;
                return val >= section.min && val <= section.max;
              });
              const containerId = `budget-scroll-${section.label.toLowerCase().replace(/[^\w]+/g, "-")}`;

              if (products.length === 0) return null;

              return (
                <div key={section.label} className="space-y-4 text-left relative group">
                  {/* Category Row Label */}
                  <div className="flex items-end justify-between border-b border-stone-200/40 pb-2">
                    <div>
                      <h3 className="font-serif text-xl text-stone-950 font-normal tracking-wide">
                        {section.label}
                      </h3>
                      <p className="text-[11px] text-stone-500 font-sans font-light">
                        {section.desc}
                      </p>
                    </div>
                    {/* Arrow triggers */}
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => scrollContainer(containerId, "left")}
                        className="p-1.5 border border-stone-200 hover:border-[#d4af37] text-stone-600 hover:text-[#d4af37] rounded-full transition-colors cursor-pointer"
                        aria-label="Scroll left"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => scrollContainer(containerId, "right")}
                        className="p-1.5 border border-stone-200 hover:border-[#d4af37] text-stone-600 hover:text-[#d4af37] rounded-full transition-colors cursor-pointer"
                        aria-label="Scroll right"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Horizontal scrolling card track */}
                  <div
                    id={containerId}
                    className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 scrollbar-thin snap-x snap-mandatory text-left scroll-smooth"
                    style={{ scrollbarWidth: "thin" }}
                  >
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="min-w-[240px] sm:min-w-[280px] md:min-w-[300px] max-w-[320px] snap-start bg-white/85 backdrop-blur-xs border border-stone-200/50 p-3.5 sm:p-4 transition-all duration-300 hover:border-[#d4af37]/45 shadow-xs hover:shadow-md flex flex-col justify-between group/card"
                      >
                        <div>
                          {/* Image Block with subtle luxurious tag */}
                          <div className="relative overflow-hidden aspect-[4/5] bg-stone-50 border border-stone-100 mb-3 shrink-0">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                              referrerPolicy="no-referrer"
                              loading="lazy"
                            />
                            {product.priceValue && product.priceValue >= 5000 && (
                              <span className="absolute top-2 left-2 bg-stone-900/90 text-[#d4af37] text-[8px] font-bold tracking-wider uppercase py-0.5 px-2 rounded-xs">
                                Bespoke Gold
                              </span>
                            )}
                          </div>

                          {/* Metadata */}
                          <div className="space-y-1">
                            <h4 className="font-serif text-sm sm:text-base text-stone-900 tracking-wide line-clamp-1 group-hover/card:text-[#d4af37] transition-colors duration-200">
                              {product.name}
                            </h4>
                            <p className="text-[10px] text-stone-500 line-clamp-2 leading-relaxed font-light font-sans">
                              {product.description}
                            </p>
                          </div>
                        </div>

                        {/* CTA Block - PRICE REMOVED */}
                        <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 mt-4">
                          <div>
                            <span className="text-[9px] uppercase tracking-wider text-[#d4af37] font-semibold block leading-none">
                              Investment
                            </span>
                            <span className="text-xs sm:text-sm font-medium text-stone-500 font-sans mt-0.5 block">
                              {product.estimatedPrice || "Inquire for Pricing"}
                            </span>
                          </div>
                          <button
                            onClick={() => onEnquire(product)}
                            className="w-full sm:w-auto bg-stone-900 hover:bg-[#d4af37] text-white hover:text-stone-950 text-[10px] tracking-wider uppercase py-1.5 px-3.5 font-semibold transition-all duration-200 cursor-pointer text-center"
                          >
                            Enquire
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: SHOP BY REEL (HORIZONTAL SCROLLABLE LIVE UNBOXING REELS)
          ========================================================================= */}
      <section id="shop-by-reel" className="py-20 bg-stone-50/40 backdrop-blur-xs border-b border-stone-200/40 relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Aesthetic Section Header */}
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-[10px] tracking-[0.25em] text-[#d4af37] font-semibold uppercase block">
              Cinematic Unboxing Showcase
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 tracking-wide font-light">
              Shop By Reel
            </h2>
            <div className="flex justify-center items-center gap-2 py-1">
              <span className="w-8 h-[1px] bg-[#d4af37]/40" />
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="w-8 h-[1px] bg-[#d4af37]/40" />
            </div>
            <p className="text-xs text-stone-500 font-sans font-light">
              Scroll and watch live unboxing clips showcasing the premium protective coatings, heavy sterling plating, and unmatched unboxing experience of our hampers.
            </p>
          </div>

          {/* Reels Horizontal Scroll Slider */}
          <div className="relative group max-w-5xl mx-auto">
            {/* Scroll Navigation Buttons (Visible on desktop hover) */}
            <button
              onClick={() => scrollContainer("reels-scroll-track", "left")}
              className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/95 border border-stone-200 shadow-sm flex items-center justify-center text-stone-700 hover:text-stone-900 hover:scale-105 active:scale-95 transition-all opacity-0 group-hover:opacity-100 cursor-pointer hidden md:flex"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => scrollContainer("reels-scroll-track", "right")}
              className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/95 border border-stone-200 shadow-sm flex items-center justify-center text-stone-700 hover:text-stone-900 hover:scale-105 active:scale-95 transition-all opacity-0 group-hover:opacity-100 cursor-pointer hidden md:flex"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Scrollable Horizontal Track */}
            <div
              id="reels-scroll-track"
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-none no-scrollbar justify-start md:justify-center"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {INVITATION_VIDEOS.map((vid) => {
                const associatedProduct = getAssociatedProductForVideo(vid.id);
                return (
                  <ReelVideoCard
                    key={vid.id}
                    video={vid}
                    product={associatedProduct}
                    onEnquire={onEnquire}
                  />
                );
              })}
            </div>
            
            {/* Direct Slider Dots Navigation */}
            <div className="flex justify-center gap-1.5 mt-2">
              {INVITATION_VIDEOS.map((vid, idx) => (
                <button
                  key={vid.id}
                  onClick={() => {
                    const el = document.getElementById("reels-scroll-track");
                    if (el) {
                      el.scrollTo({
                        left: idx * 300,
                        behavior: "smooth"
                      });
                    }
                  }}
                  className="w-1.5 h-1.5 rounded-full bg-stone-300 hover:bg-[#d4af37] transition-all cursor-pointer"
                  aria-label={`Go to reel ${vid.id}`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
