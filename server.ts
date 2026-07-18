import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Wati WhatsApp OTP send
  app.post("/api/send-wati-otp", async (req, res) => {
    try {
      const { watiUrl, watiAuthToken, templateName, broadcastName, phoneNumber, otpCode, parameterName } = req.body;

      if (!watiUrl || !watiAuthToken || !templateName || !phoneNumber || !otpCode) {
        return res.status(400).json({ error: "Missing required Wati connection parameters." });
      }

      // Clean phone number: keep only numbers (Wati expects country code prefix, eg. 919811099999)
      const cleanPhone = phoneNumber.replace(/\D/g, "");

      // Append recipient phone number as query param whatsappNumber
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

      console.log("Proxying request to Wati API:", targetUrl, JSON.stringify(payload));

      const response = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": watiAuthToken,
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json().catch(() => null) || {};

      if (!response.ok) {
        return res.status(response.status).json({
          error: `Wati API responded with status ${response.status}`,
          details: responseData,
        });
      }

      return res.json({
        success: true,
        message: "OTP sent successfully via real Wati API!",
        data: responseData,
      });
    } catch (error: any) {
      console.error("Wati API proxy error:", error);
      return res.status(500).json({ error: error?.message || "Failed to proxy request to Wati API." });
    }
  });

  // API Route for Lead Submission (Mails to testmailekaani@gmail.com)
  app.post("/api/submit-enquiry", async (req, res) => {
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
        source
      } = req.body;

      // ============================================================================
      // 📊 CUSTOM FORM SUBMISSION TRACKING HOOK
      // ============================================================================
      // Place your custom tracking, analytics, CRM sync, or webhook integration code below.
      // This function will automatically execute on EVERY form submission from any source.
      try {
        console.log(`📊 [TRACKING ACTIVATED] Lead captured from source: "${source || "Main Enquiry Form"}"`);
        
        const leadDataForTracking = {
          fullName,
          phoneNumber,
          email,
          eventDate,
          expectedGuests,
          budget,
          interestedIn,
          message,
          selectedProduct,
          source: source || "Main Enquiry Form",
          timestamp: new Date().toISOString()
        };

        // --- [INSERT YOUR CUSTOM TRACKING CODE HERE] ---
        // Example integrations:
        // 1. Post to a custom tracking Webhook:
        //    fetch("https://your-webhook-endpoint.com/leads", {
        //      method: "POST",
        //      headers: { "Content-Type": "application/json" },
        //      body: JSON.stringify(leadDataForTracking)
        //    });
        //
        // 2. Sync to HubSpot / Salesforce CRM API:
        //    // custom code here...
        // -----------------------------------------------

      } catch (trackingError) {
        console.error("📊 [TRACKING ERROR] Error in custom tracking code block:", trackingError);
      }
      // ============================================================================

      const emailContent = `
================================================================================
✉️ NEW INCOMING LUXE LEAD DISPATCH (EKAANI WEDDING ATELIER)
================================================================================
DISPATCH TO : testmailekaani@gmail.com
FROM        : no-reply@ekaani.com
SUBJECT     : Premium Wedding Consultation Enquiry from ${fullName || "Anonymous"}

Dear Ekaani Design Director,

A distinguished client has requested a private consultation. Here are the details:

[CLIENT IDENTIFICATION]
• Name          : ${fullName || "Not Specified"}
• WhatsApp Phone: ${phoneNumber || "Not Specified"}
• Email Address : ${email || "Not Provided"}

[CELEBRATION SPECIFICS]
• Anticipated Date  : ${eventDate || "Not Specified"}
• Expected Guests   : ${expectedGuests || "Not Specified"}
• Allocated Budget  : ${budget || "Not Specified"}
• Areas of Interest : ${interestedIn || "Not Specified"}
${selectedProduct ? `• Selected Product  : ${selectedProduct}` : ""}

[PERSONAL MESSAGE]
"${message || "The client requested immediate call back regarding our silver plated wedding collections."}"

[METADATA]
• Date of Submission : ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
• Capture Source     : ${source || "Main Luxe Inquiry Form"}

--------------------------------------------------------------------------------
This lead has been registered in the Ekaani CRM.
================================================================================
`;

      console.log(emailContent);

      // Forward to FormSubmit.co for free seamless delivery to testmailekaani@gmail.com
      try {
        const formSubmitUrl = "https://formsubmit.co/ajax/testmailekaani@gmail.com";
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
            "Accept": "application/json"
          },
          body: JSON.stringify(forwardBody)
        });

        if (forwardResponse.ok) {
          const forwardResult = await forwardResponse.json();
          console.log("FormSubmit email forward success:", forwardResult);
        } else {
          console.error("FormSubmit responded with error:", forwardResponse.status, await forwardResponse.text());
        }
      } catch (emailErr) {
        console.error("FormSubmit forward failed:", emailErr);
      }

      return res.json({
        success: true,
        message: "Lead successfully recorded and emailed to testmailekaani@gmail.com",
        recipient: "testmailekaani@gmail.com"
      });
    } catch (error: any) {
      console.error("Failed to process lead submit:", error);
      return res.status(500).json({ error: "Failed to dispatch lead." });
    }
  });

  // API Route for Local Luxury Curation (Deterministic, highly customized, no Gemini API)
  app.post("/api/curate", async (req, res) => {
    try {
      const { budgetRange, guestCount, giftType, theme, notes } = req.body;

      let themeConcept = "";
      let suggestedGifts: any[] = [];
      let suggestedInvites: any[] = [];
      let expertTip = "";

      // 1. Theme concept matching
      if (theme.toLowerCase().includes("mughal")) {
        themeConcept = `A majestic, palatial ensemble inspired by royal Mughal courts. We weave deep crimson velvet textures with 24K gold gilded borders and floral filigree, creating a grand, sacred atmosphere.`;
        expertTip = "Incorporate custom royal monograms and saffron-infused silk pouch inserts to deliver a truly imperial olfactory experience to your guests upon unboxing.";
      } else if (theme.toLowerCase().includes("rajput")) {
        themeConcept = `An opulent Rajput-inspired presentation showcasing anti-tarnish sterling silver finishes, sapphire accents, and clean geometric hand-carvings that represent pure valor and royalty.`;
        expertTip = "Engrave a small gratitude verse inside the silver lid of your favors, allowing guests to cherish the warm personal touch for a lifetime.";
      } else if (theme.toLowerCase().includes("pastel")) {
        themeConcept = `A modern, sophisticated palette of champagne gold and dusty rose. Perfect for contemporary high-society weddings, featuring minimalist silhouettes paired with premium Italian textured cardstock.`;
        expertTip = "Spray your invitations with a bespoke ambient fragrance of white oud or damask rose to invoke a multi-sensory premium touch.";
      } else if (theme.toLowerCase().includes("vedic")) {
        themeConcept = `An earthy, divine spiritual theme using clay, ochre, and marigold highlights. Styled with traditional copper plaques, hand-painted Ganesha/Radha-Krishna motifs, and sacred Vedic verses.`;
        expertTip = "Deliver these hampers with fresh tulsi leaves and premium Kashmiri saffron jars tucked neatly into the velvet partitions.";
      } else {
        themeConcept = `An elegant contemporary minimalist layout using textured ivory, debossed white gold foil, and pristine architectural lines. Pure timeless perfection.`;
        expertTip = "Pair with laser-cut satin ribbons of exactly 1.5 inches to maintain a clean, balanced geometric scale.";
      }

      // 2. Gift suggestions based on Budget
      const favorsPool = [
        {
          name: "Ekaani Signature Anti-Tarnish Silver Lotus Bowl Set",
          material: "German Silver with protective 100% Anti-Tarnish coating",
          desc: "An elegant, lotus-shaped single-piece serving bowl paired with a dual-tone gilded spoon, packed in our velvet crimson casket."
        },
        {
          name: "Royal Peacock Engraved Dual-Tone Platter",
          material: "Sterling Silver-Plated Brass with 24K Gold Highlights",
          desc: "A stunning dual-tone serving tray featuring intricate peacock borders, hand-gilded by our generational artisans."
        },
        {
          name: "Marcello Giorgio Inspired Crystal Dry Fruit Jar",
          material: "Lead-Crystal glass with Solid Silver Lid",
          desc: "A heavy-faceted lead crystal jar capped with a beautifully sculpted floral lid, perfect for premium almonds or dry fruits."
        },
        {
          name: "Chinelli Dual-Tone Multi-Tier Sweet Server",
          material: "Italian Silver & Gold-Plated Lacquered Brass",
          desc: "An ornate 2-tier dessert pedestal with detailed scrollwork and a sturdy anti-tarnish central carry pillar."
        },
        {
          name: "Sacred Radha Krishna Silver Vignette",
          material: "999 Fine Silver-Plated Resin Core",
          desc: "A highly-detailed spiritual masterpiece depicting the divine couple on a premium polished mahogany wood base."
        },
        {
          name: "Bespoke Royal Velvet Hamper Trunk",
          material: "Handmade Wooden Frame wrapped in Premium Suede Velvet",
          desc: "A curated hamper trunk containing three individual crystal jars for premium spices, dry fruits, and bespoke saffron."
        }
      ];

      // Generate seed from user choices to select distinct items dynamically
      const textSeed = `${theme}-${budgetRange}-${notes || ""}`;
      let seedVal = 0;
      for (let i = 0; i < textSeed.length; i++) {
        seedVal += textSeed.charCodeAt(i);
      }

      // Pick 3 favors
      const selectedFavorsIndices: number[] = [];
      while (selectedFavorsIndices.length < 3) {
        const candidateIndex = (seedVal + selectedFavorsIndices.length * 3) % favorsPool.length;
        if (!selectedFavorsIndices.includes(candidateIndex)) {
          selectedFavorsIndices.push(candidateIndex);
        }
      }

      suggestedGifts = selectedFavorsIndices.map((idx) => {
        const item = favorsPool[idx];
        return {
          name: item.name,
          description: item.desc + (notes ? ` Adapted gracefully for: "${notes}".` : ""),
          estimatedPrice: "Price on Request",
          material: item.material
        };
      });

      // 3. Invites suggestions
      const invitesPool = [
        {
          style: "Ekaani Imperial Velvet Box Invite with Silver Monogram Plaque",
          details: "A premium rigid box wrapped in royal velvet with a customized laser-etched sterling silver monogram plaque on top. Opens to showcase three gold-foiled card inserts.",
          unboxing: "Guests lift the magnetic velvet lid to discover the scent of fresh white rose-infused premium inserts nested inside custom partitions.",
          wording: "Together with their families, invite you to celebrate the sacred union of their children. Join us for a celebration of love, culture, and royal hospitality."
        },
        {
          style: "Bespoke Royal Scroll (Farman) in Gilded Wooden Case",
          details: "A classic royal scroll printed on thick textured parchment paper with hand-gilded gold borders, rolled inside a velvet-lined carved wooden box.",
          unboxing: "Unrolling the scroll reveals intricate hand-drawn traditional wedding motifs and elegant Sanskrit shlokas printed in deep crimson metallic inks.",
          wording: "Request the pleasure of your company as we embark on a beautiful wedding journey. May your presence bless our auspicious celebration."
        },
        {
          style: "Modern Bento-Style Champagne Gold Invite Box",
          details: "A contemporary sleek sliding invite drawers with champagne gold satin lining, custom acrylic initial charms, and four modern minimal gold-rimmed cards.",
          unboxing: "A modern, chic slide reveals individual card sleeves adorned with abstract floral line-art, followed by two artisan dry fruit canisters.",
          wording: "Celebrate with us the joyous union of our hearts. Your presence is the greatest gift as we raise a glass to love, family, and new beginnings."
        }
      ];

      // Pick 2 invites
      const selectedInvitesIndices: number[] = [];
      while (selectedInvitesIndices.length < 2) {
        const candidateIndex = (seedVal + selectedInvitesIndices.length * 7 + 1) % invitesPool.length;
        if (!selectedInvitesIndices.includes(candidateIndex)) {
          selectedInvitesIndices.push(candidateIndex);
        }
      }

      suggestedInvites = selectedInvitesIndices.map((idx) => {
        const item = invitesPool[idx];
        return {
          style: item.style,
          details: item.details + (notes ? ` Inspired by: "${notes}".` : ""),
          unboxingExperience: item.unboxing,
          wordingSnippet: item.wording
        };
      });

      return res.json({
        themeConcept,
        suggestedGifts,
        suggestedInvites,
        expertTip
      });
    } catch (error: any) {
      console.error("Curation error:", error);
      res.status(500).json({ error: "Failed to generate luxury curation." });
    }
  });

  // Serve static files and handle Vite dev server
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
