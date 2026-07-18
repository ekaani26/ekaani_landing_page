import { Product, VideoItem, BrandPartner } from "./types";

export const BRAND_PARTNERS: BrandPartner[] = [
  {
    name: "Reliance",
    logoText: "RELIANCE",
    subtext: "Enterprise Gifting",
    logoUrl: "https://cdn.shopify.com/s/files/1/0748/5014/0446/files/RELIANCE.png?v=1783321913"
  },
  {
    name: "Emaar",
    logoText: "EMAAR",
    subtext: "Luxury Real Estate Partner",
    logoUrl: "https://cdn.shopify.com/s/files/1/0748/5014/0446/files/EMAAR.png?v=1783321914"
  },
  {
    name: "Gaurs",
    logoText: "GAURS",
    subtext: "Prestige Group",
    logoUrl: "https://cdn.shopify.com/s/files/1/0748/5014/0446/files/GAURS.png?v=1783321913"
  },
  {
    name: "Kotak",
    logoText: "KOTAK",
    subtext: "Elite Banking Partner",
    logoUrl: "https://cdn.shopify.com/s/files/1/0748/5014/0446/files/KOTAK.png?v=1783321913"
  },
  {
    name: "Aditya Birla",
    logoText: "ADITYA BIRLA",
    subtext: "Premium Corporate Gifting",
    logoUrl: "https://cdn.shopify.com/s/files/1/0748/5014/0446/files/ADITYA_BIRLA.png?v=1783321914"
  },
  {
    name: "JK Lakshmi Cement",
    logoText: "JK LAKSHMI",
    subtext: "Corporate Celebrations",
    logoUrl: "https://cdn.shopify.com/s/files/1/0748/5014/0446/files/JK_LAKSHMI_CEMENT.png?v=1783321913"
  }
];

export const MAJESTIC_INVITATIONS: Product[] = [
  {
    id: "mi-1",
    name: "Royal Ivory Floral Celebration Box",
    category: "invitations",
    description: "An elegant premium ivory celebration box filled with handcrafted sweet jars, custom tea blends, and gold-plated details.",
    material: "Handcrafted Wood & Velvet Inner Lining",
    image: "https://cdn.shopify.com/s/files/1/0748/5014/0446/files/01_27.jpg?v=1783925413",
    estimatedPrice: "₹4,800",
    occasion: "Wedding Hampers",
    priceValue: 4800,
    reelsVideo: "https://cdn.shopify.com/videos/c/o/v/78603a0b8a694a49a59d6eb5f35c4ad0.mp4"
  },
  {
    id: "mi-2",
    name: "Emperor's Elite Gifting Suite",
    category: "invitations",
    description: "Traditional scroll style updated with a contemporary ivory and soft pink palette, housed in an exquisite silver-gilt presentation trunk.",
    material: "German Silver & Premium Imported Textured Paper",
    image: "https://cdn.shopify.com/s/files/1/0748/5014/0446/files/11_2cd87976-be2f-40ed-b651-129d33530c12.jpg?v=1783762106",
    estimatedPrice: "₹3,200",
    occasion: "Wedding",
    priceValue: 3200,
    reelsVideo: "https://cdn.shopify.com/videos/c/o/v/407efcfa56c34d829d929a61b0e825bb.mp4"
  },
  {
    id: "mi-3",
    name: "Imperial Gilded Saffron & Sweets Trunk",
    category: "invitations",
    description: "Opulent presentation box showcasing custom-labeled gourmet jars of Kashmiri saffron and handpicked Iranian dry fruits.",
    material: "Gold-Leaf Embossed Cardboard with Velvet Trays",
    image: "https://cdn.shopify.com/s/files/1/0748/5014/0446/files/01_20.jpg?v=1783925414",
    estimatedPrice: "₹3,900",
    occasion: "Wedding Hampers",
    priceValue: 3900,
    reelsVideo: "https://cdn.shopify.com/videos/c/o/v/1a349b005a1f4ee9b50ab55885e8e556.mp4"
  },
  {
    id: "mi-4",
    name: "Divine Blessing Royal Hamper",
    category: "invitations",
    description: "Fold-out luxury layout inspired by Indian palace courtyards, portraying traditional motifs with gold and silver leafing.",
    material: "24K Gold Foil Embossed Parchment",
    image: "https://cdn.shopify.com/s/files/1/0748/5014/0446/files/Divine_03_1.jpg?v=1768543315",
    estimatedPrice: "₹2,800",
    occasion: "Wedding",
    priceValue: 2800,
    reelsVideo: "https://cdn.shopify.com/videos/c/o/v/6f33f3c8be1e4539a8e9261de22a30f7.mp4"
  }
];

export const RETURN_FAVORS: Product[] = [
  {
    id: "rf-1",
    name: "Imperial Dry Fruit Gifting Bowl Platter",
    category: "favors",
    description: "A gorgeous multi-compartment silver bowl platter on an elevated gold-plated stand, perfect for premium wedding favors.",
    material: "Italian Silver-Plated Brass with Protective Coating",
    image: "https://cdn.shopify.com/s/files/1/0748/5014/0446/files/Home_03.jpg?v=1768543333",
    estimatedPrice: "₹2,400",
    occasion: "Trays",
    priceValue: 2400,
    reelsVideo: "https://cdn.shopify.com/videos/c/o/v/78603a0b8a694a49a59d6eb5f35c4ad0.mp4"
  },
  {
    id: "rf-2",
    name: "Divine Grace Puja & Gifting Trunk",
    category: "favors",
    description: "Classic design celebrating traditional values, equipped with solid foundations and premium protective sealing.",
    material: "925 Sterling Silver Plating",
    image: "https://cdn.shopify.com/s/files/1/0748/5014/0446/files/Divine_03_1.jpg?v=1768543315",
    estimatedPrice: "₹4,800",
    occasion: "Return Gift",
    priceValue: 4800,
    reelsVideo: "https://cdn.shopify.com/videos/c/o/v/407efcfa56c34d829d929a61b0e825bb.mp4"
  },
  {
    id: "rf-3",
    name: "Luxe Celebration Gifting Box",
    category: "favors",
    description: "Elite wedding hamper presenting dry fruits, handcrafted silver-plated diyas, and authentic Ekaani certification.",
    material: "Silver Filigree & Fine Teakwood Frame",
    image: "https://cdn.shopify.com/s/files/1/0748/5014/0446/files/11_2cd87976-be2f-40ed-b651-129d33530c12.jpg?v=1783762106",
    estimatedPrice: "₹1,800",
    occasion: "Return Gift",
    priceValue: 1800,
    reelsVideo: "https://cdn.shopify.com/videos/c/o/v/1a349b005a1f4ee9b50ab55885e8e556.mp4"
  },
  {
    id: "rf-4",
    name: "Exquisite Sweets & Silver Platter Set",
    category: "favors",
    description: "Delicate silver tray displaying individual compartments for gourmet delights, customized for high-end wedding guests.",
    material: "Chiselled Silver Over Wood Core",
    image: "https://cdn.shopify.com/s/files/1/0748/5014/0446/files/Gifting_03.jpg?v=1768543332",
    estimatedPrice: "₹3,500",
    occasion: "Trays",
    priceValue: 3500,
    reelsVideo: "https://cdn.shopify.com/videos/c/o/v/6f33f3c8be1e4539a8e9261de22a30f7.mp4"
  },
  {
    id: "rf-5",
    name: "Silver Plated Leaf Accent Bowl",
    category: "favors",
    description: "Handcrafted miniature dry fruit serving bowl with elegant leaf handles, a beloved high-value token of gratitude.",
    material: "Fine EPNS Silver Plated Brass",
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=500&auto=format&fit=crop&q=80",
    estimatedPrice: "₹950",
    occasion: "Return Gift",
    priceValue: 950
  },
  {
    id: "rf-6",
    name: "Elite Silver Diya & Incense Set",
    category: "favors",
    description: "Exquisite silver plated puja items packaged in a luxury velvet pouch with handcrafted organic incense sticks.",
    material: "Ekaani Premium Sterling Silver",
    image: "https://images.unsplash.com/photo-1609137144813-91b346901848?w=500&auto=format&fit=crop&q=80",
    estimatedPrice: "₹750",
    occasion: "Return Gift",
    priceValue: 750
  },
  {
    id: "rf-7",
    name: "Crystal & Silver Royal Jar",
    category: "favors",
    description: "Single stunning heavy lead-crystal jar capped with a floral silver-plated brass lid. Ideal for mukhwas or premium saffron.",
    material: "Czech Lead Crystal & German Silver",
    image: "https://cdn.shopify.com/s/files/1/0748/5014/0446/files/RamDarbar2_1.jpg?v=1784361712",
    estimatedPrice: "₹1,250",
    occasion: "Anniversary",
    priceValue: 1250
  }
];

export const BESPOKE_SUITES: Product[] = [
  {
    id: "bs-1",
    name: "Palatial Gold Wedding Scroll Suite",
    category: "bespoke",
    description: "Exquisite presentation hamper that opens to reveal heavy-weight textured cards with laser-engraved gold details.",
    material: "Embossed Brocade Fabric & Gold Acrylic Sheets",
    image: "https://cdn.shopify.com/s/files/1/0748/5014/0446/files/Wedding_03.jpg?v=1768543333",
    estimatedPrice: "₹5,200",
    occasion: "Wedding",
    priceValue: 5200,
    reelsVideo: "https://cdn.shopify.com/videos/c/o/v/78603a0b8a694a49a59d6eb5f35c4ad0.mp4"
  },
  {
    id: "bs-2",
    name: "Tuscan Garden Pastel Gift Set",
    category: "bespoke",
    description: "A breath of fresh air featuring botanical motifs paired with delicate gold-plated corners and a custom wax seal closure.",
    material: "French Matte Paper & Custom Gold Wax Seal",
    image: "https://cdn.shopify.com/s/files/1/0748/5014/0446/files/Home_03.jpg?v=1768543333",
    estimatedPrice: "₹3,900",
    occasion: "Anniversary",
    priceValue: 3900,
    reelsVideo: "https://cdn.shopify.com/videos/c/o/v/407efcfa56c34d829d929a61b0e825bb.mp4"
  },
  {
    id: "bs-3",
    name: "Palatial Brocade Heritage Gifting Box",
    category: "bespoke",
    description: "Traditional design updated with a contemporary pastel mint border, containing solid polished silver diyas and almond jars.",
    material: "Silk Brocade Outer Lining & Polish Accents",
    image: "https://cdn.shopify.com/s/files/1/0748/5014/0446/files/8_4fb44446-727e-4047-936d-84142d2d4910.jpg?v=1783925440",
    estimatedPrice: "₹5,500",
    occasion: "Wedding Hampers",
    priceValue: 5500,
    reelsVideo: "https://cdn.shopify.com/videos/c/o/v/1a349b005a1f4ee9b50ab55885e8e556.mp4"
  },
  {
    id: "bs-4",
    name: "Vedic Sun Mandala Gifting Suite",
    category: "bespoke",
    description: "Modern minimalism meets heritage geometry. Highly detailed solar mandala laser cuts with champagne gold foil finishes.",
    material: "Champagne Gold Foiled Cardstock",
    image: "https://cdn.shopify.com/s/files/1/0748/5014/0446/files/Gifting_03.jpg?v=1768543332",
    estimatedPrice: "₹4,100",
    occasion: "Anniversary",
    priceValue: 4100,
    reelsVideo: "https://cdn.shopify.com/videos/c/o/v/6f33f3c8be1e4539a8e9261de22a30f7.mp4"
  },
  {
    id: "bs-5",
    name: "Ekaani Signature Sterling Silver Platter Suite",
    category: "bespoke",
    description: "A premium masterwork gift trunk displaying a heavily-chiselled silver plated bowl platter, custom invites, and dry fruit assortments.",
    material: "German Silver Plating on Brass Base",
    image: "https://cdn.shopify.com/s/files/1/0748/5014/0446/files/DSC9703.jpg?v=1784360536",
    estimatedPrice: "₹8,500",
    occasion: "Wedding",
    priceValue: 8500,
    reelsVideo: "https://cdn.shopify.com/videos/c/o/v/6f33f3c8be1e4539a8e9261de22a30f7.mp4"
  },
  {
    id: "bs-6",
    name: "Grand Royal Gold Leafing Sweet Trunk",
    category: "bespoke",
    description: "Handcrafted micro-trunk adorned with 24K gold foil motifs, containing gourmet sweets, silver plated coin favors, and organic candles.",
    material: "Italian Velvet Cover with Brass Latches",
    image: "https://cdn.shopify.com/s/files/1/0748/5014/0446/files/17_91f2b6f3-4e69-4431-8049-c54a37f07438.jpg?v=1784360519",
    estimatedPrice: "₹12,000",
    occasion: "Wedding",
    priceValue: 12000,
    reelsVideo: "https://cdn.shopify.com/videos/c/o/v/78603a0b8a694a49a59d6eb5f35c4ad0.mp4"
  },
  {
    id: "bs-7",
    name: "Gilded Mandala Velvet Favor Box",
    category: "bespoke",
    description: "Our signature circular favor box with deep maroon velvet covering, laser-cut gold mandala designs, and gourmet sweet boxes.",
    material: "Deep Velvet Outer Shell with Gold Laser Acrylic",
    image: "https://cdn.shopify.com/s/files/1/0748/5014/0446/files/03_3098a52e-92a9-480b-ba01-5bf300b9d69d.jpg?v=1784360459",
    estimatedPrice: "₹6,200",
    occasion: "Wedding Hampers",
    priceValue: 6200,
    reelsVideo: "https://cdn.shopify.com/videos/c/o/v/407efcfa56c34d829d929a61b0e825bb.mp4"
  },
  {
    id: "bs-8",
    name: "Royal Sterling Silver Antique Teapot",
    category: "bespoke",
    description: "An exquisite heritage masterwork, hand-engraved antique silver teapot with detailed scroll-work and ornamental handle.",
    material: "Premium Silver Plated Solid Brass",
    image: "https://cdn.shopify.com/s/files/1/0748/5014/0446/files/DSC04786.jpg?v=1784361274",
    estimatedPrice: "₹18,500",
    occasion: "Wedding",
    priceValue: 18500,
    reelsVideo: "https://cdn.shopify.com/videos/c/o/v/78603a0b8a694a49a59d6eb5f35c4ad0.mp4"
  },
  {
    id: "bs-9",
    name: "Heritage Floral Engraved Silver Pitcher",
    category: "bespoke",
    description: "Stunning classical style presentation pitcher with fine-etched floral relief details, perfect for modern royal tables.",
    material: "Premium Sterling Silver Plating",
    image: "https://cdn.shopify.com/s/files/1/0748/5014/0446/files/DSC04790.jpg?v=1784361258",
    estimatedPrice: "₹16,200",
    occasion: "Wedding",
    priceValue: 16200,
    reelsVideo: "https://cdn.shopify.com/videos/c/o/v/407efcfa56c34d829d929a61b0e825bb.mp4"
  },
  {
    id: "bs-10",
    name: "Gilded Royal Peacock Service Bowl",
    category: "bespoke",
    description: "Opulent presentation bowl featuring magnificent hand-sculpted golden peacock accents on a polished silver base.",
    material: "24K Gold Leaf Accents & German Silver",
    image: "https://cdn.shopify.com/s/files/1/0748/5014/0446/files/14-40.jpg?v=1784361189",
    estimatedPrice: "₹9,800",
    occasion: "Wedding",
    priceValue: 9800,
    reelsVideo: "https://cdn.shopify.com/videos/c/o/v/1a349b005a1f4ee9b50ab55885e8e556.mp4"
  },
  {
    id: "bs-11",
    name: "Imperial Dual-Tone Royal Tray",
    category: "bespoke",
    description: "A glorious multi-tiered dual-tone serving tray with gold-plated geometric borders, designed for ultra-luxe celebrations.",
    material: "Dual-Tone Gold and Silver Plating",
    image: "https://cdn.shopify.com/s/files/1/0748/5014/0446/files/14-38.jpg?v=1784361188",
    estimatedPrice: "₹7,500",
    occasion: "Wedding",
    priceValue: 7500,
    reelsVideo: "https://cdn.shopify.com/videos/c/o/v/6f33f3c8be1e4539a8e9261de22a30f7.mp4"
  }
];

export const INVITATION_VIDEOS: VideoItem[] = [
  {
    id: "vid-1",
    title: "Exclusive Design 01",
    thumbnail: "https://images.unsplash.com/photo-1519225495810-7512c696505a?w=500&auto=format&fit=crop&q=80",
    videoUrl: "https://cdn.shopify.com/videos/c/o/v/78603a0b8a694a49a59d6eb5f35c4ad0.mp4"
  },
  {
    id: "vid-2",
    title: "Exclusive Design 02",
    thumbnail: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&auto=format&fit=crop&q=80",
    videoUrl: "https://cdn.shopify.com/videos/c/o/v/407efcfa56c34d829d929a61b0e825bb.mp4"
  },
  {
    id: "vid-3",
    title: "Exclusive Design 03",
    thumbnail: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=500&auto=format&fit=crop&q=80",
    videoUrl: "https://cdn.shopify.com/videos/c/o/v/1a349b005a1f4ee9b50ab55885e8e556.mp4"
  },
  {
    id: "vid-4",
    title: "Exclusive Design 04",
    thumbnail: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=500&auto=format&fit=crop&q=80",
    videoUrl: "https://cdn.shopify.com/videos/c/o/v/6f33f3c8be1e4539a8e9261de22a30f7.mp4"
  }
];
