import { SiYoutube, SiWhatsapp, SiTiktok, SiTelegram } from "react-icons/si";
import { SOCIAL_LINKS } from "@/lib/social-links";
import { useState } from "react";

const items = [
  { icon: <SiTelegram className="w-5 h-5" />, ...SOCIAL_LINKS.telegram },
  { icon: <SiWhatsapp className="w-5 h-5" />, ...SOCIAL_LINKS.whatsapp },
  { icon: <SiYoutube className="w-5 h-5" />, ...SOCIAL_LINKS.youtube },
  { icon: <SiTiktok className="w-5 h-5" />, ...SOCIAL_LINKS.tiktok },
];

export function FloatingSocial() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHovered(item.label)}
          onMouseLeave={() => setHovered(null)}
          aria-label={item.label}
          className="relative flex items-center group"
        >
          {/* Label tooltip on hover */}
          <span
            className={`absolute right-12 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-background border border-border/50 text-foreground shadow-lg transition-all duration-200 pointer-events-none ${
              hovered === item.label ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
            }`}
          >
            {item.label}
          </span>

          <div
            className={`w-10 h-10 rounded-xl glass-card border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-white/30 ${item.color} ${item.bgColor}`}
          >
            {item.icon}
          </div>
        </a>
      ))}
    </div>
  );
}
