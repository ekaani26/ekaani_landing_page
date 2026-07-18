import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-stone-50/95 backdrop-blur-md shadow-sm py-2 border-b border-stone-200/50"
          : "bg-[#fcfbf7]/90 backdrop-blur-xs py-3 border-b border-stone-100/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Icon Only (No Text) */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img
              src="https://cdn.shopify.com/s/files/1/0748/5014/0446/files/Layer_x0020_1_83f4e6f8-cf11-4a6c-9d21-9bb72e6775d8.svg?v=1683268225"
              alt="Ekaani Logo"
              className="h-8 md:h-10 w-auto object-contain brightness-90"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Quick Converting CTA Links: WhatsApp Button */}
          <div className="flex items-center gap-4 md:gap-6">
            <a
              href="https://wa.me/919910926757?text=Hi%20Ekaani%20Atelier%2C%20I'm%20interested%20in%20custom%20luxury%20invitations%20and%20gifts."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#128C7E] text-white px-3 md:px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 font-sans shadow-xs hover:shadow-md"
            >
              {/* WhatsApp SVG logo */}
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.988 3.3 1.478 5.35 1.48 5.394 0 9.782-4.385 9.785-9.775.002-2.61-1.012-5.064-2.857-6.911C17.071 2.099 14.613 1.082 12 1.081 6.61 1.081 2.221 5.471 2.218 10.86c-.001 2.04.538 4.031 1.56 5.795l-.369 1.348-.949 3.461 3.562-.93 1.185-.318zm11.233-5.32c-.3-.149-1.771-.874-2.046-.973-.274-.1-.474-.149-.674.15-.199.299-.772.973-.947 1.171-.175.199-.349.224-.649.075-.3-.149-1.265-.466-2.41-1.486-.89-.794-1.491-1.774-1.666-2.073-.175-.299-.019-.461.13-.61.135-.133.3-.349.45-.523.15-.174.199-.299.299-.498.1-.199.05-.374-.025-.523-.075-.149-.674-1.62-.923-2.219-.242-.58-.488-.5-.674-.51-.175-.01-.374-.012-.573-.012-.199 0-.524.075-.798.374-.274.299-1.047 1.022-1.047 2.492 0 1.47 1.072 2.89 1.222 3.09.15.199 2.11 3.221 5.11 4.516.714.308 1.272.492 1.707.63.717.228 1.369.196 1.885.119.574-.085 1.771-.724 2.022-1.42.25-.697.25-1.295.175-1.42-.075-.125-.275-.199-.575-.349z" />
              </svg>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
