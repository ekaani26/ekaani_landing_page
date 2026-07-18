import { useState, useRef, FormEvent } from "react";
import { MapPin, Phone, ExternalLink, Search, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

interface Store {
  name: string;
  address: string;
  city: string;
  phone: string;
  directionsUrl: string;
}

const STORE_LOCATIONS: Store[] = [
  {
    name: "Ekaani - Ahmedabad",
    address: "Deora house, Mithakhali 6 roads Navrangpura, Near LG showroom, Rashmi society, Ahmedabad, Gujarat 380009",
    city: "Ahmedabad",
    phone: "7405318000",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=Ekaani+Ahmedabad+Deora+house+Mithakhali+6+roads+Navrangpura"
  },
  {
    name: "Ekaani - Amaaris (Bengaluru)",
    address: "2/2, Lavelle Road, opp. Hulkul Brigade Centre, Ashok Nagar, Bengaluru, Karnataka 560001",
    city: "Bengaluru",
    phone: "9663902544",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=Ekaani+Amaaris+2+2+Lavelle+Road+Bengaluru"
  },
  {
    name: "Ekaani - Breach Candy (Mumbai)",
    address: "Sagar Mansion Building, Warden Rd, Breach Candy, Cumballa Hill, Mumbai, Maharashtra 400026",
    city: "Mumbai",
    phone: "9833511899",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=Ekaani+Breach+Candy+Sagar+Mansion+Building+Warden+Rd"
  },
  {
    name: "Ekaani - Chandigarh",
    address: "Nexus Elante Mall, 2nd Floor, Opposite Cafe Coffee Day, Chandigarh, Punjab 160002",
    city: "Chandigarh",
    phone: "9041442200",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=Ekaani+Chandigarh+Nexus+Elante+Mall+2nd+Floor"
  },
  {
    name: "Ekaani - Defence Colony (Delhi)",
    address: "A-274, Defence Colony, Bhisham Pitamaha Marg, New Delhi 110024",
    city: "Delhi NCR",
    phone: "9811123226",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=Ekaani+Defence+Colony+A-274+Bhisham+Pitamaha+Marg+New+Delhi"
  },
  {
    name: "Ekaani - Guwahati",
    address: "Pancham Tower, 1st Floor, B-1, GS Rd, Ulubari, Guwahati, Assam 781007",
    city: "Guwahati",
    phone: "9864021056",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=Ekaani+Guwahati+Pancham+Tower+1st+Floor+GS+Rd+Ulubari"
  },
  {
    name: "Ekaani - Hyderabad",
    address: "Plot No.1 & 2, Survey No. 403/1, Nandagiri Hills, Next to BMW Showroom Main Road, Jubilee Hills, Hyderabad, Telangana 500033",
    city: "Hyderabad",
    phone: "9650360047",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=Ekaani+Hyderabad+Plot+No+1+2+Nandagiri+Hills+Jubilee+Hills"
  },
  {
    name: "Ekaani - Juhu (Mumbai)",
    address: "Shop No 9-10, Valencia Condominium, Juhu Tara Rd, Near Hotel Ajanta Palace, Opp Estella, Mumbai, Maharashtra 400049",
    city: "Mumbai",
    phone: "9833511899",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=Ekaani+Juhu+Valencia+Condominium+Juhu+Tara+Road"
  },
  {
    name: "Ekaani - Khan Market (Delhi)",
    address: "55A, Khan Market, Rabindra Nagar, New Delhi, Delhi 110003",
    city: "Delhi NCR",
    phone: "9718294995",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=Ekaani+Khan+Market+55A+Rabindra+Nagar+New+Delhi"
  },
  {
    name: "Ekaani - Khar (Mumbai)",
    address: "A-2, Prem Sagar, Next to City Walk Shoes, Linking Road, Khar, Mumbai, Maharashtra 400052",
    city: "Mumbai",
    phone: "9833511899",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=Ekaani+Khar+Prem+Sagar+Linking+Road"
  },
  {
    name: "Ekaani - South Ex 2 (Delhi)",
    address: "E-22, Second Floor, South Ex-2, Main Market, Above Miniso, New Delhi, Delhi 110049",
    city: "Delhi NCR",
    phone: "9811123226",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=Ekaani+South+Ex+2+E-22+Second+Floor+Main+Market"
  },
  {
    name: "Ekaani Kinerhs Collection (Pune)",
    address: "Shop C4 Hermes Waves, Prathmesh Society, Diagonally Opp Elephant Co., Kalyani Nagar, Pune, Maharashtra 411016",
    city: "Pune",
    phone: "9820079349",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=Ekaani+Kinerhs+Collection+Kalyani+Nagar+Pune"
  },
  {
    name: "Ekaani - MG Road (Delhi NCR)",
    address: "No. 432, 433, Basement Opp Khasra, 434, Mehrauli-Gurgaon Rd, Sultanpur, New Delhi, Delhi 110030",
    city: "Delhi NCR",
    phone: "9911501509",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=Ekaani+MG+Road+Sultanpur+Mehrauli+Gurgaon+Rd"
  },
  {
    name: "Ekaani - Jaipur",
    address: "#37 & 38, Rathore Nagar, Vaishali Nagar, Jaipur, Rajasthan 302021",
    city: "Jaipur",
    phone: "9929006555",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=Ekaani+Jaipur+Vaishali+Nagar+Rathore+Nagar"
  },
  {
    name: "Studio Level 1 (Kolkata)",
    address: "Neelamber Building, 1st Floor, 28B, Shakespeare Sarani, Kolkata, West Bengal 700017",
    city: "Kolkata",
    phone: "9163075151",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=Studio+Level+1+Ekaani+Neelamber+Building+Shakespeare+Sarani+Kolkata"
  }
];

const CITIES = ["All", "Delhi NCR", "Mumbai", "Bengaluru", "Ahmedabad", "Jaipur", "Kolkata", "Chandigarh", "Hyderabad", "Pune", "Guwahati"];

export default function StoreLocations() {
  const [selectedCity, setSelectedCity] = useState("All");
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const scrollTrackRef = useRef<HTMLDivElement>(null);

  // Trigger search on button click or Enter key
  const handleSearchSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();
    setSearchQuery(inputValue);
  };

  const filteredStores = STORE_LOCATIONS.filter(store => {
    const matchesCity = selectedCity === "All" || store.city === selectedCity;
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          store.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  const handleScroll = (direction: "left" | "right") => {
    if (scrollTrackRef.current) {
      const scrollAmount = 350;
      scrollTrackRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="store-locations" className="py-24 bg-[#FAF9F6] border-b border-stone-200/50 relative scroll-mt-20">
      
      {/* Exquisite Top Framing Line */}
      <div className="absolute top-0 inset-x-0 flex justify-center">
        <div className="w-1/3 h-[1px] bg-stone-300" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Hermes Style Minimalist Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] tracking-[0.35em] text-[#d4af37] font-semibold uppercase block">
            Maison Ekaani Boutiques
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-stone-900 tracking-wider font-light uppercase">
            Our Store Locations
          </h2>
          <div className="flex justify-center items-center gap-3">
            <span className="w-12 h-[0.5px] bg-stone-300" />
            <span className="text-xs font-serif italic text-stone-400">Ateliers of Luxury & Craftsmanship</span>
            <span className="w-12 h-[0.5px] bg-stone-300" />
          </div>
          <p className="text-xs text-stone-500 font-sans font-light leading-relaxed max-w-lg mx-auto">
            Experience our magnificent silver masterpieces and premium hampers in person. Find an authorized Ekaani atelier near you.
          </p>
        </div>

        {/* Minimalist search and category row - Hermes Style */}
        <div className="max-w-4xl mx-auto mb-16 space-y-8">
          
          {/* Luxurious Search Bar Form with Search Button */}
          <form onSubmit={handleSearchSubmit} className="flex items-stretch max-w-lg mx-auto border-b border-stone-400 pb-1.5 focus-within:border-[#d4af37] transition-colors">
            <input
              type="text"
              placeholder="Find a boutique by city or area..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full bg-transparent text-xs font-sans text-stone-900 placeholder-stone-400 focus:outline-none pr-4"
            />
            <button
              type="submit"
              className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-stone-900 hover:text-[#d4af37] transition-colors cursor-pointer shrink-0"
            >
              <span>Search</span>
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Luxury City Selectors (Minimalist Underlined / Text Style) */}
          <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2 justify-start sm:justify-center scrollbar-none no-scrollbar border-b border-stone-200/40">
            {CITIES.map((city) => (
              <button
                key={city}
                onClick={() => {
                  setSelectedCity(city);
                  // Quick clear query when clicking city to make discovery fluid
                  setInputValue("");
                  setSearchQuery("");
                }}
                className={`pb-2 px-1 text-[11px] tracking-widest uppercase transition-all duration-200 cursor-pointer relative ${
                  selectedCity === city
                    ? "text-stone-950 font-semibold"
                    : "text-stone-400 hover:text-stone-700 font-light"
                }`}
              >
                {city}
                {selectedCity === city && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#d4af37]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Store Slider Scroll Section */}
        <div className="relative group/slider max-w-6xl mx-auto">
          
          {/* Left Scrolling Arrow trigger */}
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 sm:-ml-6 z-10 p-3 bg-white hover:bg-[#d4af37] border border-stone-200 hover:border-[#d4af37] text-stone-700 hover:text-stone-950 rounded-full shadow-md transition-all duration-300 cursor-pointer focus:outline-none"
            aria-label="Scroll boutique list left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Scrolling Arrow trigger */}
          <button
            onClick={() => handleScroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 sm:-mr-6 z-10 p-3 bg-white hover:bg-[#d4af37] border border-stone-200 hover:border-[#d4af37] text-stone-700 hover:text-stone-950 rounded-full shadow-md transition-all duration-300 cursor-pointer focus:outline-none"
            aria-label="Scroll boutique list right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Sliding horizontal container */}
          <div
            ref={scrollTrackRef}
            className="flex gap-6 overflow-x-auto pb-8 pt-2 px-1 scrollbar-thin snap-x snap-mandatory text-left scroll-smooth"
            style={{ scrollbarWidth: "thin" }}
          >
            {filteredStores.length === 0 ? (
              <div className="w-full text-center py-20 bg-white/50 border border-stone-200/50 rounded-xs space-y-3">
                <MapPin className="w-6 h-6 text-stone-300 mx-auto" />
                <p className="font-serif text-sm tracking-wide text-stone-800 uppercase">No boutiques found</p>
                <p className="text-xs text-stone-500 max-w-xs mx-auto font-light">
                  No showrooms found for "{searchQuery || selectedCity}". Explore another luxury city or refine your keyword query.
                </p>
              </div>
            ) : (
              filteredStores.map((store, index) => (
                <div
                  key={store.name}
                  className="min-w-[280px] sm:min-w-[340px] max-w-[360px] snap-start bg-white border border-stone-200/60 p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#d4af37]/60 hover:shadow-xl text-left relative overflow-hidden group/card"
                >
                  
                  {/* Decorative faint background initial for luxury vibe */}
                  <div className="absolute top-2 right-4 text-7xl font-serif text-stone-50/70 select-none pointer-events-none transition-colors group-hover/card:text-stone-100/80 font-light">
                    {store.city[0] || "E"}
                  </div>

                  <div className="space-y-6 relative z-10">
                    
                    {/* Index & City Identifier */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-stone-400">
                        ({String(index + 1).padStart(2, "0")})
                      </span>
                      <span className="text-[9px] uppercase tracking-[0.2em] text-[#d4af37] font-semibold">
                        {store.city} Boutique
                      </span>
                    </div>

                    {/* Showroom Title */}
                    <h3 className="font-serif text-lg sm:text-xl text-stone-950 font-light tracking-wide group-hover/card:text-[#d4af37] transition-colors duration-200">
                      {store.name}
                    </h3>

                    {/* Showroom address in pristine light style */}
                    <p className="text-xs text-stone-500 font-sans font-light leading-relaxed min-h-[64px]">
                      {store.address}
                    </p>

                    {/* Classic Minimalist Phone Link */}
                    <div className="pt-4 border-t border-stone-100 flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-stone-400 group-hover/card:text-[#d4af37] transition-colors" />
                      <a
                        href={`tel:+91${store.phone}`}
                        className="text-xs font-mono text-stone-700 hover:text-[#d4af37] transition-colors"
                      >
                        +91 {store.phone.replace(/(\d{5})(\d{5})/, "$1 $2")}
                      </a>
                    </div>

                  </div>

                  {/* Sleek Underlined Bottom Action triggers */}
                  <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between">
                    <a
                      href={`tel:+91${store.phone}`}
                      className="text-[10px] uppercase tracking-widest text-stone-500 hover:text-stone-900 font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <span>Call Boutique</span>
                    </a>
                    
                    <a
                      href={store.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] uppercase tracking-widest text-[#aa7c11] hover:text-[#d4af37] font-bold transition-colors flex items-center gap-1"
                    >
                      <span>Get Directions</span>
                      <ExternalLink className="w-3 h-3 text-[#aa7c11] group-hover/card:translate-x-0.5 transition-transform" />
                    </a>
                  </div>

                </div>
              ))
            )}
          </div>

          {/* Swipe indicator at the bottom */}
          {filteredStores.length > 0 && (
            <div className="text-center pt-2">
              <span className="text-[9px] uppercase tracking-widest text-stone-400 font-light animate-pulse">
                ← Swipe or Slide to discover all boutiques →
              </span>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
