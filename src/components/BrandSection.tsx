import { BRAND_PARTNERS } from "../data";

export default function BrandSection() {
  return (
    <section id="brand-story" className="py-24 bg-white/15 backdrop-blur-[0.5px] border-b border-stone-100/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Brand Story Left Panel */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#aa7c11] font-sans font-bold block">
                Heritage & Excellence
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-stone-900 tracking-wide font-light leading-tight">
                Who we are?
              </h2>
              <div className="w-16 h-[2px] bg-[#d4af37]" />
            </div>

            <div className="space-y-6 text-stone-600 font-sans text-base leading-relaxed font-light">
              <p>
                Since 1985, <strong className="text-stone-900 font-normal">Ekaani</strong> has become India's number one choice for luxury wedding return gifts. Our brand represents trust, superior craftsmanship, extravagant designs, international aesthetics, and unrivaled quality - all brought together to create a unique style that reflects the grandeur of your special day.
              </p>
              <p>
                We believe that invitations and return favors are not merely objects; they are sacred keepsakes that carry your respect, love, and royal status to your pristine guests. That is why every Ekaani item undergoes rigorous quality tests and carries our absolute guarantee of authenticity.
              </p>
              <p className="font-serif italic text-lg text-stone-800">
                Ekaani is the trusted wedding and gifting partner of top corporate leaders and royal families:
              </p>
            </div>

            {/* Brand Partners Grid (Clean, minimalistic logo chips) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
              {BRAND_PARTNERS.map((partner, index) => (
                <div
                  key={index}
                  className="border border-stone-200/60 p-4 flex flex-col items-center justify-center text-center bg-white hover:border-[#d4af37] transition-all duration-300 shadow-xs hover:shadow-md"
                >
                  {partner.logoUrl ? (
                    <img
                      src={partner.logoUrl}
                      alt={partner.name}
                      className="h-10 md:h-12 w-auto object-contain mb-2 mix-blend-multiply transition-transform duration-300 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="font-serif text-xs md:text-sm tracking-[0.25em] text-stone-900 font-medium uppercase mb-2">
                      {partner.logoText}
                    </span>
                  )}
                  <span className="text-[10px] font-semibold text-stone-800 font-sans uppercase">
                    {partner.name}
                  </span>
                  {partner.subtext && (
                    <span className="text-[8px] tracking-widest text-stone-400 font-sans uppercase mt-0.5">
                      {partner.subtext}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Brand Story Right Panel - Tall Picture */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm aspect-[3/4] overflow-hidden shadow-2xl border border-stone-200/50">
              {/* Outer double border simulation */}
              <div className="absolute inset-4 border border-[#d4af37]/30 pointer-events-none z-10" />
              <img
                src="https://cdn.shopify.com/s/files/1/0748/5014/0446/files/14-32.jpg?v=1784361710"
                alt="Ekaani Wedding Luxury Presentation Showcase"
                className="w-full h-full object-cover object-center transition-transform duration-[4s] hover:scale-105 brightness-[0.97]"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-xs p-6 text-center shadow-lg border border-stone-100 z-10">
                <p className="font-serif text-lg text-stone-900">Handcrafted Legacy</p>
                <p className="text-[9px] uppercase tracking-widest text-stone-500 font-sans mt-1">
                  Guaranteed Heirloom Artistry
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
