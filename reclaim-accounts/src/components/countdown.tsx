import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiYoutube, SiWhatsapp, SiTiktok, SiTelegram } from "react-icons/si";
import { ExternalLink, Rocket } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/social-links";
import { LAUNCH_DATE } from "@/lib/launch-date";

function getTimeLeft(targetDate: string) {
  const distance = new Date(targetDate).getTime() - Date.now();
  if (distance <= 0) return null;
  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
}

const LAUNCH_CHANNELS = [
  {
    label: "Telegram Channel",
    desc: "Join for updates",
    url: SOCIAL_LINKS.telegram.url,
    icon: <SiTelegram className="w-5 h-5" />,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    glow: "hover:shadow-[0_0_20px_rgba(96,165,250,0.3)]",
  },
  {
    label: "WhatsApp Channel",
    desc: "Get the APK link",
    url: SOCIAL_LINKS.whatsapp.url,
    icon: <SiWhatsapp className="w-5 h-5" />,
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    glow: "hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]",
  },
  {
    label: "YouTube",
    desc: "Watch the launch",
    url: SOCIAL_LINKS.youtube.url,
    icon: <SiYoutube className="w-5 h-5" />,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    glow: "hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]",
  },
  {
    label: "TikTok",
    desc: "See it live",
    url: SOCIAL_LINKS.tiktok.url,
    icon: <SiTiktok className="w-5 h-5" />,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/30",
    glow: "hover:shadow-[0_0_20px_rgba(244,114,182,0.3)]",
  },
];

function LaunchedState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto"
    >
      <div className="flex flex-col items-center gap-3">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary"
        >
          <Rocket className="w-8 h-8" />
        </motion.div>
        <h2 className="text-4xl md:text-6xl font-black text-primary uppercase tracking-widest">
          We Are Live!
        </h2>
        <p className="text-muted-foreground text-center text-lg">
          Reclaim Accounts has officially launched. Join the community to get the app.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full">
        {LAUNCH_CHANNELS.map((ch) => (
          <a
            key={ch.label}
            href={ch.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 p-4 rounded-2xl border ${ch.bg} ${ch.border} ${ch.glow} hover:scale-105 transition-all duration-300 group`}
          >
            <div className={`w-10 h-10 rounded-xl ${ch.bg} flex items-center justify-center ${ch.color} shrink-0`}>
              {ch.icon}
            </div>
            <div className="min-w-0">
              <div className={`font-bold text-sm uppercase tracking-wide ${ch.color}`}>{ch.label}</div>
              <div className="text-xs text-muted-foreground">{ch.desc}</div>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground/50 ml-auto shrink-0 group-hover:text-foreground transition-colors" />
          </a>
        ))}
      </div>
    </motion.div>
  );
}

export function CountdownTimer({ targetDate = LAUNCH_DATE, size = "large" }: { targetDate?: string, size?: "large" | "small" }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate) ?? { days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isLaunched, setIsLaunched] = useState(() => getTimeLeft(targetDate) === null);

  useEffect(() => {
    const tick = () => {
      const tl = getTimeLeft(targetDate);
      if (!tl) { setIsLaunched(true); return; }
      setTimeLeft(tl);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (isLaunched) return <LaunchedState />;

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className={`glass-card rounded-2xl flex items-center justify-center relative overflow-hidden ${size === "large" ? "w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40" : "w-16 h-16 sm:w-20 sm:h-20"} border-primary/20 bg-card/40`}>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 20, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className={`font-bold tabular-nums text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 ${size === "large" ? "text-4xl sm:text-6xl md:text-7xl" : "text-2xl sm:text-4xl"}`}
          >
            {value.toString().padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className={`uppercase tracking-widest text-muted-foreground font-medium ${size === "large" ? "mt-4 text-xs sm:text-sm" : "mt-2 text-[10px] sm:text-xs"}`}>
        {label}
      </span>
    </div>
  );

  const Divider = () => (
    <div className={`flex items-center justify-center font-bold text-primary/50 animate-pulse ${size === "large" ? "text-4xl sm:text-6xl pb-8" : "text-2xl sm:text-4xl pb-4"}`}>:</div>
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
        <TimeBlock value={timeLeft.days} label="Days" />
        <Divider />
        <TimeBlock value={timeLeft.hours} label="Hours" />
        <Divider />
        <TimeBlock value={timeLeft.minutes} label="Minutes" />
        <Divider />
        <TimeBlock value={timeLeft.seconds} label="Seconds" />
      </div>
    </div>
  );
}
