import { Link } from "wouter";
import { ShieldCheck, Heart } from "lucide-react";
import { SiYoutube, SiWhatsapp, SiTiktok, SiTelegram } from "react-icons/si";
import { SOCIAL_LINKS } from "@/lib/social-links";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border/40 pt-16 pb-8 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-32 bg-primary/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">

          {/* Brand Col */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl tracking-tight mb-4">
              <img src="https://i.postimg.cc/HWBVnN0n/134627589-1781697303683007.jpg" alt="Reclaim Accounts" className="h-8 w-8 rounded-xl object-cover" />
              <span className="text-foreground uppercase tracking-wide">Reclaim<span className="text-primary ml-1">Accounts</span></span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              PUBG account recovery guidance, security resources & support information. Launching July 15, 2026.
            </p>
            <div className="flex items-center gap-4">
              <a href={SOCIAL_LINKS.youtube.url} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-muted-foreground hover:text-red-500 transition-colors">
                <SiYoutube className="w-5 h-5" />
              </a>
              <a href={SOCIAL_LINKS.whatsapp.url} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Channel" className="text-muted-foreground hover:text-green-500 transition-colors">
                <SiWhatsapp className="w-5 h-5" />
              </a>
              <a href={SOCIAL_LINKS.tiktok.url} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-muted-foreground hover:text-pink-400 transition-colors">
                <SiTiktok className="w-5 h-5" />
              </a>
              <a href={SOCIAL_LINKS.telegram.url} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="text-muted-foreground hover:text-blue-400 transition-colors">
                <SiTelegram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground uppercase tracking-wider text-xs">Platform</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-muted-foreground hover:text-primary text-sm transition-colors">Home</Link></li>
              <li><Link href="/features" className="text-muted-foreground hover:text-primary text-sm transition-colors">Features</Link></li>
              <li><Link href="/videos" className="text-muted-foreground hover:text-primary text-sm transition-colors">Videos & Teasers</Link></li>
              <li><Link href="/download" className="text-muted-foreground hover:text-primary text-sm transition-colors">Download Center</Link></li>
              <li><Link href="/news" className="text-muted-foreground hover:text-primary text-sm transition-colors">News & Updates</Link></li>
              <li><Link href="/beta" className="text-muted-foreground hover:text-primary text-sm transition-colors">Beta Program</Link></li>
              <li><Link href="/preregister" className="text-muted-foreground hover:text-primary text-sm transition-colors">Pre-Register</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground uppercase tracking-wider text-xs">Support</h3>
            <ul className="space-y-3">
              <li><Link href="/support" className="text-muted-foreground hover:text-primary text-sm transition-colors">Support Request</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-primary text-sm transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary text-sm transition-colors">Contact Us</Link></li>
              <li><a href="mailto:reclaimservices2027@gmail.com" className="text-muted-foreground hover:text-primary text-sm transition-colors">reclaimservices2027@gmail.com</a></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary text-sm transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary text-sm transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground uppercase tracking-wider text-xs">Community</h3>
            <ul className="space-y-3 mb-6">
              <li>
                <a href={SOCIAL_LINKS.telegram.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-blue-400 text-sm transition-colors flex items-center gap-2">
                  <SiTelegram className="w-4 h-4" /> Telegram Channel
                </a>
              </li>
              <li>
                <a href={SOCIAL_LINKS.whatsapp.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-green-500 text-sm transition-colors flex items-center gap-2">
                  <SiWhatsapp className="w-4 h-4" /> WhatsApp Channel
                </a>
              </li>
              <li>
                <a href={SOCIAL_LINKS.youtube.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-red-500 text-sm transition-colors flex items-center gap-2">
                  <SiYoutube className="w-4 h-4" /> YouTube
                </a>
              </li>
              <li>
                <a href={SOCIAL_LINKS.tiktok.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-pink-400 text-sm transition-colors flex items-center gap-2">
                  <SiTiktok className="w-4 h-4" /> TikTok
                </a>
              </li>
            </ul>
            <div className="ad-placement ad-banner w-full h-[80px] border border-dashed border-border/50 rounded-xl flex items-center justify-center bg-muted/20">
              <span className="text-xs text-muted-foreground/60 uppercase tracking-widest">Ad Space</span>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Reclaim Accounts. All rights reserved. Launching July 15, 2026.
          </p>
          <div className="flex items-center text-xs text-muted-foreground">
            Built with <Heart className="w-3 h-3 text-red-500 mx-1" /> for the PUBG community
          </div>
        </div>
      </div>
    </footer>
  );
}
