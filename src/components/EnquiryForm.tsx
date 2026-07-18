import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Phone, MessageSquare, Send, CheckCircle2, Heart, ShieldCheck, RefreshCw } from "lucide-react";
import { Product } from "../types";
import { isValidCity } from "../utils/cityValidation";

interface EnquiryFormProps {
  prefilledProduct: Product | null;
  clearPrefilled: () => void;
}

export default function EnquiryForm({ prefilledProduct, clearPrefilled }: EnquiryFormProps) {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("91");
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");
  const [email, setEmail] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [expectedGuests, setExpectedGuests] = useState("20-50");
  const [budget, setBudget] = useState("₹3,000 - ₹5,000");
  const [interestedIn, setInterestedIn] = useState("Both");
  const [message, setMessage] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // WhatsApp OTP Verification states
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [showNotification, setShowNotification] = useState(false);
  const [showRealWatiToast, setShowRealWatiToast] = useState(false);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-populate when user clicks "Enquire" on a specific card
  useEffect(() => {
    if (prefilledProduct) {
      setInterestedIn(
        prefilledProduct.category === "invitations" || prefilledProduct.category === "bespoke"
          ? "Invites"
          : "Favors"
      );
      setMessage(`Hi Ekaani team, I am extremely interested in curating the "${prefilledProduct.name}" (${prefilledProduct.material}) for my upcoming wedding. Please provide details and pricing estimates.`);
    }
  }, [prefilledProduct]);

  // Clean up timer on unmount
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

  const triggerOtpSend = async () => {
    // Generate a random 4 digit code
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(randomCode);
    console.log("🔒 [DEVELOPER/TESTING] Ekaani Luxe Enquiry Form OTP Code:", randomCode);
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
        console.log("Dispatching real OTP via Wati API proxy to:", phoneNumber);
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
          console.error("Failed to send OTP via Wati API:", data);
          setOtpError("Real Wati API gateway failed. Falling back to Simulated Notification.");
          triggerSimulatedNotification();
        } else {
          console.log("OTP successfully sent via real Wati!", data);
          setShowRealWatiToast(true);
          setTimeout(() => setShowRealWatiToast(false), 8000);
        }
      } catch (err: any) {
        console.error("Wati connection request failed", err);
        setOtpError("Network error with real Wati API. Falling back to Simulated Notification.");
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

    // Simulate connection to Wati API WhatsApp gateway
    setTimeout(() => {
      setLoading(false);
      setOtpStep(true);
      triggerOtpSend();
    }, 1000);
  };

  const handleVerifyOtpAndSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otpCode !== generatedOtp) {
      setOtpError("Invalid verification code. Please check your WhatsApp or click resend.");
      return;
    }

    setLoading(true);
      setOtpStep(false);
      clearPrefilled();
    }
  };

  const handleResendOtp = () => {
    if (countdown > 0) return;
    triggerOtpSend();
  };

  const handleReset = () => {
    setSubmitted(false);
    setOtpStep(false);
    setOtpCode("");
    setGeneratedOtp("");
    setFullName("");
    setPhoneNumber("91");
    setEmail("");
    setEventDate("");
    setExpectedGuests("200");
    setBudget("₹3,000 - ₹5,000");
    setInterestedIn("Both");
    setMessage("");
  };

  return (
    <section id="enquiry-form" className="py-24 bg-white/15 backdrop-blur-[0.5px] relative">
      {/* Delicate watercolor branches simulation on left and right corner */}
      <div className="absolute top-10 left-4 w-28 h-28 bg-emerald-100/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-10 right-4 w-28 h-28 bg-yellow-100/15 rounded-full blur-2xl pointer-events-none" />

      {/* Simulated Push Notification Toast for WhatsApp OTP */}
      {showNotification && (
        <div className="fixed top-24 right-4 md:right-8 z-50 max-w-sm bg-stone-900 text-stone-100 p-4 border-l-4 border-emerald-500 shadow-2xl flex items-start gap-3 animate-in slide-in-from-right duration-500 rounded-xs">
          <div className="p-1 bg-emerald-500 text-white rounded-full">
            <MessageSquare className="w-4 h-4 fill-white" />
          </div>
          <div className="space-y-1 text-left">
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold font-sans">WhatsApp (Wati API Demo)</span>
              <span className="text-[8px] text-stone-400 font-sans">Just now</span>
            </div>
            <p className="text-xs text-white font-medium">Ekaani Luxury Atelier OTP</p>
            <p className="text-xs text-stone-300 font-light">
              Your Ekaani Luxe verification code has been dispatched. Please check your WhatsApp messages.
            </p>
          </div>
        </div>
      )}

      {/* Real Wati Success Toast */}
      {showRealWatiToast && (
        <div className="fixed top-24 right-4 md:right-8 z-50 max-w-sm bg-emerald-950 text-white p-4 border-l-4 border-emerald-400 shadow-2xl flex items-start gap-3 animate-in slide-in-from-right duration-500 rounded-none">
          <div className="p-1 bg-emerald-500 text-white rounded-full">
            <CheckCircle2 className="w-4 h-4 text-white" />
          </div>
          <div className="space-y-1 text-left font-sans">
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold">Wati Live Gateway</span>
              <span className="text-[8px] text-emerald-200">Just now</span>
            </div>
            <p className="text-xs font-semibold">Real WhatsApp OTP Sent!</p>
            <p className="text-xs text-emerald-100 font-light leading-relaxed">
              We just triggered your template on <span className="font-semibold">{phoneNumber}</span>. Please verify using the code sent to your WhatsApp.
            </p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 tracking-wide font-light">
            Talk to our Luxe Weddings Experts
          </h2>
          <div className="flex justify-center items-center gap-2">
            <span className="w-12 h-[1px] bg-stone-300" />
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <span className="w-12 h-[1px] bg-stone-300" />
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-stone-500 font-sans font-medium">
            Lock in your wedding consultations for direct bespoke service
          </p>
        </div>

        <div className="relative bg-[#fcfbf7] border border-[#d4af37]/35 shadow-xl p-8 md:p-12">
          
          {/* Successful form submission panel */}
          {submitted ? (
            <div className="py-12 px-6 text-center space-y-6 animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200 shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              
              <div className="space-y-2 max-w-md mx-auto">
                <div className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-sans uppercase tracking-widest font-bold bg-emerald-50 px-3 py-1 rounded-full mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>WhatsApp Verified</span>
                </div>
                <h3 className="font-serif text-2xl text-stone-900">Your Request has been Secured</h3>
                <p className="text-sm text-stone-600 font-sans font-light leading-relaxed">
                  Thank you, <strong className="text-stone-900 font-semibold">{fullName}</strong>. Your royal celebration portfolio is now logged with our design directors.
                </p>
                <p className="text-xs text-emerald-700 font-sans font-medium bg-emerald-50 py-2.5 px-4 rounded-none mt-4 inline-block">
                  WhatsApp Verified: <strong className="font-semibold">{phoneNumber}</strong>. An Ekaani Luxe wedding coordinator is preparing your rates and will call you in 15 minutes.
                </p>

                <div className="mt-6 p-4 bg-stone-900 text-stone-100 border border-[#d4af37]/35 text-left rounded-sm space-y-2">
                  <p className="text-xs font-serif text-[#d4af37] uppercase tracking-wider font-bold">✉️ LIVE EMAIL LEAD DISPATCHED</p>
                  <p className="text-[11px] text-stone-300 leading-relaxed font-sans font-light">
                    The details of your lead have been dispatched to <strong className="text-white font-medium">testmailekaani@gmail.com</strong>.
                  </p>
                  <p className="text-[10px] text-stone-400 leading-relaxed font-sans font-light border-t border-stone-800 pt-2">
                    <strong className="text-[#d4af37] font-semibold">Important One-Time Setup:</strong> If you did not receive the email, please check the inbox (or spam folder) of <strong className="text-[#d4af37] font-semibold">testmailekaani@gmail.com</strong> for a message from <strong className="font-semibold text-stone-200">FormSubmit.co</strong> titled <em className="italic">"Activate FormSubmit"</em>, and click the activation button to allow instant forwards!
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href={`https://wa.me/919910926757?text=Hi Ekaani team, my name is ${encodeURIComponent(
                    fullName
                  )} and I just filled out your wedding inquiry form. Let's discuss our invitations!`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white font-sans text-xs uppercase tracking-widest font-semibold py-3 px-6 flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
                <button
                  onClick={handleReset}
                  className="border border-stone-300 hover:border-stone-800 text-stone-700 hover:text-stone-900 font-sans text-xs uppercase tracking-widest font-medium py-3 px-6 transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : otpStep ? (
            /* WhatsApp OTP Verification Step */
            <div className="py-8 px-4 text-center max-w-md mx-auto space-y-6 animate-in fade-in duration-500">
              <div className="w-16 h-16 bg-[#25D366]/10 text-[#128C7E] rounded-full flex items-center justify-center mx-auto border border-[#25D366]/30">
                <MessageSquare className="w-8 h-8 fill-[#25D366] text-[#25D366]" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-xl text-stone-900">WhatsApp OTP Verification</h3>
                <p className="text-xs text-stone-600 font-sans font-light leading-relaxed">
                  We've sent a standard 4-digit verification code to your WhatsApp number <strong className="text-stone-900">{phoneNumber}</strong>. Please enter the code below to finalize your elite inquiry.
                </p>
              </div>

              <form onSubmit={handleVerifyOtpAndSubmit} className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <input
                    type="text"
                    required
                    maxLength={4}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter 4-digit Code"
                    className="border border-stone-300 focus:border-[#d4af37] py-3 text-center tracking-[1em] text-lg font-bold font-sans focus:outline-none bg-white text-stone-900 placeholder-stone-300 w-full max-w-[240px] mx-auto"
                  />
                  {otpError && (
                    <p className="text-xs text-red-600 font-sans font-medium">{otpError}</p>
                  )}
                </div>

                <div className="flex justify-center items-center gap-2 text-xs text-stone-500">
                  {countdown > 0 ? (
                    <span>Resend via WhatsApp in {countdown}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-[#aa7c11] hover:underline font-semibold flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Resend OTP code</span>
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading || otpCode.length < 4}
                  className="w-full bg-[#d4af37] hover:bg-stone-900 text-stone-950 hover:text-white transition-luxury py-3.5 text-xs uppercase font-sans tracking-widest font-bold flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>Verifying OTP...</span>
                  ) : (
                    <span>Verify & Submit Enquiry</span>
                  )}
                </button>
              </form>

              <button
                type="button"
                onClick={() => setOtpStep(false)}
                className="text-xs text-stone-500 hover:text-stone-800 underline font-sans"
              >
                Go back and modify details
              </button>
            </div>
          ) : (
            <form onSubmit={handlePreSubmit} className="space-y-6">
              
              {prefilledProduct && (
                <div className="bg-[#d4af37]/10 border border-[#d4af37]/30 p-4 mb-6 flex justify-between items-center text-left">
                  <div className="space-y-0.5">
                    <p className="text-[10px] uppercase tracking-widest text-[#aa7c11] font-bold">
                      Selected Item For Quick Enquiry
                    </p>
                    <p className="font-serif text-sm text-stone-900">
                      {prefilledProduct.name} ({prefilledProduct.material})
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={clearPrefilled}
                    className="text-xs text-stone-500 hover:text-stone-900 underline font-sans"
                  >
                    Clear selection
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div className="flex flex-col text-left space-y-1">
                  <label className="text-[11px] uppercase tracking-widest text-stone-500 font-sans font-bold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your name"
                    className="border-b border-stone-300 focus:border-[#d4af37] py-2 px-1 focus:outline-none bg-transparent text-sm font-sans text-stone-800 placeholder-stone-400"
                  />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col text-left space-y-1">
                  <label className="text-[11px] uppercase tracking-widest text-stone-500 font-sans font-bold">
                    Phone Number (WhatsApp) * <span className="text-[9px] text-[#aa7c11] lowercase font-normal">(91 prefilled)</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/[^\d+]/g, ""))}
                    placeholder="919910926757"
                    className="border-b border-stone-300 focus:border-[#d4af37] py-2 px-1 focus:outline-none bg-transparent text-sm font-sans text-stone-800 placeholder-stone-400"
                  />
                </div>

                {/* City (Mandatory and Validated) */}
                <div className="flex flex-col text-left space-y-1">
                  <label className="text-[11px] uppercase tracking-widest text-stone-500 font-sans font-bold">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      if (cityError) setCityError("");
                    }}
                    placeholder="e.g. New Delhi"
                    className="border-b border-stone-300 focus:border-[#d4af37] py-2 px-1 focus:outline-none bg-transparent text-sm font-sans text-stone-800 placeholder-stone-400"
                  />
                  {cityError && (
                    <span className="text-xs text-red-600 font-medium font-sans mt-1">
                      {cityError}
                    </span>
                  )}
                </div>

                {/* Email address */}
                <div className="flex flex-col text-left space-y-1">
                  <label className="text-[11px] uppercase tracking-widest text-stone-500 font-sans font-bold">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="border-b border-stone-300 focus:border-[#d4af37] py-2 px-1 focus:outline-none bg-transparent text-sm font-sans text-stone-800 placeholder-stone-400"
                  />
                </div>

                {/* Wedding Date */}
                <div className="flex flex-col text-left space-y-1">
                  <label className="text-[11px] uppercase tracking-widest text-stone-500 font-sans font-bold">
                    Expected Event Date
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="border-b border-stone-300 focus:border-[#d4af37] py-2 px-1 focus:outline-none bg-transparent text-sm font-sans text-stone-800"
                  />
                </div>

                {/* Expected Guests */}
                <div className="flex flex-col text-left space-y-1">
                  <label className="text-[11px] uppercase tracking-widest text-stone-500 font-sans font-bold">
                    Expected Guests
                  </label>
                  <select
                    value={expectedGuests}
                    onChange={(e) => setExpectedGuests(e.target.value)}
                    className="border-b border-stone-300 focus:border-[#d4af37] py-2 px-1 focus:outline-none bg-transparent text-sm font-sans text-stone-800"
                  >
                    <option value="1-10">1 - 10 Guests</option>
                    <option value="10-20">10 - 20 Guests</option>
                    <option value="20-50">20 - 50 Guests</option>
                    <option value="50-100">50 - 100 Guests</option>
                    <option value="100-200">100 - 200 Guests</option>
                  </select>
                </div>

                {/* Estimated Budget */}
                <div className="flex flex-col text-left space-y-1">
                  <label className="text-[11px] uppercase tracking-widest text-stone-500 font-sans font-bold">
                    Estimated Gifting Budget
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="border-b border-stone-300 focus:border-[#d4af37] py-2 px-1 focus:outline-none bg-transparent text-sm font-sans text-stone-800"
                  >
                    <option value="₹1,000 - ₹3,000">₹1,000 - ₹3,000</option>
                    <option value="₹3,000 - ₹5,000">₹3,000 - ₹5,000</option>
                    <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</option>
                    <option value="₹10,000 - ₹20,000">₹10,000 - ₹20,000</option>
                  </select>
                </div>

              </div>

              {/* Interested In Categories */}
              <div className="flex flex-col text-left space-y-2 pt-2">
                <label className="text-[11px] uppercase tracking-widest text-stone-500 font-sans font-bold">
                  Interested In *
                </label>
                <div className="flex gap-6">
                  {["Return Gifts", "Premium Invites", "Both"].map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer font-sans text-sm text-stone-700">
                      <input
                        type="radio"
                        name="interestedIn"
                        checked={interestedIn === cat || (cat === "Premium Invites" && interestedIn === "Invites") || (cat === "Return Gifts" && interestedIn === "Favors")}
                        onChange={() => setInterestedIn(cat)}
                        className="accent-[#d4af37]"
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message Notes */}
              <div className="flex flex-col text-left space-y-1 pt-2">
                <label className="text-[11px] uppercase tracking-widest text-stone-500 font-sans font-bold">
                  Special Requirements or Ceremony Notes
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell our wedding directors about your ideas, specific motifs, packaging desires, or sweet assortments..."
                  rows={4}
                  className="border border-stone-300 p-3 focus:border-[#d4af37] focus:outline-none bg-transparent text-sm font-sans text-stone-800 placeholder-stone-400"
                />
              </div>

              {/* Submit Trigger */}
              <div className="pt-4 text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#d4af37] hover:bg-stone-900 text-stone-950 hover:text-white transition-luxury py-4 text-xs uppercase font-sans tracking-widest font-bold flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>Securing Consultation Atelier...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Request Consultation</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>
      </div>

    </section>
  );
}
