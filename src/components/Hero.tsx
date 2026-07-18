import { Sparkles, Calendar } from "lucide-react";

export default function Hero() {
  const handleScrollToForm = () => {
    const element = document.getElementById("enquiry-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen bg-[#fcfbf7]/15 backdrop-blur-[0.5px] pt-[56px] md:pt-[64px] pb-16 flex flex-col overflow-hidden w-full">
      {/* Delicate watercolor/floral abstract vector background circles */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-100/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#d4af37]/5 blur-3xl pointer-events-none" />

      {/* Stylized watercolor leaves graphic simulator */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-teal-100/5 rounded-full blur-xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#d4af37]/5 rounded-full blur-xl pointer-events-none" />

      {/* 1. Full-Width Edge-to-Edge Cinematic Video touching Left, Right, and Top */}
      <div className="w-full relative flex flex-col">
        <video
          src="https://cdn.shopify.com/videos/c/o/v/5e0cd1348ad14bdb919351c552bedb2f.mp4"
          className="w-full h-auto block"
          autoPlay
          loop
          muted
          playsInline
        />
        <button
          onClick={handleScrollToForm}
          className="w-full bg-[#d4af37] text-stone-950 hover:bg-stone-900 hover:text-white transition-all duration-300 py-4 px-6 flex items-center justify-center gap-2 text-xs md:text-sm uppercase font-sans tracking-[0.2em] font-bold cursor-pointer shadow-md"
        >
          <Calendar className="w-4 h-4" />
          <span>Schedule Store Visit</span>
        </button>
      </div>

      {/* 2. Text and Action Columns flow after the cinematic preview */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative w-full z-10 flex flex-col gap-10 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          
          {/* Left Block - Pure Typographical Elegance */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-4">
            <div className="flex items-center gap-2 bg-white/80 border border-stone-200/60 px-3 py-1 rounded-full text-[10px] tracking-widest text-[#aa7c11] uppercase font-sans font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Premium Gifting Since 1985</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-stone-900 leading-tight font-light">
              Premium Wedding <br />
              <span className="italic font-normal font-serif text-[#aa7c11]">Gifts & Invites</span>
            </h1>

            <p className="text-stone-600 font-sans text-base max-w-2xl leading-relaxed font-light">
              Exclusivity and richness for your pristine guests. Discover curated masterpiece creations handcrafted to make your celebration memorable.
            </p>
          </div>

          {/* Right Block - Immediate Lead CTA & Quick Budget Breakdown */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-end pb-2">
            <div className="text-left">
              <p className="text-xs text-stone-400 font-sans tracking-wider uppercase">
                Budget Ranging
              </p>
              <p className="text-sm font-semibold text-stone-800 font-sans">
                ₹1,000 to ₹20,000 <span className="text-xs font-normal text-stone-500">/ guest</span>
              </p>
              <p className="text-[10px] text-stone-400 italic mt-0.5">
                *Customizable bulk rates.
              </p>
            </div>

            <button
              onClick={handleScrollToForm}
              className="bg-[#d4af37] text-stone-950 hover:bg-stone-900 hover:text-white transition-luxury text-xs uppercase font-sans tracking-widest px-8 py-4 font-semibold shadow-md shadow-[#d4af37]/10 active:scale-95"
            >
              Enquire Now
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
