import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const {
      watiUrl,
      watiAuthToken,
      templateName,
      broadcastName,
      phoneNumber,
      otpCode,
      parameterName,
    } = req.body;

    if (!watiUrl || !watiAuthToken || !templateName || !phoneNumber || !otpCode) {
      return res.status(400).json({
        error: "Missing required Wati connection parameters.",
      });
    }

    // Keep only digits
    const cleanPhone = phoneNumber.replace(/\D/g, "");

    // Append whatsappNumber query parameter
    const separator = watiUrl.includes("?") ? "&" : "?";
    const targetUrl = `${watiUrl}${separator}whatsappNumber=${cleanPhone}`;

    const payload = {
      template_name: templateName,
      broadcast_name: broadcastName || "Ekaani OTP Verification",
      parameters: [
        {
          name: parameterName || "otp",
          value: otpCode,
        },
      ],
    };

    console.log("Proxying request to Wati API:", targetUrl);

    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: watiAuthToken,
      },
      body: JSON.stringify(payload),
    });

    const responseData =
      (await response.json().catch(() => null)) || {};

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Wati API responded with status ${response.status}`,
        details: responseData,
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully via real Wati API!",
      data: responseData,
    });
  } catch (error: any) {
    console.error("Wati API proxy error:", error);

    return res.status(500).json({
      error: error?.message || "Failed to proxy request to Wati API.",
    });
  }
}
