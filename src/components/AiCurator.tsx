import React, { useState } from "react";
import { Sparkles, Gift, Compass, Loader2, ClipboardCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { CurationResponse } from "../types";

export default function AiCurator() {
  const [budgetRange, setBudgetRange] = useState("₹3,000 - ₹5,000");
  const [guestCount, setGuestCount] = useState(250);
  const [giftType, setGiftType] = useState("Both");
  const [theme, setTheme] = useState("Royal Mughal Gold");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [curation, setCuration] = useState<CurationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedSnippetIndex, setCopiedSnippetIndex] = useState<number | null>(null);

  const [loadingStatus, setLoadingStatus] = useState("");

  const statusMessages = [
    "Contacting Ekaani's private archives...",
    "Selecting premium sterling silverware...",
    "Forging custom filigree invitation box layouts...",
    "Drafting elegant Vedic-inspired wedding card wording...",
    "Finalizing your bespoke Ekaani Luxe Dossier..."
  ];

  const handleCurate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setCuration(null);

    // Rotate status messages for sensory immersion
    let statusIndex = 0;
    setLoadingStatus(statusMessages[0]);
    const statusInterval = setInterval(() => {
      statusIndex = (statusIndex + 1) % statusMessages.length;
      setLoadingStatus(statusMessages[statusIndex]);
    }, 1800);

    try {
      const response = await fetch("/api/curate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          budgetRange,
          guestCount,
          giftType,
          theme,
          notes,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData?.error || "Curation failed.");
      }

      const data: CurationResponse = await response.json();
      setCuration(data);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Something went wrong. Please check your network or try again.");
    } finally {
      clearInterval(statusInterval);
      setLoading(false);
    }
  };

  const handleCopyWording = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippetIndex(index);
    setTimeout(() => setCopiedSnippetIndex(null), 3000);
  };

  return (
    <section id="ai-luxe-curator" className="py-24 bg-stone-50/15 backdrop-blur-[0.5px] border-b border-stone-200/30 relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-blue-100/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#d4af37]/5 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/25 text-[10px] uppercase tracking-widest text-[#aa7c11] font-bold">
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Interactive Luxury Gifting Experience</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 tracking-wide font-light">
            Ekaani Luxe Curator Assistant
          </h2>
          <div className="flex justify-center items-center gap-2">
            <span className="w-12 h-[1px] bg-stone-300" />
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <span className="w-12 h-[1px] bg-stone-300" />
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-stone-500 font-sans font-medium">
            Curate Perfect Return Gifts & Invitation Box Concepts in Real-Time
          </p>
        </div>

        {/* Curator Main Board */}
        <div className="bg-white border border-stone-200/80 shadow-xl p-6 md:p-10 relative">
          
          <form onSubmit={handleCurate} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Wedding Theme */}
              <div className="flex flex-col text-left space-y-2">
                <label className="text-xs uppercase tracking-widest text-stone-500 font-sans font-semibold">
                  Wedding Theme & Colorway *
                </label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="border border-stone-300 p-3 text-stone-800 focus:outline-none focus:border-[#d4af37] bg-stone-50 text-sm font-sans"
                >
                  <option value="Royal Mughal Gold">Royal Mughal Gold & Deep Crimson</option>
                  <option value="Regal Rajput Silver">Regal Rajput Silver & Royal Blue</option>
                  <option value="Modern Pastel Floral">Modern Pastel Floral & Champagne Gold</option>
                  <option value="Vedic Sanctuary Ochre">Vedic Sanctuary Ochre & Clay</option>
                  <option value="Minimalist Ivory Contemporary">Minimalist Ivory Contemporary</option>
                </select>
              </div>

              {/* Budget Range */}
              <div className="flex flex-col text-left space-y-2">
                <label className="text-xs uppercase tracking-widest text-stone-500 font-sans font-semibold">
                  Estimated Gifting Budget per Item *
                </label>
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="border border-stone-300 p-3 text-stone-800 focus:outline-none focus:border-[#d4af37] bg-stone-50 text-sm font-sans"
                >
                  <option value="₹1,000 - ₹3,000">₹1,000 - ₹3,000 (Charming Keepsakes)</option>
                  <option value="₹3,000 - ₹5,000">₹3,000 - ₹5,000 (Premium Platters & Boxes)</option>
                  <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000 (Intricate Silver & Sets)</option>
                  <option value="₹10,000 - ₹20,000">₹10,000 - ₹20,000 (Supreme Italian Luxury)</option>
                </select>
              </div>

              {/* Guest Count */}
              <div className="flex flex-col text-left space-y-2">
                <label className="text-xs uppercase tracking-widest text-stone-500 font-sans font-semibold">
                  Guest Count: <span className="text-stone-800 font-bold">{guestCount} Guests</span>
                </label>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="25"
                  value={guestCount}
                  onChange={(e) => setGuestCount(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
                />
                <div className="flex justify-between text-[10px] text-stone-400 font-sans tracking-wide">
                  <span>50 guests</span>
                  <span>500 guests</span>
                  <span>1000+ guests</span>
                </div>
              </div>

              {/* Curation Type */}
              <div className="flex flex-col text-left space-y-2">
                <label className="text-xs uppercase tracking-widest text-stone-500 font-sans font-semibold">
                  What should we curate? *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {["Favors", "Invites", "Both"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setGiftType(type)}
                      className={`py-3 text-xs uppercase font-sans tracking-widest font-semibold border transition-all ${
                        giftType === type
                          ? "bg-stone-900 border-stone-900 text-[#d4af37]"
                          : "border-stone-300 text-stone-600 bg-stone-50 hover:bg-stone-100"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Client Custom Preferences */}
            <div className="flex flex-col text-left space-y-2">
              <label className="text-xs uppercase tracking-widest text-stone-500 font-sans font-semibold">
                Custom Preferences, Motifs, or dietary guidelines (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="E.g., We love gold-embossed Ganesha motifs. Must include dry fruits. Keep it eco-friendly."
                rows={3}
                className="border border-stone-300 p-3 text-stone-800 focus:outline-none focus:border-[#d4af37] bg-stone-50 text-sm font-sans placeholder-stone-400"
              />
            </div>

            {/* Submission Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#d4af37] text-stone-950 hover:bg-stone-900 hover:text-white transition-luxury py-4 text-xs uppercase font-sans tracking-widest font-bold flex items-center justify-center gap-2 active:scale-98"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
                    <span>Generating Custom Dossier...</span>
                  </>
                ) : (
                  <>
                    <Compass className="w-4 h-4" />
                    <span>Generate Custom Curation</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Loading Dossier Simulation Overlay */}
          {loading && (
            <div className="absolute inset-0 bg-white/95 backdrop-blur-xs z-30 flex flex-col items-center justify-center p-6 space-y-6 animate-in fade-in duration-300">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 border-t-2 border-[#d4af37] rounded-full animate-spin" />
                <Compass className="w-10 h-10 text-[#d4af37] animate-pulse" />
              </div>
              <div className="text-center space-y-2 max-w-sm">
                <p className="font-serif text-lg text-stone-900">Ekaani Royal Atelier</p>
                <p className="text-xs text-[#aa7c11] font-sans tracking-widest uppercase font-semibold h-6">
                  {loadingStatus}
                </p>
                <p className="text-[11px] text-stone-400 italic">
                  Crafting a tailored luxury selection with premium design curation.
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-8 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-none text-left font-sans flex items-start gap-2">
              <span className="font-bold text-red-800">Curation Error:</span>
              <span>{error}</span>
            </div>
          )}

          {/* Luxury Curation Result Portfolio */}
          {curation && (
            <div className="mt-12 border-t-2 border-[#d4af37] pt-10 text-left space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
              
              {/* Concept Intro Card */}
              <div className="bg-[#fcfbf7] border border-[#d4af37]/20 p-6 md:p-8 space-y-3 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 text-stone-100 font-serif text-[120px] leading-none pointer-events-none select-none opacity-30">
                  ॐ
                </div>
                <div className="flex items-center gap-1.5 text-[#aa7c11] font-sans text-[10px] tracking-widest uppercase font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>Aesthetic Concept Concept</span>
                </div>
                <p className="font-serif text-xl md:text-2xl text-stone-900 leading-relaxed font-light">
                  "{curation.themeConcept}"
                </p>
              </div>

              {/* Suggested Return Favors Grid */}
              {curation.suggestedGifts && curation.suggestedGifts.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Gift className="w-5 h-5 text-[#d4af37]" />
                    <h4 className="font-serif text-xl text-stone-900 tracking-wide">
                      Curated Wedding Return Favors
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {curation.suggestedGifts.map((gift, index) => (
                      <div
                        key={index}
                        className="border border-stone-200/80 p-5 bg-[#fcfbf7]/20 relative hover:border-[#d4af37]/40 transition-colors duration-300"
                      >
                        <span className="absolute top-4 right-4 text-[10px] font-medium text-[#aa7c11] font-sans">
                          {gift.estimatedPrice || "Bespoke pricing"}
                        </span>
                        <div className="space-y-2 pt-2">
                          <h5 className="font-serif text-base text-stone-900 pr-16">{gift.name}</h5>
                          <p className="text-[9px] uppercase tracking-wider text-stone-400 font-sans font-semibold">
                            Material: {gift.material}
                          </p>
                          <p className="text-xs text-stone-600 font-light leading-relaxed">
                            {gift.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggested Invitation Concepts */}
              {curation.suggestedInvites && curation.suggestedInvites.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#d4af37]" />
                    <h4 className="font-serif text-xl text-stone-900 tracking-wide">
                      Bespoke Invitation Presentation Suites
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {curation.suggestedInvites.map((invite, index) => (
                      <div
                        key={index}
                        className="border border-stone-200/80 p-6 bg-[#fcfbf7]/30 flex flex-col justify-between hover:border-[#d4af37]/40 transition-colors duration-300 space-y-4"
                      >
                        <div className="space-y-2">
                          <h5 className="font-serif text-lg text-stone-900">{invite.style}</h5>
                          <p className="text-xs text-stone-600 font-light leading-relaxed">
                            <strong className="text-stone-800 font-normal">Design & Construction:</strong> {invite.details}
                          </p>
                          <p className="text-xs text-stone-600 font-light leading-relaxed">
                            <strong className="text-stone-800 font-normal">Unboxing Experience:</strong> {invite.unboxingExperience}
                          </p>
                        </div>

                        {/* Custom Copyable Wedding Card Text Card */}
                        <div className="bg-stone-100 border border-stone-200 p-4 relative space-y-2 rounded-none mt-4">
                          <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                            <span className="text-[8px] uppercase tracking-widest text-[#aa7c11] font-sans font-bold">
                              Sample Card Wording
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopyWording(invite.wordingSnippet, index)}
                              className="text-[9px] tracking-widest uppercase font-sans text-[#aa7c11] hover:text-stone-900 transition-colors flex items-center gap-1 font-semibold"
                            >
                              {copiedSnippetIndex === index ? (
                                <>
                                  <CheckCircle2 className="w-3 h-3 text-green-600" />
                                  <span className="text-green-600">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <ClipboardCheck className="w-3 h-3" />
                                  <span>Copy Template</span>
                                </>
                              )}
                            </button>
                          </div>
                          <p className="font-serif italic text-xs text-stone-700 leading-relaxed whitespace-pre-line text-center py-2 max-h-32 overflow-y-auto">
                            {invite.wordingSnippet}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Expert Director's Tip */}
              <div className="border-l-4 border-[#d4af37] bg-stone-100 p-5 pl-6">
                <h5 className="text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold">
                  Expert Director's Consultation Note
                </h5>
                <p className="font-serif italic text-stone-800 text-sm md:text-base leading-relaxed mt-2">
                  "{curation.expertTip}"
                </p>
              </div>

              {/* dossier conversion block */}
              <div className="bg-stone-900 text-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-left space-y-1.5">
                  <h5 className="font-serif text-lg text-[#d4af37]">Love these recommendations?</h5>
                  <p className="text-xs text-stone-300 font-sans leading-relaxed max-w-xl font-light">
                    Have these exact concepts printed, manufactured, and boxed in real wood, velvet, or solid silver. Speak directly to our design director to lock in dates and secure exclusive international pricing.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const formElement = document.getElementById("enquiry-form");
                    if (formElement) {
                      formElement.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="bg-[#d4af37] text-stone-950 px-6 py-3 text-xs uppercase font-sans tracking-widest font-bold flex items-center gap-1.5 hover:bg-white transition-colors"
                >
                  <span>Book Atelier Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </section>
  );
}
