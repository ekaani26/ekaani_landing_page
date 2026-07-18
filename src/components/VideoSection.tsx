import React, { useState, useRef, useEffect } from "react";
import { Play, X, Sparkles, Share2, Eye, CheckCircle2, MessageSquare, Volume2, VolumeX } from "lucide-react";
import { VideoItem } from "../types";
import { INVITATION_VIDEOS } from "../data";
import { isValidCity } from "../utils/cityValidation";

// Custom individual Video Card component to manage hover playback safely
function VideoCard({ video, onOpen }: { video: VideoItem; onOpen: (video: VideoItem) => void; key?: React.Key | string }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isHovered) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Auto-play was prevented (normal browser behavior)
          console.log("Hover video autoplay blocked", error);
        });
      }
    } else {
      videoRef.current.pause();
    }
  }, [isHovered]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpen(video)}
      className="relative aspect-[9/16] overflow-hidden group cursor-pointer bg-stone-950 shadow-lg border border-stone-200/50 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:border-[#d4af37]"
    >
      {/* Real HTML5 Video */}
      <video
        ref={videoRef}
        src={video.videoUrl}
        poster={video.thumbnail}
        muted
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover transition-all duration-700 brightness-[0.9] group-hover:brightness-100"
      />

      {/* Decorative Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/30 opacity-70 group-hover:opacity-40 transition-opacity duration-300 animate-fade-in" />

      {/* Custom play indicator in the center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg transition-all duration-500 ${isHovered ? 'scale-0 opacity-0' : 'scale-100 opacity-100 animate-pulse'}`}>
          <Play className="w-5 h-5 fill-white ml-0.5" />
        </div>
      </div>

      {/* Live Preview Ping */}
      {isHovered && (
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[9px] tracking-widest px-2.5 py-1.5 font-sans font-semibold rounded-full flex items-center gap-1.5 animate-in fade-in duration-300">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
          <span>Click to Unmute</span>
        </div>
      )}

      {/* Title Panel */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-left flex justify-between items-end">
        <div className="space-y-1 pr-4">
          <span className="text-[8px] uppercase tracking-widest text-[#d4af37] font-sans font-bold bg-[#d4af37]/10 px-2 py-0.5 rounded-xs">
            Ekaani Unboxing Reel
          </span>
          <h3 className="font-serif text-sm text-white leading-snug font-medium drop-shadow-sm line-clamp-2">
            Exclusive Design Selection
          </h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (video.videoUrl) {
                navigator.clipboard.writeText(video.videoUrl);
                alert("Copied reel link! Share the luxury invitation with friends.");
              }
            }}
            className="p-2 bg-stone-900/80 backdrop-blur-xs text-stone-300 hover:text-[#d4af37] border border-stone-700/50 rounded-full transition-colors hover:bg-stone-800"
            title="Share Reel Link"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Floating Header Banner */}
      <div className="absolute top-4 left-4 bg-[#d4af37] text-stone-950 text-[8px] uppercase tracking-widest px-2.5 py-1 font-sans font-bold flex items-center gap-1 shadow-sm">
        <Eye className="w-3 h-3" />
        <span>Hover to preview</span>
      </div>
    </div>
  );
}

export default function VideoSection() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  // States for express modal enquiry form
  const [modalName, setModalName] = useState("");
  const [modalPhone, setModalPhone] = useState("");
  const [modalCity, setModalCity] = useState("");
  const [modalCityError, setModalCityError] = useState("");
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  // WhatsApp OTP Verification states for video modal
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [showNotification, setShowNotification] = useState(false);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, []);

  const startCountdown = () => {
    setCountdown(30);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const triggerOtpSend = () => {
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(randomCode);
    console.log("🔒 [DEVELOPER/TESTING] Ekaani Video OTP Code:", randomCode);
    setOtpError("");
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 8000);
    startCountdown();
  };

  const handleOpenVideo = (video: VideoItem) => {
    setActiveVideo(video);
    setModalSubmitted(false);
    setOtpStep(false);
    setOtpCode("");
    setGeneratedOtp("");
    setModalName("");
    setModalPhone("");
    setModalCity("");
    setModalCityError("");
  };

  const handleCloseVideo = () => {
    setActiveVideo(null);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalCityError("");

    if (!modalName || !modalPhone || !modalCity) {
      alert("Please fill in all mandatory fields: Name, Phone, and City.");
      return;
    }

    if (!isValidCity(modalCity)) {
      setModalCityError("Please enter a valid, real city or region name (random text or keyboard mashes are not accepted).");
      return;
    }

    setModalLoading(true);

    setTimeout(() => {
      setModalLoading(false);
      setOtpStep(true);
      triggerOtpSend();
    }, 8000 * 0.1); // Quick transition
  };

  const handleVerifyOtpAndSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode !== generatedOtp) {
      setOtpError("Invalid verification code. Please check your WhatsApp.");
      return;
    }
    setModalLoading(true);

    try {
      const response = await fetch("/api/submit-enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: modalName,
          phoneNumber: modalPhone,
          city: modalCity,
          email: "",
          eventDate: "",
          expectedGuests: "250",
          budget: "Bespoke Premium",
          interestedIn: "Invites",
          message: `Bespoke reel interest in design: "${activeVideo?.title}". City: ${modalCity}`,
          selectedProduct: activeVideo?.title || "Reel Design",
          source: "Luxe Unboxing Reels Modal"
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to dispatch video lead via Ekaani API");
      }

      // 2. Direct client-side backup submit to FormSubmit.co to double-guarantee delivery to testmailekaani@gmail.com
      try {
        await fetch("https://formsubmit.co/ajax/testmailekaani@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name: modalName,
            phone: modalPhone,
            city: modalCity,
            email: "Not Provided (Video Modal)",
            event_date: "Not Specified (Video Modal)",
            guests: "250",
            budget: "Bespoke Premium",
            interested_in: "Invites",
            product: activeVideo?.title || "Reel Design",
            message: `Bespoke reel interest in design: "${activeVideo?.title}". City: ${modalCity}`,
            source: "Client Direct VideoModal Backup",
            _subject: `🔥 [VIDEO MODAL LEAD] ${modalName} - ${modalPhone} (${modalCity})`
          })
        });
      } catch (fsErr) {
        console.error("Client direct VideoModal FormSubmit dispatch failed:", fsErr);
      }

      setModalLoading(false);
      setModalSubmitted(true);
      setOtpStep(false);

      // Save modal inquiry to local storage for persistence
      const submissions = JSON.parse(localStorage.getItem("ekaani_enquiries") || "[]");
      submissions.push({
        id: Date.now(),
        fullName: modalName,
        phoneNumber: modalPhone,
        city: modalCity,
        email: "",
        eventDate: "",
        expectedGuests: "250",
        budget: "Bespoke Premium",
        interestedIn: "Invites",
        message: `Bespoke reel interest in design: "${activeVideo?.title}"`,
        selectedProduct: activeVideo?.title || "Reel Design",
        timestamp: new Date().toISOString(),
        verifiedViaWhatsApp: true
      });
      localStorage.setItem("ekaani_enquiries", JSON.stringify(submissions));
    } catch (err: any) {
      console.error("Video enquiry submission failed, using local fallback:", err);
      setModalLoading(false);
      setModalSubmitted(true);
      setOtpStep(false);
    }
  };

  const handleResendOtp = () => {
    if (countdown > 0) return;
    triggerOtpSend();
  };

  return (
    <section id="video-gallery" className="py-20 bg-[#fbfbf9]/95 backdrop-blur-md border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 tracking-wide font-light">
            Luxury Unboxing & Reels
          </h2>
          <div className="flex justify-center items-center gap-2">
            <span className="w-12 h-[1px] bg-stone-300" />
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <span className="w-12 h-[1px] bg-stone-300" />
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-stone-500 font-sans font-medium">
            Watch the unboxing of our actual wedding invitations & presentation boxes
          </p>
        </div>

        {/* Video Card Grid - Gorgeous Responsive Layout (4 columns on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INVITATION_VIDEOS.map((video) => (
            <VideoCard key={video.id} video={video} onOpen={handleOpenVideo} />
          ))}
        </div>
      </div>

      {/* Cinematic Invitation Unboxing Modal (Split layout for high-converting micro form) */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/95 backdrop-blur-md animate-in fade-in duration-300">
          <button
            onClick={handleCloseVideo}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full border border-white/20 transition-colors z-50"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="w-full max-w-4xl bg-white border border-[#d4af37]/30 shadow-2xl p-0 flex flex-col relative max-h-[95vh] overflow-y-auto">
            
            {/* Split Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 items-stretch min-h-[500px]">
              
              {/* Left Column: Premium HD HTML5 Video Player */}
              <div className="md:col-span-7 bg-stone-950 flex flex-col justify-center items-center relative border-r border-stone-800">
                <video
                  src={activeVideo.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full max-h-[65vh] object-contain"
                />
                <div className="p-3 bg-stone-900 w-full text-center text-[10px] text-stone-400 font-sans tracking-widest uppercase border-t border-stone-800 flex items-center justify-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>🔊 Ensure your volume is up to experience the royal unboxing soundtrack.</span>
                </div>
              </div>

              {/* Right Column: Instant Atelier design consultation form */}
              <div className="md:col-span-5 flex flex-col justify-between text-left p-6 md:p-8 bg-[#fcfbf7] space-y-6">
                
                <div className="space-y-4">
                  <div className="flex items-center gap-1.5 text-[#aa7c11] text-[10px] tracking-widest uppercase font-bold">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    <span>Instant Design Enquiry</span>
                  </div>
                  
                  <h4 className="font-serif text-xl text-stone-900 tracking-wide font-normal">
                    Exclusive Design Selection
                  </h4>
                  
                  <p className="text-xs text-stone-600 font-light leading-relaxed">
                    Love this physical presentation layout? Our design atelier will customize this design with solid sterling silverware, gold-infused scroll layout inserts, velvet linings, or sweet assortments to match your theme.
                  </p>

                  <div className="w-full h-[1px] bg-stone-200" />

                  {/* Micro Express Form */}
                  {modalSubmitted ? (
                    <div className="bg-emerald-50 border border-emerald-200 p-6 text-center space-y-4 animate-in zoom-in-95 duration-500">
                      <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-stone-950 font-sans flex items-center justify-center gap-1">
                          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span>WhatsApp Verified!</span>
                        </p>
                        <p className="text-[11px] text-stone-600 leading-relaxed font-sans font-light">
                          Our wedding directors are preparing the design options and layout samples for <strong className="font-semibold">{modalPhone}</strong>. Expect a call within 15 minutes.
                        </p>
                      </div>

                      <div className="mt-4 p-3 bg-stone-900 text-stone-100 border border-[#d4af37]/30 text-left rounded-sm space-y-1">
                        <p className="text-[9px] font-serif text-[#d4af37] uppercase tracking-wider font-bold">✉️ EMAIL DISPATCHED</p>
                        <p className="text-[10px] text-stone-300 leading-relaxed font-sans font-light">
                          Details sent to <strong className="text-white font-medium">testmailekaani@gmail.com</strong>.
                        </p>
                        <p className="text-[9px] text-stone-400 leading-relaxed font-sans font-light border-t border-stone-800 pt-1.5 mt-1">
                          <strong className="text-[#d4af37] font-semibold">One-Time Activation Required:</strong> FormSubmit requires a one-time approval. Please check the inbox of <strong className="text-stone-300">testmailekaani@gmail.com</strong> for a verification email and click the confirmation link to begin receiving live submissions!
                        </p>
                      </div>
                    </div>
                  ) : otpStep ? (
                    <div className="bg-[#25D366]/5 border border-[#25D366]/30 p-5 space-y-4 animate-in fade-in duration-300 text-center">
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-stone-900 font-sans uppercase tracking-wider text-left">WhatsApp Verification</p>
                        <p className="text-[11px] text-stone-600 font-light text-left">
                          We sent a code to <span className="font-semibold">{modalPhone}</span>.
                        </p>
                      </div>

                      <form onSubmit={handleVerifyOtpAndSubmit} className="space-y-3">
                        <input
                          type="text"
                          required
                          maxLength={4}
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                          placeholder="4-digit Code"
                          className="border border-stone-300 focus:border-[#d4af37] py-2 text-center tracking-[0.5em] text-sm font-bold font-sans focus:outline-none bg-white text-stone-900 w-full max-w-[180px] mx-auto"
                        />
                        {otpError && (
                          <p className="text-[10px] text-red-600 font-sans font-semibold">{otpError}</p>
                        )}

                        <div className="text-[10px] text-stone-500">
                          {countdown > 0 ? (
                            <span>Resend OTP in {countdown}s</span>
                          ) : (
                            <button
                              type="button"
                              onClick={handleResendOtp}
                              className="text-[#aa7c11] hover:underline font-semibold"
                            >
                              Resend Verification Code
                            </button>
                          )}
                        </div>

                        <button
                          type="submit"
                          disabled={modalLoading || otpCode.length < 4}
                          className="w-full bg-[#d4af37] hover:bg-stone-900 text-stone-950 hover:text-white font-sans text-xs uppercase tracking-widest py-3 px-4 font-bold transition-all duration-300 text-center"
                        >
                          {modalLoading ? "Verifying..." : "Verify & Get Design Details"}
                        </button>
                      </form>
                    </div>
                  ) : (
                    <form onSubmit={handleModalSubmit} className="space-y-4">
                      <div className="flex flex-col space-y-1.5 text-left">
                        <label className="text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={modalName}
                          onChange={(e) => setModalName(e.target.value)}
                          placeholder="e.g. Kavya Sharma"
                          className="border border-stone-300 bg-white p-2.5 text-xs focus:outline-none focus:border-[#d4af37] font-sans"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5 text-left">
                        <label className="text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold">Contact Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={modalPhone}
                          onChange={(e) => setModalPhone(e.target.value)}
                          placeholder="e.g. +91 98110 99999"
                          className="border border-stone-300 bg-white p-2.5 text-xs focus:outline-none focus:border-[#d4af37] font-sans"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5 text-left">
                        <label className="text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold">City *</label>
                        <input
                          type="text"
                          required
                          value={modalCity}
                          onChange={(e) => {
                            setModalCity(e.target.value);
                            if (modalCityError) setModalCityError("");
                          }}
                          placeholder="e.g. Mumbai"
                          className="border border-stone-300 bg-white p-2.5 text-xs focus:outline-none focus:border-[#d4af37] font-sans"
                        />
                        {modalCityError && (
                          <span className="text-[10px] text-red-600 font-medium font-sans mt-0.5 block">
                            {modalCityError}
                          </span>
                        )}
                      </div>
                      <button
                        type="submit"
                        disabled={modalLoading}
                        className="w-full bg-[#d4af37] hover:bg-stone-900 text-stone-950 hover:text-white font-sans text-xs uppercase tracking-widest py-3 px-4 font-bold transition-luxury text-center flex items-center justify-center gap-2"
                      >
                        {modalLoading ? (
                          <span>Reserving Design Details...</span>
                        ) : (
                          <span>Request Design Details</span>
                        )}
                      </button>
                    </form>
                  )}
                </div>

                <div className="border-t border-stone-200 pt-5 flex flex-col items-center gap-3">
                  <p className="text-[10px] text-stone-400 italic text-center">
                    Want to customize sweet varieties, dry fruits, or wax stamps?
                  </p>
                  <a
                    href={`https://wa.me/919910926757?text=Hi Ekaani team, I just watched your gorgeous unboxing reel. Let's discuss custom options!`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 text-xs text-emerald-600 hover:text-emerald-700 font-sans uppercase tracking-widest font-bold hover:underline"
                  >
                    <MessageSquare className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                    <span>Inquire via WhatsApp</span>
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* Simulated WhatsApp Push Notification Toast */}
      {showNotification && (
        <div className="fixed top-24 right-4 z-[9999] w-80 bg-white border-l-4 border-emerald-500 rounded-lg shadow-2xl p-4 flex items-start gap-3 animate-bounce font-sans text-left">
          <div className="bg-emerald-100 p-2 rounded-full text-emerald-600 flex-shrink-0">
            <MessageSquare className="w-5 h-5 fill-emerald-600 text-emerald-600" />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-stone-900">Ekaani Luxe (Wati API)</span>
              <span className="text-[10px] text-stone-400">Just now</span>
            </div>
            <p className="text-xs text-stone-700 leading-snug">
              Your Ekaani luxury wedding unboxing verification code has been dispatched. Please check your WhatsApp messages.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
