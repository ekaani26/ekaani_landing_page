import React, { useState, useEffect } from "react";
import { X, Settings2, Key, Info, Check, Send, Smartphone, ShieldAlert, Sparkles, Code, Play } from "lucide-react";

interface WatiConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WatiConfigModal({ isOpen, onClose }: WatiConfigModalProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [watiUrl, setWatiUrl] = useState("");
  const [watiAuthToken, setWatiAuthToken] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [parameterName, setParameterName] = useState("otp");
  const [broadcastName, setBroadcastName] = useState("Ekaani OTP Verification");

  // Test fields
  const [testPhone, setTestPhone] = useState("");
  const [testLoading, setTestLoading] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; details?: any } | null>(null);

  useEffect(() => {
    // Load config on mount - default to true and use user's real credentials if none saved
    const savedEnabled = localStorage.getItem("wati_otp_enabled") !== "false"; // Default to true
    const savedUrl = localStorage.getItem("wati_api_url") || "https://live-mt-server.wati.io/5680/api/v1/sendTemplateMessage";
    const savedToken = localStorage.getItem("wati_auth_token") || "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkVrYWFuaW5vcml0YWtlQGdtYWlsLmNvbSIsIm5hbWVpZCI6IkVrYWFuaW5vcml0YWtlQGdtYWlsLmNvbSIsImVtYWlsIjoiRWthYW5pbm9yaXRha2VAZ21haWwuY29tIiwiYXV0aF90aW1lIjoiMDcvMTcvMjAyNiAwNzoxNTo1NiIsInRlbmFudF9pZCI6IjU2ODAiLCJkYl9uYW1lIjoibXQtcHJvZC1UZW5hbnRzIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQURNSU5JU1RSQVRPUiIsImV4cCI6MjUzNDAyMzAwODAwLCJpc3MiOiJDbGFyZV9BSSIsImF1ZCI6IkNsYXJlX0FJIn0.QghUssvs5d0XBPvUvymUfY6zpfuJLWEwhYrseKrpcYE";
    let savedTemplate = localStorage.getItem("wati_template_name");
    if (!savedTemplate || savedTemplate === "ekaani_otp") {
      savedTemplate = "otp_template_2";
    }
    let savedParam = localStorage.getItem("wati_parameter_name");
    if (!savedParam || savedParam === "otp") {
      savedParam = "1";
    }
    const savedBroadcast = localStorage.getItem("wati_broadcast_name") || "Ekaani Luxe Verification";

    // Set item in localStorage to make sure other components pick it up on load too
    if (localStorage.getItem("wati_otp_enabled") === null || localStorage.getItem("wati_template_name") === "ekaani_otp" || localStorage.getItem("wati_parameter_name") === "otp") {
      localStorage.setItem("wati_otp_enabled", "true");
      localStorage.setItem("wati_api_url", savedUrl);
      localStorage.setItem("wati_auth_token", savedToken);
      localStorage.setItem("wati_template_name", savedTemplate);
      localStorage.setItem("wati_parameter_name", savedParam);
      localStorage.setItem("wati_broadcast_name", savedBroadcast);
    }

    setIsEnabled(savedEnabled);
    setWatiUrl(savedUrl);
    setWatiAuthToken(savedToken);
    setTemplateName(savedTemplate);
    setParameterName(savedParam);
    setBroadcastName(savedBroadcast);
  }, [isOpen]);

  const handleSave = () => {
    localStorage.setItem("wati_otp_enabled", isEnabled ? "true" : "false");
    localStorage.setItem("wati_api_url", watiUrl);
    localStorage.setItem("wati_auth_token", watiAuthToken);
    localStorage.setItem("wati_template_name", templateName);
    localStorage.setItem("wati_parameter_name", parameterName);
    localStorage.setItem("wati_broadcast_name", broadcastName);

    // Custom window event to notify components of configuration change
    window.dispatchEvent(new Event("wati-config-updated"));
    
    // Quick success alert
    alert("Wati Integration configuration saved successfully.");
  };

  const handleTestSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testPhone) return;

    setTestLoading(true);
    setTestResult(null);

    const testOtp = Math.floor(1000 + Math.random() * 9000).toString();

    try {
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
          phoneNumber: testPhone,
          otpCode: testOtp,
          parameterName,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setTestResult({
          success: true,
          message: `Success! Sent verification code "${testOtp}" to ${testPhone} via your Wati API. Check your WhatsApp!`,
          details: data.data,
        });
      } else {
        setTestResult({
          success: false,
          message: data.error || "Failed to send message via Wati.",
          details: data.details || data,
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err.message || "An unexpected network error occurred.",
      });
    } finally {
      setTestLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md overflow-y-auto">
      <div className="relative bg-[#fcfbf7] border border-[#d4af37]/45 shadow-2xl w-full max-w-2xl overflow-hidden text-left my-8 rounded-none">
        {/* Luxury top accent */}
        <div className="h-1 bg-gradient-to-r from-stone-800 via-[#d4af37] to-stone-800" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-white">
          <div className="flex items-center gap-2.5">
            <Settings2 className="w-5 h-5 text-[#aa7c11]" />
            <div>
              <h3 className="text-base font-serif font-semibold text-stone-900 tracking-wide">
                WhatsApp Business API Integration (WATI)
              </h3>
              <p className="text-[10px] text-stone-500 font-sans tracking-wide uppercase font-medium">
                Connect your official credentials to activate real OTP verification
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          
          {/* Status Toggle Card */}
          <div className="p-4 bg-white border border-stone-200 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-[#aa7c11]">
                <Sparkles className="w-3 h-3" />
                <span>Integration Switch</span>
              </span>
              <p className="text-xs font-semibold text-stone-900 font-sans">
                {isEnabled ? "Real WATI Integration Active" : "Simulated Demo OTP Mode Active"}
              </p>
              <p className="text-[11px] text-stone-500 leading-relaxed font-light">
                {isEnabled 
                  ? "Form submissions will attempt to trigger real WhatsApp OTP template messages via your WATI account."
                  : "Using high-fidelity simulated on-screen WhatsApp push notifications for immediate visual feedback."}
              </p>
            </div>
            
            <button
              onClick={() => setIsEnabled(!isEnabled)}
              className={`px-4 py-2 text-xs font-bold font-sans tracking-widest uppercase transition-all duration-300 ${
                isEnabled 
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                  : "bg-stone-200 hover:bg-stone-300 text-stone-800"
              }`}
            >
              {isEnabled ? "ON (REAL)" : "OFF (SIM)"}
            </button>
          </div>

          {/* Connection Settings */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-stone-900 font-sans flex items-center gap-1.5 border-b border-stone-200 pb-1.5">
              <Key className="w-4 h-4 text-[#aa7c11]" />
              <span>WATI API Gateway Credentials</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block font-sans">
                  WATI REST API Endpoint URL
                </label>
                <input
                  type="text"
                  value={watiUrl}
                  onChange={(e) => setWatiUrl(e.target.value)}
                  placeholder="https://live-server-api.wati.io/api/v1/sendTemplateMessage"
                  className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-[#d4af37] bg-white text-stone-900 font-mono focus:outline-none"
                />
                <span className="text-[10px] text-stone-400 font-sans font-light block">
                  Find this under WATI Dashboard → OpenAPI / API Integration section.
                </span>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block font-sans">
                  Access Token (Authorization Bearer)
                </label>
                <textarea
                  value={watiAuthToken}
                  onChange={(e) => setWatiAuthToken(e.target.value)}
                  placeholder="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  rows={2}
                  className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-[#d4af37] bg-white text-stone-900 font-mono focus:outline-none resize-none"
                />
                <span className="text-[10px] text-stone-400 font-sans font-light block">
                  Copy the full Access Token string from your WATI settings panel.
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block font-sans">
                  WATI Approved Template Name
                </label>
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="otp_template_2"
                  className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-[#d4af37] bg-white text-stone-900 font-mono focus:outline-none"
                />
                <span className="text-[10px] text-stone-400 font-sans font-light block">
                  The approved HSM template name.
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block font-sans">
                  OTP Body Variable Parameter
                </label>
                <input
                  type="text"
                  value={parameterName}
                  onChange={(e) => setParameterName(e.target.value)}
                  placeholder="1"
                  className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-[#d4af37] bg-white text-stone-900 font-mono focus:outline-none"
                />
                <span className="text-[10px] text-stone-400 font-sans font-light block">
                  Name of the variable in template (often <code>1</code> or <code>otp</code>).
                </span>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block font-sans">
                  Broadcast Campaign Name
                </label>
                <input
                  type="text"
                  value={broadcastName}
                  onChange={(e) => setBroadcastName(e.target.value)}
                  placeholder="Ekaani Luxe Verification"
                  className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-[#d4af37] bg-white text-stone-900 font-sans focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                className="bg-[#d4af37] hover:bg-stone-900 text-stone-950 hover:text-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors font-sans flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Save Credentials</span>
              </button>
            </div>
          </div>

          {/* Real-time Testing Environment */}
          <div className="border border-[#d4af37]/25 bg-stone-50 p-5 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-stone-900 font-sans flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-[#aa7c11]" />
              <span>Real-Time Integration Testing</span>
            </h4>
            <p className="text-[11px] text-stone-600 leading-relaxed font-light">
              Save your credentials above, then enter your phone number below to send a live trial message. Ensure your WhatsApp format includes the country code without spaces or symbols (e.g. <code>919910926757</code>).
            </p>

            <form onSubmit={handleTestSend} className="flex flex-col sm:flex-row gap-2 max-w-md">
              <input
                type="tel"
                required
                value={testPhone}
                onChange={(e) => setTestPhone(e.target.value)}
                placeholder="Country Code + Phone (e.g. 919910926757)"
                className="flex-1 px-3 py-2 text-xs border border-stone-300 bg-white text-stone-900 focus:border-[#d4af37] focus:outline-none font-mono"
              />
              <button
                type="submit"
                disabled={testLoading || !testPhone}
                className="bg-stone-900 hover:bg-[#aa7c11] text-white px-4 py-2 text-xs font-bold font-sans tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {testLoading ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Test OTP</span>
                  </>
                )}
              </button>
            </form>

            {testResult && (
              <div className={`p-4 border text-xs leading-relaxed font-sans ${
                testResult.success 
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
                  : "bg-red-50 border-red-200 text-red-800"
              }`}>
                <div className="font-bold mb-1 flex items-center gap-1">
                  {testResult.success ? (
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  ) : (
                    <ShieldAlert className="w-4 h-4 text-red-600" />
                  )}
                  <span>{testResult.success ? "Integration Working!" : "Integration Failed"}</span>
                </div>
                <p className="text-[11px]">{testResult.message}</p>
                {testResult.details && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-[10px] font-mono hover:underline uppercase text-stone-600 font-bold">
                      View Raw API Response
                    </summary>
                    <pre className="mt-1.5 p-2 bg-stone-900 text-stone-200 font-mono text-[9px] overflow-x-auto rounded-none">
                      {JSON.stringify(testResult.details, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            )}
          </div>

          {/* Quick Technical Integration Guide */}
          <div className="space-y-3 bg-white p-5 border border-stone-200">
            <h4 className="text-xs uppercase tracking-widest font-bold text-stone-900 font-sans flex items-center gap-1.5">
              <Code className="w-4 h-4 text-[#aa7c11]" />
              <span>How To Create Your WATI OTP Template</span>
            </h4>
            <div className="text-xs text-stone-600 space-y-2 leading-relaxed font-light">
              <p>
                To enable automated verification, set up a template in your <a href="https://www.wati.io/" target="_blank" rel="noreferrer" className="text-[#aa7c11] underline font-semibold">WATI Portal</a> with the following structure:
              </p>
              <div className="bg-stone-50 border border-stone-200 p-3 font-mono text-[10px] text-stone-700 whitespace-pre-wrap leading-normal">
{`Template Name: ekaani_otp
Category: UTILITY / TRANSACTIONAL
Language: English (or preferred language)

Message Body:
Your Ekaani luxury wedding unboxing verification code is: {{1}}. Valid for 5 minutes.`}
              </div>
              <p className="text-[11px]">
                Once approved, configure <strong>Approved Template Name</strong> to match the name (e.g. <code>ekaani_otp</code>) and the <strong>Parameter Name</strong> to match the variable placeholder index (defaults to <code>otp</code> or <code>1</code>).
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="flex justify-between items-center px-6 py-4 border-t border-stone-200 bg-stone-50">
          <div className="flex items-center gap-1.5 text-stone-500">
            <Info className="w-4 h-4 text-stone-400" />
            <span className="text-[10px] font-sans tracking-wide">Secure Server-Side API Proxy Enabled</span>
          </div>
          <button
            onClick={onClose}
            className="border border-stone-300 hover:border-stone-800 text-stone-700 hover:text-stone-900 px-4 py-2 text-xs font-semibold font-sans tracking-wider uppercase transition-colors"
          >
            Close Settings
          </button>
        </div>
      </div>
    </div>
  );
}
