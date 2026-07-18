import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search, HelpCircle } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    question: "What are the best wedding return gifts for guests?",
    answer: "The best return gifts combine utility with timeless royal elegance. At Ekaani, our German silver bowls, premium silver-plated trays, lead-crystal dry fruit jars, and silver-infused customized hampers are highly preferred for their classic charm and aesthetic longevity."
  },
  {
    question: "Do you offer premium wedding return gifts in bulk?",
    answer: "Yes, we specialize in high-end bulk orders. Every gift item is custom-packaged in our signature velvet/silk boxes, complete with premium metallic accents, wax seals, and customized message cards, crafted to represent your family's royal hospitality."
  },
  {
    question: "Can I customize wedding return gifts?",
    answer: "Absolutely. At Ekaani, personalization is at the heart of our craft. We can engrave your monogram, names, or wedding dates, customize the outer luxury boxes to match your wedding color theme, and add bespoke inserts or custom gourmet jars (saffron, almonds, tea)."
  },
  {
    question: "What are good return gift ideas for Indian weddings?",
    answer: "Traditional and elegant choices remain the most popular. Handcrafted silver-plated diyas, royal peacock platters, dual-tone service trays, multi-tier sweet servers, and ornate deities like Ram Darbar and Radha Krishna represent sacred blessing and high prestige."
  },
  {
    question: "Do you have return gifts for close relatives?",
    answer: "Yes, we offer premium tier bespoke presentation sets designed specifically for close family members and premium guests. These include heavy sterling silver platters, premium velvet trunks, and handcrafted dual-tone tea services."
  },
  {
    question: "What are traditional wedding return gifts?",
    answer: "Traditional choices center around auspiciousness and hospitality, such as German silver plated bowls, dry fruit jars, silver coins, or custom puja ensembles. These gifts are revered as a representation of good fortune and prosperity."
  },
  {
    question: "Do you offer wedding gifts under ₹1,000 or ₹2,000?",
    answer: "Yes. While we curate palatial-grade masterpieces, we have elegant options starting under ₹1,000, such as single lead-crystal jars with silver lids, traditional diya stands, and compact sweet boxes. We ensure Ekaani's guaranteed quality in every price range."
  },
  {
    question: "Can I order bridal hampers?",
    answer: "Yes, we design opulent customized bridal hampers. These typically showcase curated beauty accessories, custom-blended luxury teas, designer jars, and bespoke silver keepsakes presented in custom hand-gilded velvet or leatherette cases."
  },
  {
    question: "Do you make bridesmaid hampers?",
    answer: "Certainly. We curate aesthetic, premium bridesmaid trunks featuring pastel color palettes, personalized silver-plated trinket boxes, gourmet dry fruits, custom perfumes, and handcrafted dry floral arrangements."
  },
  {
    question: "Do you sell gift hampers for couples?",
    answer: "Yes, we curate beautiful couple celebration sets. These feature dual-tone glassware, designer champagne flutes with silver stems, combined vanity cases, and bespoke dry fruit or luxury sweet assortments."
  },
  {
    question: "Do you offer engagement ring platters?",
    answer: "Yes. Our engagement ring platters are legendary, crafted with premium velvet backdrops, gold borders, laser-cut acrylic supports, and fresh or silk floral details to make your ring exchange look absolutely royal."
  },
  {
    question: "Can I customize a ring platter with our names?",
    answer: "Yes, we can seamlessly integrate laser-etched metallic plates or custom acrylic cutouts of the couple's names, initials, or the wedding hashtag on the ring platter."
  },
  {
    question: "Do you have traditional ring ceremony plates?",
    answer: "Yes. We offer traditional handcrafted brass and German silver-plated plates featuring delicate peacock borders, floral engravings, and specialized velvet ring holders."
  },
  {
    question: "Are your gifts suitable for destination weddings?",
    answer: "Absolutely. We offer lightweight travel-friendly presentation materials and custom structural packaging designed to withstand transit so they arrive flawless at your destination."
  },
  {
    question: "Can you deliver wedding gifts anywhere in India?",
    answer: "Yes, we partner with reliable express cargo networks to offer door-to-door, fully insured shipping for all bulk orders to any city in India, as well as select international destinations."
  },
  {
    question: "How early should I place a bulk wedding order?",
    answer: "For general designs, we recommend placing orders 4 to 6 weeks in advance. For completely bespoke creations requiring custom silver engravings or unique box fabric colors, 8 weeks is ideal."
  },
  {
    question: "Why choose Ekaani for wedding gifting?",
    answer: "Ekaani is trusted by India's most prominent families for our guaranteed heirloom quality plating, meticulous hand-gilding, absolute authenticity, premium custom packaging, and direct door-to-door express delivery service."
  },
  {
    question: "Do you sell wedding invitation cards?",
    answer: "Yes, we create luxury wedding invitation cards, scroll invitations, bento-style invite boxes, and premium digital invites that serve as a royal announcement of your grand day."
  },
  {
    question: "Can I customize wedding invitation cards?",
    answer: "Yes. From custom hand-drawn illustrations, foil stamping, laser-cut borders, customized wax seals, and premium Italian papers, we customize every single aspect to tell your story."
  },
  {
    question: "Do you print wedding cards?",
    answer: "Yes. We offer premium wedding card printing with high-quality materials, elegant finishes, and personalized designs."
  }
];

export default function FAQSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const filteredFaqs = FAQ_DATA.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-[#fcfbf7]/60 border-t border-stone-200/50 scroll-mt-12" id="faq-section">
      <div className="max-w-4xl mx-auto">
        
        {/* Title and Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-[10px] md:text-xs tracking-[0.3em] text-[#d4af37] uppercase font-semibold">
            Luxury Atelier Concierge
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900 font-light tracking-wide">
            Frequently Asked Questions
          </h2>
          <div className="h-0.5 w-12 bg-[#d4af37]/50 mx-auto mt-4" />
          <p className="text-xs md:text-sm text-stone-500 font-light max-w-lg mx-auto">
            Everything you need to know about commissioning luxury invites, bespoke return favors, and custom printing.
          </p>
        </div>

        {/* Elegant Search Bar */}
        <div className="relative max-w-md mx-auto mb-10">
          <input
            type="text"
            placeholder="Search our FAQ desk (e.g., custom cards, bulk gifts)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-xs bg-white border border-stone-200 focus:border-[#d4af37] rounded-full text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#d4af37]/30 transition-all font-sans shadow-xs"
          />
          <Search className="w-4 h-4 text-[#d4af37] absolute left-3.5 top-1/2 -translate-y-1/2" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs font-semibold"
            >
              Clear
            </button>
          )}
        </div>

        {/* Collapsible Accordion Grid */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isExpanded = expandedIndex === idx;
              return (
                <div
                  key={idx}
                  className={`border border-stone-200 bg-white transition-all duration-300 rounded-sm overflow-hidden ${
                    isExpanded ? "shadow-md border-[#d4af37]/50" : "hover:border-stone-300 shadow-xs"
                  }`}
                >
                  <button
                    onClick={() => toggleExpand(idx)}
                    className="w-full flex items-center justify-between p-4 md:p-5 text-left select-none focus:outline-none group"
                  >
                    <span className="font-serif text-sm md:text-base text-stone-900 font-medium group-hover:text-[#aa7c11] transition-colors pr-4">
                      {faq.question}
                    </span>
                    <span className="shrink-0 text-[#d4af37]">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  </button>
                  
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isExpanded ? "max-h-[500px] border-t border-stone-100 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="p-4 md:p-5 bg-stone-50/50 text-xs md:text-sm text-stone-600 leading-relaxed font-sans font-light">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white border border-stone-200 rounded-md">
              <HelpCircle className="w-8 h-8 text-stone-300 mx-auto mb-3" />
              <p className="text-xs text-stone-500 font-medium font-sans">No questions found matching your search.</p>
              <button
                onClick={() => setSearchTerm("")}
                className="text-xs text-[#d4af37] font-semibold underline mt-2"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-12 text-center p-6 bg-stone-900 border border-[#d4af37]/20 text-white rounded-xs">
          <h4 className="font-serif text-lg tracking-wide text-white">Have a Unique Requirement?</h4>
          <p className="text-stone-400 text-xs max-w-md mx-auto mt-2 leading-relaxed">
            Our private design atelier is ready to bring your vision to life. Launch a chat to consult directly on materials, budgets, or custom engraving.
          </p>
          <button
            onClick={() => {
              const floatingBtn = document.getElementById("whatsapp-floating-btn");
              if (floatingBtn) {
                floatingBtn.click();
              }
            }}
            className="mt-4 inline-flex items-center gap-2 bg-[#d4af37] hover:bg-[#aa7c11] text-stone-950 font-bold uppercase tracking-widest text-[10px] py-2 px-5 transition-colors"
          >
            Launch WhatsApp Concierge
          </button>
        </div>

      </div>
    </section>
  );
}
