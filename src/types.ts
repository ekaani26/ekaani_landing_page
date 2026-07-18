export interface Product {
  id: string;
  name: string;
  category: "invitations" | "favors" | "bespoke";
  description: string;
  image: string;
  material: string;
  estimatedPrice?: string;
  occasion?: "Wedding" | "Anniversary" | "Return Gift" | "Wedding Hampers" | "Trays";
  priceValue?: number;
  reelsVideo?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl?: string;
}

export interface BrandPartner {
  name: string;
  logoText: string;
  subtext?: string;
  logoUrl?: string;
}

export interface CurationRequest {
  budgetRange: string;
  guestCount: number;
  giftType: string;
  theme: string;
  notes: string;
}

export interface CurationGift {
  name: string;
  description: string;
  estimatedPrice: string;
  material: string;
}

export interface CurationInvite {
  style: string;
  details: string;
  unboxingExperience: string;
  wordingSnippet: string;
}

export interface CurationResponse {
  themeConcept: string;
  suggestedGifts: CurationGift[];
  suggestedInvites: CurationInvite[];
  expertTip: string;
}
