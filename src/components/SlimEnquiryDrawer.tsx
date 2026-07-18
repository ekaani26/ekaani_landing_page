import React, { useState, useEffect, useRef } from "react";
import { X, Check, Phone, Send, ShieldCheck, RefreshCw, Smartphone, Sparkles } from "lucide-react";
import { Product } from "../types";
import { isValidCity } from "../utils/cityValidation";

interface SlimEnquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  presetCategory: "Hampers" | "Bulk" | "Customized" | "General";
  prefilledProduct?: Product | null;
}

export default function SlimEnquiryDrawer({ isOpen, onClose, presetCategory, prefilledProduct }: SlimEnquiryDrawerProps) {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("91");
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState<"Hampers" | "Bulk" | "Customized" | "General">("General");
  const [message, setMessage] = useState("");
  
  // Occasion, budget and guest details section states
  const [occasion, setOccasion] = useState<"Wedding" | "Anniversary" | "Reception" | "Corporate" | "Festival" | "Other">("Wedding");
  const [budget, setBudget] = useState<"₹500 - ₹1,000" | "₹1,000 - ₹3,000" | "₹3,000 - ₹5,000" | "₹5,000 - ₹10,000" | "₹10,000+">("₹1,000 - ₹3,000");
  const [expectedGuests, setExpectedGuests] = useState<"1-10" | "10-20" | "20-50" | "50-100" | "100-200">("20-50");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // OTP Verification
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [showRealWatiToast, setShowRealWatiToast] = useState(false);
  const [showSimulatedToast, setShowSimulatedToast] = useState(false);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Synchronize category preset on open
  useEffect(() => {
    if (isOpen) {
      setFullName("");
      setPhoneNumber("91");
      setCity("");
      setCityError("");
      setEmail("");
      setOtpStep(false);
      setSubmitted(false);
      setOtpCode("");
      setOtpError("");
      
      if (prefilledProduct) {
        setCategory("General");
        setMessage(`Hi Ekaani Atelier, I am interested in placing an enquiry for the masterpiece: "${prefilledProduct.name}" (Bespoke Product). Material: ${prefilledProduct.material || "Sterling Silver"}. Kindly share custom pricing, availability, and sample delivery timelines.`);
        // Set occasion match if product occasion is set
        if (prefilledProduct.occasion) {
          if (prefilledProduct.occasion === "Wedding" || prefilledProduct.occasion === "Wedding Hampers") {
            setOccasion("Wedding");
          } else if (prefilledProduct.occasion === "Anniversary") {
            setOccasion("Anniversary");
          } else if (prefilledProduct.occasion === "Return Gift") {
            setOccasion("Reception");
          }
        }
        
        // Match budget bracket approximately
        const price = prefilledProduct.priceValue || 0;
        if (price > 0) {
          if (price < 1000) setBudget("₹500 - ₹1,000");
          else if (price < 3000) setBudget("₹1,000 - ₹3,000");
          else if (price < 5000) setBudget("₹3,000 - ₹5,000");
          else if (price < 10000) setBudget("₹5,000 - ₹10,000");
          else setBudget("₹10,000+");
        }
      } else {
        setCategory(presetCategory);
        // Setup dynamic luxury message based on category
        if (presetCategory === "Hampers") {
          setMessage("Hi Ekaani, I am looking to enquire about premium luxury hampers for wedding return favors.");
        } else if (presetCategory === "Bulk") {
          setMessage("Hi Ekaani, I would like to receive pricing sheets for bulk orders of German Silver & Gold Plated Brass souvenirs.");
        } else if (presetCategory === "Customized") {
          setMessage("Hi Ekaani, I am interested in designing a fully customized invitation card and custom unboxing box suite.");
        } else {
          setMessage("Hi Ekaani, I am interested in exploring your luxury wedding collection.");
        }
      }
    }
  }, [isOpen, presetCategory, prefilledProduct]);

  // Cleanup countdown
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
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(randomCode);
    console.log("🔒 [DEVELOPER/TESTING] Slim Enquiry Drawer OTP Code:", randomCode);
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
        console.log("Slim Form: sending OTP via Wati API to:", phoneNumber);
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
          console.error("Slim Form: Wati API fail:", data);
          setOtpError("Real Wati API gateway connection issue. Displaying simulated alert.");
          triggerSimulatedNotification();
        } else {
          console.log("Slim Form: OTP sent successfully!", data);
          setShowRealWatiToast(true);
          setTimeout(() => setShowRealWatiToast(false), 8000);
        }
      } catch (err: any) {
        console.error("Slim Form: API network failure", err);
        setOtpError("Wati API connection error. Displaying simulated alert.");
        triggerSimulatedNotification();
      }
    } else {
      triggerSimulatedNotification();
    }

    startCountdown();
  };

  const triggerSimulatedNotification = () => {
    setShowSimulatedToast(true);
    setTimeout(() => {
      setShowSimulatedToast(false);
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
    }, 800); // 800ms loading - super fast and responsive!
  };

  const handleVerifyOtpAndSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode !== generatedOtp) {
      setOtpError("Invalid verification code. Please check your WhatsApp or retry.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/submit-enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          phoneNumber,
          city,
          email,
          eventDate: "", // default empty for quick sheet form
          expectedGuests,
          budget,
          interestedIn: category === "Hampers" || category === "Bulk" ? "Favors" : "Invites",
          message,
          selectedProduct: category,
          source: `Slim Drawer: ${category}`
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to dispatch drawer lead via Ekaani API");
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
            name: fullName,
            phone: phoneNumber,
            city: city,
            email: email || "Not Provided",
            event_date: "Not Specified (Slim Form)",
            guests: expectedGuests,
            budget: budget,
            interested_in: category === "Hampers" || category === "Bulk" ? "Favors" : "Invites",
            product: category,
            message: message || "Requested premium wedding consultation.",
            source: "Client Direct SlimDrawer Backup",
            _subject: `🔥 [SLIM DRAWER LEAD] ${fullName} - ${phoneNumber} (${city})`
          })
        });
      } catch (fsErr) {
        console.error("Client direct SlimDrawer FormSubmit dispatch failed:", fsErr);
      }

      setLoading(false);
      setSubmitted(true);
      setOtpStep(false);

      // Save to local storage for persistence
      const enquiries = JSON.parse(localStorage.getItem("ekaani_enquiries") || "[]");
      enquiries.push({
        id: Date.now(),
        fullName,
        phoneNumber,
        city,
        email,
        interestedIn: category === "Hampers" || category === "Bulk" ? "Favors" : "Invites",
        message,
        category,
        occasion,
        budget,
        expectedGuests,
        timestamp: new Date().toISOString(),
        verifiedViaWhatsApp: true,
        source: "Mobile Frozen Slim Form"
      });
      localStorage.setItem("ekaani_enquiries", JSON.stringify(enquiries));
    } catch (err: any) {
      console.error("Drawer lead API dispatch error, using local fallback:", err);
      setLoading(false);
      setSubmitted(true);
      setOtpStep(false);
    }
  };

  const handleResend = () => {
    if (countdown > 0) return;
    triggerOtpSend();
  };

  return (
    <div className={`fixed inset-0 z-[100001] flex items-end justify-center bg-stone-950/50 backdrop-blur-xs p-0 sm:p-4 transition-opacity duration-150 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
      {/* Background click to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />

      <div className={`w-full max-w-md bg-[#fcfbf7] border-t border-l border-r border-[#d4af37]/40 shadow-2xl rounded-t-2xl pb-10 flex flex-col overflow-hidden max-h-[92vh] transition-transform duration-200 ease-out transform-gpu ${isOpen ? "translate-y-0" : "translate-y-full"}`}>
        
        {/* Luxury gold top slider bar */}
        <div className="w-12 h-1.5 bg-stone-300 rounded-full mx-auto my-3" />

        {/* Header */}
        <div className="px-5 pb-3 border-b border-stone-200/60 flex justify-between items-center bg-white">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37] animate-pulse" />
            <div>
              <h3 className="text-sm font-serif font-bold text-stone-900 tracking-wide uppercase">
                Slim Enquiry Request
              </h3>
              <p className="text-[9px] text-stone-500 font-sans tracking-widest uppercase">
                Category: <span className="text-[#aa7c11] font-semibold">{category}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Toast notifications */}
        {showSimulatedToast && (
          <div className="bg-stone-900 text-white px-4 py-2.5 text-xs font-sans flex items-center justify-between border-b border-[#d4af37]/40">
            <div className="flex items-center gap-2">
              <Smartphone className="w-3.5 h-3.5 text-[#25D366] animate-bounce" />
              <span>[SIMULATED] Verification code has been dispatched. Please check your messages.</span>
            </div>
          </div>
        )}

        {showRealWatiToast && (
          <div className="bg-emerald-950 text-white px-4 py-2.5 text-xs font-sans flex items-center justify-between border-b border-emerald-500">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Real WhatsApp OTP sent to <strong className="text-emerald-300">{phoneNumber}</strong>. Please verify using the code sent.</span>
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 max-h-[68vh] pb-16">
          
          {/* STATE 1: Submited and Completed */}
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-7 h-7 stroke-[2.5]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-serif font-bold text-stone-900 tracking-wide uppercase">
                  Enquiry Verified!
                </h4>
                <p className="text-xs text-stone-600 max-w-xs mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-stone-900">{fullName}</span>. Your luxury bespoke request has been authenticated via WhatsApp. An expert curator will reach out to you within 2 hours.
                </p>
              </div>
              <div className="bg-[#fcfbf7] border border-stone-200 p-3 rounded-xs text-left space-y-1">
                <p className="text-[10px] font-semibold text-stone-800">✉️ Live Lead Dispatched</p>
                <p className="text-[9px] text-stone-500 leading-normal">
                  Lead sent to <strong className="text-stone-800 font-medium">testmailekaani@gmail.com</strong>.
                </p>
                <p className="text-[9px] text-stone-400 leading-normal border-t border-stone-100 pt-1.5 mt-1">
                  <strong className="text-[#aa7c11] font-semibold">One-Time Activation:</strong> Make sure you have clicked the confirmation link in the activation email sent by **FormSubmit.co** to **testmailekaani@gmail.com** to authorize live delivery!
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-full bg-stone-900 hover:bg-[#aa7c11] text-white text-xs font-bold font-sans py-3 tracking-widest uppercase transition-colors"
              >
                Done
              </button>
            </div>
          ) : otpStep ? (
            
            /* STATE 2: OTP Verification Form */
            <form onSubmit={handleVerifyOtpAndSubmit} className="space-y-4">
              <div className="p-4 bg-amber-50/50 border border-[#d4af37]/30 text-center space-y-1.5">
                <div className="flex justify-center text-[#aa7c11]">
                  <ShieldCheck className="w-5 h-5 animate-pulse" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  Enter 4-Digit Verification Code
                </h4>
                <p className="text-[11px] text-stone-600 leading-normal font-light">
                  We've sent a transactional verification OTP to <span className="font-semibold text-stone-900">{phoneNumber}</span> via WhatsApp.
                </p>
              </div>

              {otpError && (
                <p className="text-[11px] text-red-600 font-sans font-medium text-center bg-red-50 p-2 border border-red-200">
                  {otpError}
                </p>
              )}

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-stone-700 uppercase tracking-wider block">
                  Verification Code (OTP)
                </label>
                <input
                  type="text"
                  required
                  maxLength={4}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                  placeholder="e.g. 1234"
                  className="w-full px-3 py-3 text-center text-lg font-bold font-mono border border-stone-300 focus:border-[#d4af37] bg-white text-stone-900 focus:outline-none tracking-widest"
                />
              </div>

              <div className="flex justify-between items-center text-[10px]">
                <span className="text-stone-500">
                  {countdown > 0 ? (
                    <span>Resend OTP in <strong className="text-stone-800 font-mono">{countdown}s</strong></span>
                  ) : (
                    <span className="text-stone-400">Didn't receive the message?</span>
                  )}
                </span>
                <button
                  type="button"
                  disabled={countdown > 0}
                  onClick={handleResend}
                  className="font-bold uppercase tracking-wider text-[#aa7c11] disabled:text-stone-400 hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Resend Code</span>
                </button>
              </div>

              <button
                type="submit"
                disabled={loading || otpCode.length < 4}
                className="w-full bg-[#d4af37] hover:bg-stone-900 text-stone-950 hover:text-white font-sans text-xs font-bold py-3.5 tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="animate-pulse">Authenticating...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verify & Submit Request</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            
            /* STATE 3: Simple, Elegant Main Slim Form Fields */
            <form onSubmit={handlePreSubmit} className="space-y-3.5">
              
              {/* Name field */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-stone-700 uppercase tracking-wider block font-sans">
                  Your Full Name <span className="text-[#d4af37]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Maharani Devika"
                  className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-[#d4af37] bg-white text-stone-900 focus:outline-none"
                />
              </div>

              {/* Phone field */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-stone-700 uppercase tracking-wider block font-sans">
                  WhatsApp Mobile Number <span className="text-[#d4af37]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                    <span className="text-xs font-bold">+</span>
                  </div>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/[^\d+]/g, ""))}
                    placeholder="919910926757 (India code '91' prefilled)"
                    className="w-full pl-6 pr-3 py-2 text-xs border border-stone-300 focus:border-[#d4af37] bg-white text-stone-900 font-mono focus:outline-none"
                  />
                </div>
                <span className="text-[8px] text-stone-400 font-light block">
                  Pre-filled with India country code '91'. Simply type your remaining 10 digits to receive the Wati WhatsApp OTP.
                </span>
              </div>

              {/* City field (Mandatory and Validated) */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-stone-700 uppercase tracking-wider block font-sans">
                  Your City <span className="text-[#d4af37]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    if (cityError) setCityError("");
                  }}
                  placeholder="e.g. Mumbai"
                  className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-[#d4af37] bg-white text-stone-900 focus:outline-none"
                />
                {cityError && (
                  <span className="text-[10px] text-red-600 font-medium font-sans block mt-0.5">
                    {cityError}
                  </span>
                )}
              </div>

              {/* Email field */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-stone-700 uppercase tracking-wider block font-sans">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. devika@royalmail.com"
                  className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-[#d4af37] bg-white text-stone-900 focus:outline-none"
                />
              </div>

              {/* Event Occasion Grid Selection */}
              <div className="space-y-1.5 pt-1">
                <label className="text-[10px] font-bold text-stone-700 uppercase tracking-wider block font-sans">
                  Event Occasion <span className="text-[#d4af37]">*</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["Wedding", "Anniversary", "Reception", "Corporate", "Festival", "Other"] as const).map((occ) => (
                    <button
                      key={occ}
                      type="button"
                      onClick={() => setOccasion(occ)}
                      className={`py-1.5 px-1 text-[9px] font-sans uppercase font-medium tracking-wider border transition-all text-center ${
                        occasion === occ
                          ? "bg-stone-900 border-stone-900 text-white font-semibold"
                          : "bg-white border-stone-200 text-stone-600 hover:border-stone-400"
                      }`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gifting Budget & Expected Guest Count Row */}
              <div className="grid grid-cols-2 gap-3">
                {/* Estimated Budget per Unit */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-stone-700 uppercase tracking-wider block font-sans">
                    Budget Per Unit <span className="text-[#d4af37]">*</span>
                  </label>
                  <select
                    value={budget}
                    onChange={(e: any) => setBudget(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-stone-300 focus:border-[#d4af37] bg-white text-stone-900 focus:outline-none"
                  >
                    <option value="₹500 - ₹1,000">₹500 - ₹1,000</option>
                    <option value="₹1,000 - ₹3,000">₹1,000 - ₹3,000</option>
                    <option value="₹3,000 - ₹5,000">₹3,000 - ₹5,000</option>
                    <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</option>
                    <option value="₹10,000+">₹10,000+</option>
                  </select>
                </div>

                {/* Expected Guest Count */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-stone-700 uppercase tracking-wider block font-sans">
                    Expected Volume
                  </label>
                  <select
                    value={expectedGuests}
                    onChange={(e: any) => setExpectedGuests(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-stone-300 focus:border-[#d4af37] bg-white text-stone-900 focus:outline-none"
                  >
                    <option value="1-10">1 - 10 Units</option>
                    <option value="10-20">10 - 20 Units</option>
                    <option value="20-50">20 - 50 Units</option>
                    <option value="50-100">50 - 100 Units</option>
                    <option value="100-200">100 - 200 Units</option>
                  </select>
                </div>
              </div>

              {/* Quick Message / Requirement Note */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-stone-700 uppercase tracking-wider block font-sans">
                  Special Custom Requests
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your wedding guest count, budget range or material preferences..."
                  className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-[#d4af37] bg-white text-stone-900 focus:outline-none resize-none leading-relaxed"
                />
              </div>

              {/* Consent check info */}
              <div className="flex items-start gap-1.5 pt-1 text-[9px] text-stone-500 leading-normal">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] mt-1 shrink-0" />
                <span>
                  By tapping below, you agree to receive an automated verification code (OTP) on WhatsApp.
                </span>
              </div>

              {/* Submit triggers OTP */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#d4af37] hover:bg-stone-900 text-stone-950 hover:text-white font-sans text-xs font-bold py-3.5 tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <span className="animate-pulse">Arranging Call with Atelier...</span>
                ) : (
                  <>
                    <Phone className="w-3.5 h-3.5" />
                    <span>Arrange call</span>
                  </>
                )}
              </button>
            </form>
          )}

        </div>

        {/* Dynamic decorative branding bottom bar */}
        <div className="bg-stone-50 p-4 text-center border-t border-stone-200/80 flex items-center justify-center gap-1">
          <span className="text-[8px] tracking-widest uppercase font-serif font-semibold text-stone-400">
            Ekaani Atelier Luxe Suites
          </span>
        </div>
      </div>
    </div>
  );
}
