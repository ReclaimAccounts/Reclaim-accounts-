import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Copy, CheckCheck, X, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { isLaunched } from "@/lib/launch-date";

const COUPON_CODE = "RECLAIM25";

export function BonusBanner() {
  const [launched, setLaunched] = useState(isLaunched);
  const [copied, setCopied] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (launched) return;
    const interval = setInterval(() => {
      if (isLaunched()) {
        setLaunched(true);
        clearInterval(interval);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [launched]);

  const visible = launched && !dismissed;

  useEffect(() => {
    const root = document.documentElement;

    if (!visible) {
      root.style.setProperty("--banner-height", "0px");
      return;
    }

    const el = bannerRef.current;
    if (!el) return;

    const setHeight = () => {
      root.style.setProperty("--banner-height", `${el.offsetHeight}px`);
    };
    setHeight();

    const observer = new ResizeObserver(setHeight);
    observer.observe(el);
    return () => {
      observer.disconnect();
      root.style.setProperty("--banner-height", "0px");
    };
  }, [visible]);

  if (!visible) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(COUPON_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={bannerRef}
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -80 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-[100]"
      >
        <div className="relative bg-gradient-to-r from-primary/90 via-yellow-400/90 to-primary/90 backdrop-blur-md px-4 py-3 flex items-center justify-center gap-4 shadow-[0_4px_30px_rgba(245,158,11,0.5)]">
          {/* Sparkle decorations */}
          <Sparkles className="w-4 h-4 text-black/40 hidden sm:block shrink-0" />

          <div className="flex flex-wrap items-center justify-center gap-3 text-center">
            <Gift className="w-5 h-5 text-black shrink-0" />
            <span className="text-black font-black uppercase tracking-wider text-sm">
              We Are LIVE! Claim Your Launch Bonus
            </span>

            <button
              onClick={handleCopy}
              className="flex items-center gap-2 bg-black/20 hover:bg-black/30 border border-black/20 px-4 py-1.5 rounded-lg text-black font-bold tracking-widest text-sm transition-all hover:scale-105 group"
            >
              <span className="font-mono">{COUPON_CODE}</span>
              {copied
                ? <CheckCheck className="w-4 h-4 text-green-800" />
                : <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />
              }
            </button>

            <Link href="/preregister">
              <span className="text-xs font-bold uppercase tracking-widest text-black/70 underline underline-offset-2 hover:text-black transition-colors cursor-pointer">
                Redeem Now →
              </span>
            </Link>
          </div>

          <button
            onClick={() => setDismissed(true)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-black/50 hover:text-black transition-colors p-1"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function ClaimIcon() {
  const [launched, setLaunched] = useState(isLaunched);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (launched) return;
    const interval = setInterval(() => {
      if (isLaunched()) {
        setLaunched(true);
        clearInterval(interval);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [launched]);

  useEffect(() => {
    if (!launched) return;
    const p = setInterval(() => setPulse((v) => !v), 2000);
    return () => clearInterval(p);
  }, [launched]);

  if (!launched) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="fixed bottom-24 right-4 z-40"
    >
      <Link href="/preregister">
        <div className="relative cursor-pointer group">
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping scale-110" />
          <div className={`w-14 h-14 rounded-full bg-gradient-to-br from-primary to-yellow-500 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.6)] group-hover:scale-110 transition-transform`}>
            <Gift className="w-7 h-7 text-black" />
          </div>
          {/* Tooltip */}
          <div className="absolute bottom-16 right-0 whitespace-nowrap bg-black border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
            Claim Bonus!
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
