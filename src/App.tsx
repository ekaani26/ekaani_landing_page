import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import GiftingShowcase from "./components/GiftingShowcase";
import BrandSection from "./components/BrandSection";
import AiCurator from "./components/AiCurator";
import EnquiryForm from "./components/EnquiryForm";
import StoreLocations from "./components/StoreLocations";
import WatiConfigModal from "./components/WatiConfigModal";
import SlimEnquiryDrawer from "./components/SlimEnquiryDrawer";
import WhatsAppChatWidget from "./components/WhatsAppChatWidget";
import FAQSection from "./components/FAQSection";

import { MAJESTIC_INVITATIONS, RETURN_FAVORS, BESPOKE_SUITES } from "./data";
import { Product } from "./types";
import { Sparkles, Settings2 } from "lucide-react";

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [watiModalOpen, setWatiModalOpen] = useState(false);
  const [slimDrawerOpen, setSlimDrawerOpen] = useState(false);
  const [slimDrawerPreset, setSlimDrawerPreset] = useState<"Hampers" | "Bulk" | "Customized" | "General">("General");

  // Triggered when a user clicks "Enquire" on any specific product card
  const handleProductEnquiry = (product: Product) => {
    setSelectedProduct(product);
    setSlimDrawerPreset("General");
    setSlimDrawerOpen(true);
  };

  const handleClearPrefilled = () => {
    setSelectedProduct(null);
  };

  // Footer Navigation Action Handlers
  const handleSelectHampers = () => {
    setSelectedProduct(null);
    setSlimDrawerPreset("Hampers");
    setSlimDrawerOpen(true);
  };

  const handleSelectBulk = () => {
    setSelectedProduct(null);
    setSlimDrawerPreset("Bulk");
    setSlimDrawerOpen(true);
  };

  const handleSelectCustomized = () => {
    setSelectedProduct(null);
    setSlimDrawerPreset("Customized");
    setSlimDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-transparent text-stone-800 font-sans selection:bg-[#d4af37]/30 selection:text-stone-900">
      {/* 1. Header */}
      <Header />

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Section: Unified Interactive Catalog (Occasions, Budgets, Reels) */}
      <GiftingShowcase onEnquire={handleProductEnquiry} />

      {/* Ornament Divider */}
      <div className="bg-transparent flex justify-center py-4 text-stone-200">
        <span className="text-3xl tracking-[0.5em] font-serif">❖ ❖ ❖</span>
      </div>

      {/* 7. Section: Who We Are / Brand Narrative */}
      <BrandSection />

      {/* 8. Interactive Section: AI Luxe Curator */}
      <AiCurator />

      {/* 9. Section: Contact Enquiry Form */}
      <EnquiryForm
        prefilledProduct={selectedProduct}
        clearPrefilled={handleClearPrefilled}
      />

      {/* Our Store Locations Section */}
      <StoreLocations />

      {/* Frequently Asked Questions Section */}
      <FAQSection />

      {/* 10. Luxurious Footer */}
      <footer className="bg-stone-900 text-stone-300 pt-20 pb-8 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
          {/* Column 1: Brand details */}
          <div className="space-y-4">
            {/* Brand Logo Lockup */}
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="https://cdn.shopify.com/s/files/1/0748/5014/0446/files/Layer_x0020_1_83f4e6f8-cf11-4a6c-9d21-9bb72e6775d8.svg?v=1683268225" 
                alt="Ekaani Logo" 
                className="h-10 w-auto object-contain invert brightness-200"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col border-l border-stone-700 pl-3">
                <span className="text-xl font-serif tracking-widest text-white uppercase font-light leading-none">
                  ekaani
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              Since 1985, Ekaani has been India’s premier destination for high-end gifting, offering masterpieces of sterling silver-plated brass, porcelain, and crystal designed in collaboration with the world's top heritage labels.
            </p>
          </div>

          {/* Column 2: Showrooms */}
          <div className="space-y-4">
            <h5 className="font-serif text-sm uppercase text-white tracking-widest font-medium">
              Flagship Showrooms
            </h5>
            <ul className="space-y-3 text-xs font-sans text-stone-400 font-light">
              <li>
                <strong className="text-stone-300 font-medium">New Delhi (GK-1):</strong> <br />
                M-Block Market, Greater Kailash-1, New Delhi - 110048
              </li>
              <li>
                <strong className="text-stone-300 font-medium">Mumbai (Juhu):</strong> <br />
                Vaikunthlal Mehta Rd, Juhu Scheme, Mumbai - 400049
              </li>
              <li>
                <strong className="text-stone-300 font-medium">Kolkata (Alipore):</strong> <br />
                Ashutosh Chowdhury Ave, Ballygunge, Kolkata - 700019
              </li>
            </ul>
          </div>

          {/* Column 3: Atelier Hours */}
          <div className="space-y-4">
            <h5 className="font-serif text-sm uppercase text-white tracking-widest font-medium">
              Atelier Appointments
            </h5>
            <ul className="space-y-2 text-xs font-sans text-stone-400 font-light">
              <li>
                <strong className="text-stone-300 font-medium">Monday - Sunday:</strong> <br />
                11:00 AM – 8:00 PM IST
              </li>
              <li className="pt-2">
                <span className="text-[#d4af37] font-medium">Private Previews:</span> <br />
                Schedule a private showroom preview or digital walkthrough with our design directors.
              </li>
            </ul>
          </div>

          {/* Column 4: Links */}
          <div className="space-y-4">
            <h5 className="font-serif text-sm uppercase text-white tracking-widest font-medium">
              Quick Navigation
            </h5>
            <div className="grid grid-cols-2 gap-2 text-xs font-sans tracking-wider uppercase text-stone-400">
              <a href="#majestic-invites" className="hover:text-white transition-colors">
                Invitations
              </a>
              <a href="#return-favors" className="hover:text-white transition-colors">
                Return Favors
              </a>
              <a href="#bespoke-cards" className="hover:text-white transition-colors">
                Bespoke Boxes
              </a>
              <a href="#video-gallery" className="hover:text-white transition-colors">
                Videos
              </a>
              <a href="#brand-story" className="hover:text-white transition-colors">
                Who We Are
              </a>
              <a href="#ai-luxe-curator" className="hover:text-white transition-colors text-[#d4af37]">
                AI Curator
              </a>
            </div>
          </div>
        </div>

        {/* Footer Base */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16 pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row justify-between items-center text-xs text-stone-500 font-sans gap-4">
          <p>© {new Date().getFullYear()} Ekaani Wedding Living. All Rights Reserved.</p>
          <div className="flex items-center gap-1.5 text-stone-600">
            <span>Crafted for</span>
            <a href="https://ekaani.com" target="_blank" rel="noopener noreferrer" className="text-[#d4af37] hover:underline transition-all duration-200">Ekaani.com</a>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-stone-300">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-stone-300">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Wati Connection Credentials Modal Panel */}
      <WatiConfigModal
        isOpen={watiModalOpen}
        onClose={() => setWatiModalOpen(false)}
      />

      {/* Slim Bottom Sheet Enquiry Form Drawer */}
      <SlimEnquiryDrawer
        isOpen={slimDrawerOpen}
        onClose={() => setSlimDrawerOpen(false)}
        presetCategory={slimDrawerPreset}
      />

      {/* Floating Interactive WhatsApp Chat Widget with Wati OTP */}
      <WhatsAppChatWidget />
    </div>
  );
}
