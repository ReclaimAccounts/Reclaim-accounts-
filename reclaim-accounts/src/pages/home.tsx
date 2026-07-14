import { useSEO } from "@/hooks/use-seo";
import { useGetStats, useListNews } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Shield, ShieldAlert, ArrowRight, Lock, Bell, Search,
  Info, Settings, HelpCircle, Users, CheckCircle, Smartphone,
  Star, Zap, ExternalLink, MessageCircle, Play, TrendingUp,
} from "lucide-react";
import { SiYoutube, SiWhatsapp, SiTiktok, SiTelegram } from "react-icons/si";
import { motion, type Variants } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { CountdownTimer } from "@/components/countdown";
import { PreRegisterForm } from "@/components/preregister-form";
import { SOCIAL_LINKS } from "@/lib/social-links";
import { useIsLaunched } from "@/lib/launch-date";

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const STAGGER: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const FADE_UP_VIEWPORT: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const SLIDE_LEFT: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const SLIDE_RIGHT: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const SCALE_IN: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const STAGGER_GRID = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

function HeroSection() {
  const launched = useIsLaunched();

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 bg-background overflow-hidden">
        <div className="dark-orb absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-drift pointer-events-none" />
        <div className="dark-orb absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-drift-slow pointer-events-none" />
        <div className="dark-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[200px] pointer-events-none" />
      </div>

      <div className="container relative z-10 px-4 flex flex-col items-center text-center mt-12">
        <motion.div initial="hidden" animate="visible" variants={STAGGER} className="max-w-5xl mx-auto flex flex-col items-center w-full">
          <motion.div variants={FADE_UP} className="mb-6 flex flex-col sm:flex-row gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Beta v1.3.2
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-500 text-sm font-bold uppercase tracking-wider">
              Release: July 15
            </div>
          </motion.div>

          <motion.img
            variants={SCALE_IN}
            src="https://i.postimg.cc/HWBVnN0n/134627589-1781697303683007.jpg"
            alt="Reclaim Accounts"
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl object-cover shadow-2xl shadow-primary/20 mb-8 border border-white/10"
          />

          <motion.h1 variants={FADE_UP} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 text-foreground uppercase drop-shadow-lg">
            Reclaim Your <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-400 to-primary">PUBG Account</span>
          </motion.h1>

          <motion.p variants={FADE_UP} className="text-lg md:text-2xl text-muted-foreground mb-12 max-w-3xl leading-relaxed tracking-wide">
            Account Recovery Guidance, Security Resources & PUBG Support Information
          </motion.p>

          <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href={launched ? "/download" : "/preregister"}>
              <Button size="lg" className="w-full sm:w-auto rounded-none h-16 px-10 text-lg uppercase tracking-widest font-bold shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] transition-all bg-primary text-primary-foreground border border-primary/50">
                {launched ? "Download" : "Pre-Register Now"}
              </Button>
            </Link>
            <Link href="/beta">
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-none h-16 px-10 text-lg uppercase tracking-widest font-bold border-border bg-muted/30 backdrop-blur-md hover:bg-muted/60 text-foreground">
                Join Beta Program
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={FADE_UP} className="mt-14 flex flex-wrap items-center justify-center gap-6">
            {[
              { icon: <SiTelegram className="w-4 h-4" />, label: "Telegram", color: "text-blue-500" },
              { icon: <SiWhatsapp className="w-4 h-4" />, label: "WhatsApp", color: "text-green-500" },
              { icon: <SiYoutube className="w-4 h-4" />, label: "YouTube", color: "text-red-500" },
              { icon: <SiTiktok className="w-4 h-4" />, label: "TikTok", color: "text-pink-500" },
            ].map((s) => (
              <span key={s.label} className={`flex items-center gap-2 text-sm font-semibold ${s.color} opacity-70`}>
                {s.icon} {s.label}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowRight className="w-6 h-6 rotate-90 text-muted-foreground/50" />
      </div>
    </section>
  );
}

function CountdownSection() {
  return (
    <section className="py-24 relative bg-card/30 border-y border-border/20 backdrop-blur-sm z-20">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={FADE_UP_VIEWPORT}
            className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-8"
          >
            Official Launch In
          </motion.p>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={SCALE_IN}>
            <CountdownTimer size="large" />
          </motion.div>
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={FADE_UP_VIEWPORT}
            className="mt-8 text-xl font-medium tracking-widest uppercase text-muted-foreground"
          >
            Until Official Release — July 15, 2026
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const { data: stats, isLoading } = useGetStats();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-32 rounded-2xl glass-card" />)}
        </div>
      </div>
    );
  }
  if (!stats) return null;

  const cards = [
    { icon: <Users className="w-8 h-8 text-primary mb-4" />, value: stats.totalPreRegistrations.toLocaleString(), label: "Pre-Registrations" },
    { icon: <Shield className="w-8 h-8 text-blue-500 mb-4" />, value: stats.betaTesters.toLocaleString(), label: "Beta Testers" },
    { icon: <CheckCircle className="w-8 h-8 text-emerald-500 mb-4" />, value: "July 15", label: "Release Date" },
    { icon: <Settings className="w-8 h-8 text-purple-500 mb-4" />, value: "v1.3.2", label: "Beta Build" },
  ];

  return (
    <section className="py-12 relative z-20 bg-background/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
          variants={STAGGER_GRID}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8"
        >
          {cards.map((c, i) => (
            <motion.div
              key={i}
              variants={SCALE_IN}
              className="glass-card rounded-2xl p-6 flex flex-col items-center text-center"
            >
              {c.icon}
              <div className="text-3xl sm:text-4xl font-black text-foreground mb-1 tabular-nums">{c.value}</div>
              <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider font-semibold">{c.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    { title: "Account Recovery", desc: "Step-by-step PUBG account recovery guidance", icon: <ShieldAlert />, color: "text-primary", bg: "bg-primary/10" },
    { title: "Security Center", desc: "Account protection tips and security best practices", icon: <Shield />, color: "text-blue-400", bg: "bg-blue-500/10" },
    { title: "Account Status", desc: "Check your account standing through official channels", icon: <Search />, color: "text-cyan-400", bg: "bg-cyan-500/10" },
    { title: "Appeal Resources", desc: "Navigate the PUBG support and appeal process", icon: <HelpCircle />, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { title: "News & Updates", desc: "Latest PUBG announcements and game news", icon: <Info />, color: "text-violet-400", bg: "bg-violet-500/10" },
    { title: "Notifications", desc: "Real-time alerts for important updates", icon: <Bell />, color: "text-yellow-400", bg: "bg-yellow-500/10" },
    { title: "User Profile", desc: "Manage your preferences and settings", icon: <Settings />, color: "text-pink-400", bg: "bg-pink-500/10" },
    { title: "Google Sign-In", desc: "Quick and secure authentication", icon: <Lock />, color: "text-red-400", bg: "bg-red-500/10" },
    { title: "Community Support", desc: "Guides, tips, and community resources", icon: <Users />, color: "text-orange-400", bg: "bg-orange-500/10" },
    { title: "Mobile Optimized", desc: "Built specifically for Android devices", icon: <Smartphone />, color: "text-teal-400", bg: "bg-teal-500/10" },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={FADE_UP_VIEWPORT} className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight mb-4">Complete Arsenal</h2>
          <p className="text-xl text-muted-foreground">Everything you need to secure and reclaim your PUBG identity.</p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}
          variants={STAGGER_GRID}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={FADE_UP_VIEWPORT}
              className="glass-card p-6 rounded-2xl group hover:border-primary/20 hover:shadow-[0_0_30px_rgba(245,158,11,0.08)] transition-all duration-300 hover:-translate-y-1 cursor-default"
            >
              <div className={`w-12 h-12 rounded-xl ${f.bg} ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <h3 className="text-sm font-bold text-foreground mb-2 uppercase tracking-wide">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ScreenshotsGallery() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "center", dragFree: true });
  const screens = [
    { title: "Home Screen", color: "from-blue-900/80 to-[#0a0d1a]" },
    { title: "Recovery Center", color: "from-amber-900/50 to-[#0a0d1a]" },
    { title: "Security Center", color: "from-emerald-900/50 to-[#0a0d1a]" },
    { title: "News Feed", color: "from-violet-900/50 to-[#0a0d1a]" },
    { title: "User Profile", color: "from-pink-900/40 to-[#0a0d1a]" },
    { title: "Settings", color: "from-cyan-900/40 to-[#0a0d1a]" },
    { title: "Notifications", color: "from-red-900/40 to-[#0a0d1a]" },
  ];

  return (
    <section className="py-24 overflow-hidden bg-card/20 border-y border-border/20 backdrop-blur-sm">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={FADE_UP_VIEWPORT} className="container mx-auto px-4 text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black mb-4 text-foreground uppercase tracking-tight">Premium Interface</h2>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto">Designed natively for Android with a seamless, intuitive experience.</p>
      </motion.div>

      <div className="w-full" ref={emblaRef}>
        <div className="flex touch-pan-y" style={{ gap: "2rem", paddingLeft: "max(2rem, calc((100vw - 1200px) / 2))", paddingRight: "max(2rem, calc((100vw - 1200px) / 2))" }}>
          {screens.map((screen, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`relative flex-[0_0_280px] md:flex-[0_0_320px] aspect-[9/19] rounded-[2.5rem] border-[8px] border-card bg-black shadow-2xl shadow-primary/10 overflow-hidden group`}
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${screen.color}`} />
              <div className="absolute inset-0 p-6 flex flex-col">
                <div className="h-6 w-full flex justify-between items-center mb-8">
                  <div className="text-[10px] font-bold text-white/90">9:41</div>
                  <div className="flex gap-1"><div className="w-4 h-3 bg-white/90 rounded-sm" /></div>
                </div>
                <h3 className="text-2xl font-black text-primary uppercase tracking-wider mb-2">{screen.title}</h3>
                <div className="h-1 w-1/3 bg-primary rounded-full mb-8" />
                <div className="space-y-4 mt-auto">
                  <div className="h-20 w-full glass-card rounded-xl border border-white/5" />
                  <div className="h-20 w-full glass-card rounded-xl border border-white/5" />
                  <div className="h-16 w-full glass-card rounded-xl border border-white/5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoTeaserSection() {
  return (
    <section className="py-24 bg-background border-t border-border/20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={FADE_UP_VIEWPORT} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest mb-4">
            <Play className="w-3 h-3 fill-current" /> Official Teasers
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground uppercase tracking-tight mb-3">Watch the Teasers</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Get a first look at Reclaim Accounts before the July 15 launch.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {[
            { id: "xBt3PIqtpUM", badge: "Teaser #1", badgeColor: "bg-primary/10 text-primary border-primary/30", variant: SLIDE_LEFT },
            { id: "Hj9FChQ5kJ8", badge: "Teaser #2", badgeColor: "bg-blue-500/10 text-blue-500 border-blue-500/30", variant: SLIDE_RIGHT },
          ].map((v) => (
            <motion.div
              key={v.id}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={v.variant}
              className="glass-card rounded-2xl overflow-hidden border-white/10"
            >
              <div className="aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${v.id}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                  title={`Reclaim Accounts ${v.badge}`}
                />
              </div>
              <div className="p-4 flex items-center justify-between">
                <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${v.badgeColor}`}>{v.badge}</span>
                <a href={`https://youtu.be/${v.id}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-red-500 hover:text-red-400 font-bold uppercase tracking-widest transition-colors">
                  YouTube <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={SCALE_IN} className="flex flex-col sm:flex-row items-center gap-6 glass-card rounded-2xl p-6 border-pink-500/10">
          <div className="w-full max-w-[200px] mx-auto sm:mx-0 shrink-0">
            <div className="aspect-[9/16] rounded-xl overflow-hidden bg-black">
              <iframe
                src="https://www.youtube.com/embed/IrCblM91rZs?autoplay=1&mute=1&loop=1&playlist=IrCblM91rZs&controls=1&rel=0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
                title="Reclaim Accounts Short"
              />
            </div>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-pink-500/10 text-pink-500 border border-pink-500/20">YouTube Shorts</span>
            <h3 className="text-2xl font-black text-foreground uppercase tracking-tight mt-3 mb-2">Quick Preview</h3>
            <p className="text-muted-foreground text-sm mb-4">A 60-second highlight of what's coming. Watch the full teaser on YouTube.</p>
            <a href="https://youtube.com/shorts/IrCblM91rZs" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-widest text-xs transition-all hover:scale-105">
              <Play className="w-4 h-4 fill-current" /> Watch Short
            </a>
          </div>
        </motion.div>

        <div className="text-center mt-8">
          <Link href="/videos">
            <Button variant="outline" className="border-border text-foreground hover:bg-foreground/5 uppercase tracking-widest text-xs font-bold">
              View All Videos <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function CommunitySection() {
  const channels = [
    {
      icon: <SiTelegram className="w-7 h-7" />,
      label: SOCIAL_LINKS.telegram.label,
      handle: SOCIAL_LINKS.telegram.handle,
      desc: SOCIAL_LINKS.telegram.description,
      url: SOCIAL_LINKS.telegram.url,
      color: SOCIAL_LINKS.telegram.color,
      bg: SOCIAL_LINKS.telegram.bgColor,
      border: SOCIAL_LINKS.telegram.hoverBorder,
      glow: SOCIAL_LINKS.telegram.hoverShadow,
      cta: "Join Channel",
      badge: "Live Updates",
    },
    {
      icon: <SiWhatsapp className="w-7 h-7" />,
      label: SOCIAL_LINKS.whatsapp.label,
      handle: SOCIAL_LINKS.whatsapp.handle,
      desc: SOCIAL_LINKS.whatsapp.description,
      url: SOCIAL_LINKS.whatsapp.url,
      color: SOCIAL_LINKS.whatsapp.color,
      bg: SOCIAL_LINKS.whatsapp.bgColor,
      border: SOCIAL_LINKS.whatsapp.hoverBorder,
      glow: SOCIAL_LINKS.whatsapp.hoverShadow,
      cta: "Follow Channel",
      badge: "APK Alerts",
    },
    {
      icon: <SiYoutube className="w-7 h-7" />,
      label: SOCIAL_LINKS.youtube.label,
      handle: SOCIAL_LINKS.youtube.handle,
      desc: SOCIAL_LINKS.youtube.description,
      url: SOCIAL_LINKS.youtube.url,
      color: SOCIAL_LINKS.youtube.color,
      bg: SOCIAL_LINKS.youtube.bgColor,
      border: SOCIAL_LINKS.youtube.hoverBorder,
      glow: SOCIAL_LINKS.youtube.hoverShadow,
      cta: "Subscribe",
      badge: "Tutorials",
    },
    {
      icon: <SiTiktok className="w-7 h-7" />,
      label: SOCIAL_LINKS.tiktok.label,
      handle: SOCIAL_LINKS.tiktok.handle,
      desc: SOCIAL_LINKS.tiktok.description,
      url: SOCIAL_LINKS.tiktok.url,
      color: SOCIAL_LINKS.tiktok.color,
      bg: SOCIAL_LINKS.tiktok.bgColor,
      border: SOCIAL_LINKS.tiktok.hoverBorder,
      glow: SOCIAL_LINKS.tiktok.hoverShadow,
      cta: "Follow",
      badge: "Short Tips",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-card/20 border-t border-border/20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={FADE_UP_VIEWPORT} className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold uppercase tracking-widest mb-4">
            <MessageCircle className="w-3 h-3" /> Community
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight mb-4">Join Our Community</h2>
          <p className="text-xl text-muted-foreground">Stay connected. Get the APK on launch day. Follow us across platforms for updates, guides, and early access.</p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}
          variants={STAGGER_GRID}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {channels.map((ch) => (
            <motion.a
              key={ch.label}
              href={ch.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={FADE_UP_VIEWPORT}
              className={`glass-card rounded-3xl p-7 flex flex-col gap-4 ${ch.border} ${ch.glow} transition-all duration-300 hover:-translate-y-2 group`}
            >
              <div className="flex items-start justify-between">
                <div className={`w-14 h-14 rounded-2xl ${ch.bg} ${ch.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  {ch.icon}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${ch.bg} ${ch.color} border border-current/20`}>
                  {ch.badge}
                </span>
              </div>

              <div>
                <div className="font-black text-foreground uppercase tracking-wide text-lg">{ch.label}</div>
                <div className={`text-sm font-semibold ${ch.color} mb-2`}>{ch.handle}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{ch.desc}</p>
              </div>

              <div className={`mt-auto flex items-center gap-2 font-bold uppercase tracking-widest text-sm ${ch.color}`}>
                {ch.cta}
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={SCALE_IN}
          className="mt-12 glass-card rounded-3xl p-8 border-primary/20 bg-primary/5 text-center max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-primary font-bold uppercase tracking-widest text-sm">On Launch Day — July 15</span>
          </div>
          <p className="text-foreground text-lg font-semibold mb-2">
            The APK download link will be posted across all channels simultaneously.
          </p>
          <p className="text-muted-foreground text-sm">
            Follow the Telegram channel and WhatsApp channel now to get notified the moment it drops.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <a href={SOCIAL_LINKS.telegram.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-500 text-sm font-bold hover:scale-105 transition-transform">
              <SiTelegram className="w-4 h-4" /> Telegram
            </a>
            <a href={SOCIAL_LINKS.whatsapp.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/30 text-green-500 text-sm font-bold hover:scale-105 transition-transform">
              <SiWhatsapp className="w-4 h-4" /> WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function NewsPreviewSection() {
  const { data: news, isLoading } = useListNews({ limit: 3 });

  return (
    <section className="py-24 bg-background border-t border-border/20">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={SLIDE_LEFT}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
              <TrendingUp className="w-3 h-3" /> Latest News
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-foreground uppercase tracking-tight">Updates & Announcements</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={SLIDE_RIGHT}>
            <Link href="/news">
              <Button variant="ghost" className="text-primary hover:text-primary hidden sm:flex items-center gap-2 uppercase tracking-widest text-xs font-bold">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-48 rounded-2xl" />)}
          </div>
        ) : (
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={STAGGER_GRID}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {(news ?? []).slice(0, 3).map((item, i) => (
              <motion.div key={item.id} variants={FADE_UP_VIEWPORT} custom={i}>
                <Link href={`/news/${item.id}`}>
                  <div className="glass-card rounded-2xl p-6 hover:border-primary/30 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] transition-all duration-300 hover:-translate-y-1 group cursor-pointer h-full">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {item.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{item.publishedAt}</span>
                    </div>
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.summary}</p>
                    <div className="mt-4 flex items-center gap-1 text-xs font-bold text-primary uppercase tracking-widest">
                      Read More <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="text-center mt-8 sm:hidden">
          <Link href="/news">
            <Button variant="outline" className="border-border text-foreground hover:bg-foreground/5 uppercase tracking-widest text-xs font-bold">
              View All News <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const items = [
    { icon: <Shield className="w-5 h-5" />, title: "100% Informational", desc: "We do not modify game files or bypass any systems." },
    { icon: <Lock className="w-5 h-5" />, title: "Secure & Private", desc: "Your data is encrypted and never shared with third parties." },
    { icon: <Star className="w-5 h-5" />, title: "Community Trusted", desc: "Thousands of PUBG players rely on our guidance." },
    { icon: <CheckCircle className="w-5 h-5" />, title: "Official Channels Only", desc: "We only guide users through PUBG's official support." },
  ];

  return (
    <section className="py-16 bg-card/20 border-t border-border/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
          variants={STAGGER_GRID}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {items.map((item, i) => (
            <motion.div key={i} variants={SCALE_IN} className="flex items-start gap-4 p-6 glass-card rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <div className="font-bold text-foreground text-sm uppercase tracking-wide mb-1">{item.title}</div>
                <div className="text-xs text-muted-foreground leading-relaxed">{item.desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PreRegistrationSection() {
  const { data: stats } = useGetStats();
  const count = stats ? stats.totalPreRegistrations : 3800;

  return (
    <section className="py-32 relative overflow-hidden border-t border-primary/20">
      <div className="absolute inset-0 bg-primary/5" />
      <div className="dark-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={FADE_UP_VIEWPORT} className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight text-foreground drop-shadow-md">
            Join {count.toLocaleString()}+ Players<br />Pre-Register Today
          </h2>
          <p className="text-xl text-muted-foreground">Be first to access on July 15. Beta testers get early access.</p>
        </motion.div>
        <PreRegisterForm />
      </div>
    </section>
  );
}

export default function Home() {
  useSEO("Account Recovery & Management Platform");

  return (
    <div className="flex flex-col bg-background">
      <HeroSection />
      <CountdownSection />
      <StatsSection />
      <FeaturesSection />
      <ScreenshotsGallery />
      <VideoTeaserSection />
      <CommunitySection />
      <NewsPreviewSection />
      <TrustSection />
      <PreRegistrationSection />
    </div>
  );
}
