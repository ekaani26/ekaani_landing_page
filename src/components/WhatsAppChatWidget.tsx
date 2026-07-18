import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle2, MessageSquare, AlertCircle } from "lucide-react";
import { isValidCity } from "../utils/cityValidation";

export default function WhatsAppChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("91");
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");
  const [occasion, setOccasion] = useState<"Wedding" | "Anniversary" | "Reception" | "Corporate" | "Festival" | "Other">("Wedding");
  const [budget, setBudget] = useState<"₹500 - ₹1,000" | "₹1,000 - ₹3,000" | "₹3,000 - ₹5,000" | "₹5,000 - ₹10,000" | "₹10,000+">("₹1,000 - ₹3,000");

  // OTP Verification States
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [countdown, setCountdown] = useState(0);

  // Status and Toasts
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showRealWatiToast, setShowRealWatiToast] = useState(false);

  useEffect(() => {
    let timer: any;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const startCountdown = () => {
    setCountdown(60);
  };

  const triggerOtpSend = async () => {
    // Generate a 4-digit verification code
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(randomCode);
    console.log("🔒 [DEVELOPER/TESTING] WhatsApp Widget OTP Code:", randomCode);
    setOtpError("");

    const realWatiEnabled = localStorage.getItem("wati_otp_enabled") !== "false";

    if (realWatiEnabled) {
      const watiUrl = localStorage.getItem("wati_api_url") || "https://live-mt-server.wati.io/5680/api/v1/sendTemplateMessage";
      const watiAuthToken = localStorage.getItem("wati_auth_token") || "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkVrYWFuaW5vcml0YWtlQGdtYWlsLmNvbSIsIm5hbWVpZCI6IkVrYWFuaW5vcml0YWtlQGdtYWlsLmNvbSIsImVtYWlsIjoiRWthYW5pbm9yaXRha2VAZ21haWwuY29tIiwiYXV0aF90aW1lIjoiMDcvMTcvMjAyNiAwNzoxNTo1NiIsInRlbmFudF9pZCI6IjU2ODAiLCJkYl9uYW1lIjoibXQtcHJvZC1UZW5hbnRzIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQURNSU5JU1RSQVRPUiIsImV4cCI6MjUzNDAyMzAwODAwLCJpc3MiOiJDbGFyZV9BSSIsImF1ZCI6IkNsYXJlX0FJIn0.QghUssvs5d0XBPvUvymUfY6zpfuJLWEwhYrseKrpcYE";
      let templateName = localStorage.getItem("wati_template_name") || "otp_template_2";
      if (templateName === "ekaani_otp") {
        templateName = "otp_template_2";
      }
      let parameterName = localStorage.getItem("wati_parameter_name") || "1";
      if (parameterName === "otp") {
        parameterName = "1";
      }
      const broadcastName = localStorage.getItem("wati_broadcast_name") || "Ekaani Luxe Verification";

      try {
        console.log("WhatsApp Chat: sending OTP via Wati API to:", phoneNumber);
        const response = await fetch("/api/send-wati-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            watiUrl,
            watiAuthToken,
            templateName,
            broadcastName,
            phoneNumber,
            otpCode: randomCode,
            parameterName,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          console.error("WhatsApp Chat: Wati API fail:", data);
          setOtpError("Wati API gateway connection issue. Displaying simulated alert.");
          triggerSimulatedNotification();
        } else {
          console.log("WhatsApp Chat: OTP sent successfully!", data);
          setShowRealWatiToast(true);
          setTimeout(() => setShowRealWatiToast(false), 8000);
        }
      } catch (err: any) {
        console.error("WhatsApp Chat: API network failure", err);
        setOtpError("Wati API connection error. Displaying simulated alert.");
        triggerSimulatedNotification();
      }
    } else {
      triggerSimulatedNotification();
    }

    startCountdown();
  };

  const triggerSimulatedNotification = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 8000);
  };

  const handlePreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCityError("");

    if (!fullName || !phoneNumber || !city) {
      alert("Please fill in all mandatory fields: Name, Phone, and City.");
      return;
    }

    if (!isValidCity(city)) {
      setCityError("Please enter a valid, real city or region name (random text or keyboard mashes are not accepted).");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpStep(true);
      triggerOtpSend();
    }, 800);
  };

  const handleVerifyOtpAndSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otpCode !== generatedOtp) {
      setOtpError("Invalid verification code. Please check your WhatsApp or click resend.");
      return;
    }

    setLoading(true);

    try {
      // 1. Submit lead details to our local express server
      const response = await fetch("/api/submit-enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          phoneNumber,
          city,
          budget,
          interestedIn: occasion,
          message: `Requested consultation via WhatsApp Quick Chat. Occasion: ${occasion}. City: ${city}`,
          source: "WhatsApp Floating Widget"
        }),
      });

      // 2. Client-side backup submit to FormSubmit.co to double-guarantee delivery to testmailekaani@gmail.com
      try {
        await fetch("https://formsubmit.co/ajax/testmailekaani@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name: fullName,
            phone: phoneNumber,
            city,
            budget,
            occasion,
            source: "WhatsApp Quick Chat Widget Backup",
            _subject: `💬 [WHATSAPP CHAT LEAD] ${fullName} - ${phoneNumber} (${city})`
          })
        });
      } catch (fsErr) {
        console.error("FormSubmit quick chat backup failed:", fsErr);
      }

      setLoading(false);
      setSubmitted(true);
      setOtpStep(false);

      // Save to local storage persistence
      const submissions = JSON.parse(localStorage.getItem("ekaani_enquiries") || "[]");
      submissions.push({
        id: Date.now(),
        fullName,
        phoneNumber,
        city,
        budget,
        occasion,
        timestamp: new Date().toISOString(),
        verifiedViaWhatsApp: true,
        source: "WhatsApp Floating Widget"
      });
      localStorage.setItem("ekaani_enquiries", JSON.stringify(submissions));

      // Trigger redirect to WhatsApp with custom prefilled text
      const textMessage = `Hi Ekaani team,\n\nI have verified my number via Wati OTP and would like to consult with an expert.\n\nHere are my details:\n• *Name*: ${fullName}\n• *Phone*: ${phoneNumber}\n• *City*: ${city}\n• *Occasion*: ${occasion}\n• *Budget Selection*: ${budget}\n\nPlease guide me with the luxury invitation and favors catalogs.`;
      const encodedText = encodeURIComponent(textMessage);
      const whatsappUrl = `https://wa.me/919910926757?text=${encodedText}`;

      // Open in a new window or standard redirect
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    } catch (err) {
      console.error("Failed to submit quick lead", err);
      setLoading(false);
      setOtpError("Error submitting inquiry. Let's try redirecting to WhatsApp directly!");
      
      // Fallback redirect anyway
      const textMessage = `Hi Ekaani team,\n\nMy name is ${fullName}. I am from ${city}. I am planning a ${occasion} with a budget preference of ${budget}. Please share catalogs.`;
      window.open(`https://wa.me/919910926757?text=${encodeURIComponent(textMessage)}`, "_blank");
    }
  };

  const handleResendOtp = () => {
    triggerOtpSend();
  };

  return (
    <>
      {/* Real-time Simulated Notification Alert (Toast) for simulated environments */}
      {showNotification && (
        <div className="fixed top-24 right-4 md:right-8 z-[110000] max-w-sm bg-stone-900 text-stone-100 p-4 border-l-4 border-[#d4af37] shadow-2xl flex items-start gap-3 animate-in slide-in-from-right duration-500 rounded-sm">
          <div className="bg-[#d4af37]/20 p-2 rounded-full text-[#d4af37] shrink-0 mt-0.5">
            <MessageSquare className="w-5 h-5 fill-current" />
          </div>
          <div className="flex-1 text-left font-sans">
            <p className="text-xs text-stone-400 uppercase tracking-widest font-semibold">WhatsApp Gateway Simulator</p>
            <p className="text-xs text-white font-medium mt-1">Ekaani Luxury Atelier OTP</p>
            <p className="text-xs text-stone-300 mt-1.5 leading-relaxed">
              Your quick-chat verification code has been dispatched. Please check your WhatsApp messages.
            </p>
          </div>
          <button onClick={() => setShowNotification(false)} className="text-stone-500 hover:text-white shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Real Wati Message Dispatched Success Toast */}
      {showRealWatiToast && (
        <div className="fixed top-24 right-4 md:right-8 z-[110000] max-w-sm bg-emerald-950 text-white p-4 border-l-4 border-emerald-400 shadow-2xl flex items-start gap-3 animate-in slide-in-from-right duration-500 rounded-none">
          <div className="bg-emerald-800 p-2 rounded-full text-emerald-300 shrink-0 mt-0.5 animate-pulse">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1 text-left font-sans">
            <p className="text-xs text-emerald-400 uppercase tracking-widest font-semibold">Wati API Gateway</p>
            <p className="text-xs font-semibold mt-1">Real WhatsApp OTP Sent!</p>
            <p className="text-xs text-stone-200 mt-1 leading-relaxed">
              We just triggered your template on <span className="font-semibold">{phoneNumber}</span>. Please verify using the code sent to your WhatsApp.
            </p>
          </div>
          <button onClick={() => setShowRealWatiToast(false)} className="text-stone-400 hover:text-white shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Floating Chat Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[2147483647] w-14 h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center bg-white border border-[#d4af37]/40 group overflow-hidden"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          transform: "translate3d(0, 0, 0)",
          WebkitTransform: "translate3d(0, 0, 0)",
          willChange: "transform",
        }}
        title="Consult with WhatsApp Expert"
        id="whatsapp-floating-btn"
      >
        <img
          src="https://cdn.shopify.com/s/files/1/0748/5014/0446/files/whatsapp.png?v=1784201905"
          alt="WhatsApp Chat"
          className="w-full h-full object-cover rounded-full p-0.5"
          referrerPolicy="no-referrer"
        />
        <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 text-[8px] text-white font-bold items-center justify-center">1</span>
        </span>
      </button>

      {/* Chat Popover Form */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-6 z-[2147483647] w-[295px] max-w-[calc(100vw-32px)] bg-white border border-stone-200 shadow-2xl rounded-xl overflow-hidden animate-in slide-in-from-bottom duration-300 font-sans text-left"
          style={{
            position: "fixed",
            bottom: "88px",
            right: "24px",
            transform: "translate3d(0, 0, 0)",
            WebkitTransform: "translate3d(0, 0, 0)",
            willChange: "transform",
          }}
          id="whatsapp-chat-popover"
        >
          {/* Header */}
          <div className="bg-stone-900 text-white p-3 flex items-center justify-between border-b border-[#d4af37]/20">
            <div className="flex items-center gap-2">
              <div className="relative">
                <img
                  src="https://cdn.shopify.com/s/files/1/0748/5014/0446/files/Layer_x0020_1_83f4e6f8-cf11-4a6c-9d21-9bb72e6775d8.svg?v=1683268225"
                  alt="Ekaani Logo"
                  className="w-6 h-6 object-contain invert brightness-200 bg-[#d4af37]/20 p-0.5 rounded-full"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-0 right-0 block h-1.5 w-1.5 rounded-full bg-emerald-500 ring-1 ring-stone-900" />
              </div>
              <div>
                <h4 className="font-serif text-xs font-semibold tracking-wider text-white">Ekaani Luxe Atelier</h4>
                <p className="text-[9px] text-stone-400 font-light">Online • Replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-white transition-colors p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-3.5 max-h-[380px] overflow-y-auto bg-stone-50/50">
            {submitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h5 className="font-serif text-stone-900 font-medium">WhatsApp Connected!</h5>
                  <p className="text-xs text-stone-500 px-4">
                    Your number has been verified via Wati OTP. Opening Ekaani Luxe chat on WhatsApp now...
                  </p>
                </div>
                <button
                  onClick={() => {
                    const textMessage = `Hi Ekaani team,\n\nI have verified my number via Wati OTP and would like to consult with an expert.\n\nHere are my details:\n• *Name*: ${fullName}\n• *Phone*: ${phoneNumber}\n• *Occasion*: ${occasion}\n• *Budget Selection*: ${budget}`;
                    window.open(`https://wa.me/919910926757?text=${encodeURIComponent(textMessage)}`, "_blank");
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2 px-4 rounded-full inline-flex items-center gap-2 shadow-sm transition-all"
                >
                  <img
                    src="https://cdn.shopify.com/s/files/1/0748/5014/0446/files/whatsapp.png?v=1784201905"
                    alt="WA"
                    className="w-4 h-4 rounded-full invert"
                    referrerPolicy="no-referrer"
                  />
                  <span>Reopen WhatsApp Chat</span>
                </button>
              </div>
            ) : otpStep ? (
              /* OTP Code Verification Form */
              <form onSubmit={handleVerifyOtpAndSubmit} className="space-y-4 py-2">
                <div className="bg-[#d4af37]/5 border border-[#d4af37]/20 p-3 rounded-lg text-xs text-stone-700 leading-relaxed text-center">
                  Enter the 4-digit verification OTP code dispatched to <span className="font-semibold text-stone-900">{phoneNumber}</span> via WhatsApp.
                </div>

                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">
                    Verification OTP Code
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    placeholder="e.g. 1234"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                    className="w-full text-center tracking-[0.75em] text-lg font-mono border border-stone-300 focus:border-[#d4af37] focus:outline-none p-2 bg-white text-stone-900 rounded-md"
                  />
                </div>

                {otpError && (
                  <div className="text-xs text-red-600 bg-red-50 border border-red-100 p-2.5 rounded-md flex items-start gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-red-500" />
                    <span>{otpError}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={countdown > 0}
                    className="text-[11px] text-[#aa7c11] hover:underline font-semibold disabled:text-stone-400"
                  >
                    {countdown > 0 ? `Resend Code in ${countdown}s` : "Resend OTP code"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOtpStep(false);
                      setOtpCode("");
                    }}
                    className="text-[11px] text-stone-500 hover:underline"
                  >
                    Change Details
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading || otpCode.length < 4}
                  className="w-full bg-[#d4af37] hover:bg-stone-900 text-stone-950 hover:text-white font-semibold py-2.5 rounded-lg text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Verify & Launch Chat"}
                </button>
              </form>
            ) : (
              /* Main Details Intake Form */
              <form onSubmit={handlePreSubmit} className="space-y-2 py-0.5">
                <p className="text-[10px] text-stone-500 leading-relaxed italic text-center border-b border-stone-100 pb-1.5">
                  Our luxury designers will customize the perfect set for your family.
                </p>

                {/* Name */}
                <div className="flex flex-col gap-0.5 text-left">
                  <label className="text-[9px] uppercase tracking-wider text-stone-500 font-semibold">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aishwarya Rai"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full text-xs border border-stone-200 focus:border-[#d4af37] focus:outline-none py-1.5 px-2 bg-white text-stone-900 rounded-md placeholder-stone-400"
                  />
                </div>

                {/* WhatsApp Phone */}
                <div className="flex flex-col gap-0.5 text-left">
                  <label className="text-[9px] uppercase tracking-wider text-stone-500 font-semibold">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 919910926757"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full text-xs border border-stone-200 focus:border-[#d4af37] focus:outline-none py-1.5 px-2 bg-white text-stone-900 rounded-md placeholder-stone-400"
                  />
                  <span className="text-[8px] text-stone-400 font-light">Prefix with country code (e.g. 91)</span>
                </div>

                {/* City */}
                <div className="flex flex-col gap-0.5 text-left">
                  <label className="text-[9px] uppercase tracking-wider text-stone-500 font-semibold">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mumbai"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      if (cityError) setCityError("");
                    }}
                    className="w-full text-xs border border-stone-200 focus:border-[#d4af37] focus:outline-none py-1.5 px-2 bg-white text-stone-900 rounded-md placeholder-stone-400"
                  />
                  {cityError && (
                    <span className="text-[10px] text-red-600 font-medium font-sans mt-0.5">
                      {cityError}
                    </span>
                  )}
                </div>

                {/* Occasion */}
                <div className="flex flex-col gap-0.5 text-left">
                  <label className="text-[9px] uppercase tracking-wider text-stone-500 font-semibold">
                    Celebration Occasion
                  </label>
                  <select
                    value={occasion}
                    onChange={(e: any) => setOccasion(e.target.value)}
                    className="w-full text-xs border border-stone-200 focus:border-[#d4af37] focus:outline-none py-1.5 px-2 bg-white text-stone-900 rounded-md"
                  >
                    <option value="Wedding">Wedding Hampers & Invites</option>
                    <option value="Anniversary">Anniversary Gifts</option>
                    <option value="Reception">Reception Souvenirs</option>
                    <option value="Corporate">Corporate / Business</option>
                    <option value="Festival">Festive & Diwali</option>
                    <option value="Other">Other Royal Milestones</option>
                  </select>
                </div>

                {/* Budget */}
                <div className="flex flex-col gap-0.5 text-left">
                  <label className="text-[9px] uppercase tracking-wider text-stone-500 font-semibold">
                    Preferred Budget Per Unit
                  </label>
                  <select
                    value={budget}
                    onChange={(e: any) => setBudget(e.target.value)}
                    className="w-full text-xs border border-stone-200 focus:border-[#d4af37] focus:outline-none py-1.5 px-2 bg-white text-stone-900 rounded-md"
                  >
                    <option value="₹500 - ₹1,000">₹500 - ₹1,000</option>
                    <option value="₹1,000 - ₹3,000">₹1,000 - ₹3,000</option>
                    <option value="₹3,000 - ₹5,000">₹3,000 - ₹5,000</option>
                    <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</option>
                    <option value="₹10,000+">₹10,000+</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-stone-900 hover:bg-[#d4af37] text-white hover:text-stone-950 font-semibold py-2 rounded-lg text-xs uppercase tracking-wider transition-all mt-2 flex items-center justify-center gap-1.5"
                >
                  {loading ? "Sending OTP..." : "Submit"}
                </button>
              </form>
            )}
          </div>

          {/* Footer branding */}
          <div className="bg-stone-100 p-2 text-center text-[9px] text-stone-500 border-t border-stone-200/50">
            Powered by <span className="font-semibold text-stone-700">Wati Verified Broadcast</span>
          </div>
        </div>
      )}
    </>
  );
}
