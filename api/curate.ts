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
    const { budgetRange, guestCount, giftType, theme, notes } = req.body;

    let themeConcept = "";
    let expertTip = "";

    // Theme Matching
    if ((theme || "").toLowerCase().includes("mughal")) {
      themeConcept =
        "A majestic Mughal-inspired wedding experience with crimson velvet, floral filigree and 24K gold detailing.";
      expertTip =
        "Add custom royal monograms and saffron-infused pouches for a luxurious unboxing.";
    } else if ((theme || "").toLowerCase().includes("rajput")) {
      themeConcept =
        "An opulent Rajput-inspired presentation with silver finishes and sapphire accents.";
      expertTip =
        "Engrave a gratitude verse inside each silver gift.";
    } else if ((theme || "").toLowerCase().includes("pastel")) {
      themeConcept =
        "A champagne gold and dusty rose contemporary luxury wedding theme.";
      expertTip =
        "Use white oud fragrance on invitation cards.";
    } else if ((theme || "").toLowerCase().includes("vedic")) {
      themeConcept =
        "Traditional Vedic styling with marigold, copper and sacred motifs.";
      expertTip =
        "Include premium saffron jars inside hampers.";
    } else {
      themeConcept =
        "Minimal ivory and white-gold luxury wedding styling.";
      expertTip =
        "Use premium satin ribbons for a timeless finish.";
    }

    const suggestedGifts = [
      {
        name: "Ekaani Signature Anti-Tarnish Silver Lotus Bowl",
        estimatedPrice: "Price on Request",
      },
      {
        name: "Royal Peacock Silver Platter",
        estimatedPrice: "Price on Request",
      },
      {
        name: "Crystal Dry Fruit Jar",
        estimatedPrice: "Price on Request",
      },
    ];

    const suggestedInvites = [
      {
        style: "Velvet Box Invitation",
      },
      {
        style: "Royal Scroll Invitation",
      },
    ];

    return res.status(200).json({
      themeConcept,
      suggestedGifts,
      suggestedInvites,
      expertTip,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to generate luxury curation.",
    });
  }
}
