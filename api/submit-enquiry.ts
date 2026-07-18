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
      fullName,
      phoneNumber,
      email,
      eventDate,
      expectedGuests,
      budget,
      interestedIn,
      message,
      selectedProduct,
      source,
    } = req.body;

    console.log(`📊 Lead captured from source: "${source || "Main Enquiry Form"}"`);

    const emailContent = `
================================================================================
✉️ NEW INCOMING LUXE LEAD DISPATCH (EKAANI WEDDING ATELIER)
================================================================================
Name: ${fullName || "Not Specified"}
Phone: ${phoneNumber || "Not Specified"}
Email: ${email || "Not Provided"}

Event Date: ${eventDate || "Not Specified"}
Guests: ${expectedGuests || "Not Specified"}
Budget: ${budget || "Not Specified"}
Interested In: ${interestedIn || "Not Specified"}
Selected Product: ${selectedProduct || "None"}

Message:
${message || "No message"}

Source: ${source || "Main Enquiry Form"}
`;

    console.log(emailContent);

    const formSubmitUrl =
      "https://formsubmit.co/ajax/testmailekaani@gmail.com";

    const forwardBody = {
      name: fullName || "Anonymous Client",
      phone: phoneNumber || "Not Specified",
      email: email || "Not Provided",
      event_date: eventDate || "Not Specified",
      guests: expectedGuests || "Not Specified",
      budget: budget || "Bespoke",
      interested_in: interestedIn || "General Wedding Collections",
      product: selectedProduct || "None",
      message: message || "Requested premium wedding consultation.",
      source: source || "Ekaani Luxe Web App",
      _subject: `New Luxe Lead: ${fullName || "Anonymous"} (${phoneNumber || ""})`,
    };

    const forwardResponse = await fetch(formSubmitUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(forwardBody),
    });

    if (forwardResponse.ok) {
      const forwardResult = await forwardResponse.json();

      console.log("FormSubmit Success:", forwardResult);
    } else {
      console.error(
        "FormSubmit Error:",
        forwardResponse.status,
        await forwardResponse.text()
      );
    }

    return res.status(200).json({
      success: true,
      message:
        "Lead successfully recorded and emailed to testmailekaani@gmail.com",
      recipient: "testmailekaani@gmail.com",
    });
  } catch (error: any) {
    console.error("Lead Submit Error:", error);

    return res.status(500).json({
      error: "Failed to dispatch lead.",
    });
  }
}
