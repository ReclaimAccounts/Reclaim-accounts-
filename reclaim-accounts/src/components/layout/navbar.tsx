import { Menu, X, Moon, Sun, ArrowRight, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { useIsLaunched } from "@/lib/launch-date";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const launched = useIsLaunched();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setMoreOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/videos", label: "Videos" },
    { href: "/news", label: "News" },
    { href: "/beta", label: "Beta" },
    { href: "/faq", label: "FAQ" },
  ];

  const moreLinks = [
    { href: "/support", label: "Support Request" },
    { href: "/contact", label: "Contact" },
    { href: "/download", label: "Download" },
  ];

  return (
    <header
      style={{ top: "var(--banner-height, 0px)" }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/40 shadow-sm"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-primary font-bold text-xl tracking-tight z-50">
          <img src="https://i.postimg.cc/HWBVnN0n/134627589-1781697303683007.jpg" alt="Reclaim Accounts" className="h-10 w-10 rounded-xl object-cover shadow-lg shadow-primary/20" />
          <span className="hidden sm:inline-block tracking-wide uppercase text-foreground">Reclaim<span className="text-primary ml-1">Accounts</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-primary ${
                  location === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* More dropdown */}
            <div className="relative">
              <button
                onClick={() => setMoreOpen((v) => !v)}
                className={`flex items-center gap-1 text-sm font-medium tracking-wide uppercase transition-colors hover:text-primary ${
                  moreLinks.some((l) => l.href === location) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                More <ChevronDown className={`w-3 h-3 transition-transform ${moreOpen ? "rotate-180" : ""}`} />
              </button>
              {moreOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setMoreOpen(false)} />
                  <div className="absolute top-8 right-0 z-50 bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl p-2 min-w-[180px] shadow-xl">
                    {moreLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`block px-4 py-2.5 rounded-xl text-sm font-medium uppercase tracking-wide transition-colors hover:bg-primary/10 hover:text-primary ${
                          location === link.href ? "text-primary bg-primary/5" : "text-muted-foreground"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 border-l border-border/50 pl-5">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-muted-foreground hover:text-foreground"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            <Link href={launched ? "/download" : "/preregister"}>
              <Button className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/25 shadow-lg group uppercase tracking-widest font-bold px-6">
                {launched ? "Download" : "Pre-Register"}
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 md:hidden z-50">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-muted-foreground"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="text-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div
            style={{ paddingTop: "calc(6rem + var(--banner-height, 0px))" }}
            className="fixed inset-0 bg-background/95 backdrop-blur-xl px-6 pb-6 flex flex-col md:hidden animate-in fade-in zoom-in-95 duration-200 z-40"
          >
            <nav className="flex flex-col gap-2 text-center">
              {[...navLinks, ...moreLinks].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-xl font-bold uppercase tracking-widest py-3 transition-colors rounded-xl ${
                    location === link.href ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-6 pt-6 border-t border-border/50">
                <Link href={launched ? "/download" : "/preregister"} onClick={() => setIsOpen(false)}>
                  <Button size="lg" className="w-full rounded-none bg-primary text-primary-foreground text-lg uppercase tracking-widest font-bold h-14">
                    {launched ? "Download" : "Pre-Register Now"}
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
