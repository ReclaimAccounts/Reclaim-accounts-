import { useSEO } from "@/hooks/use-seo";
import {
  ShieldCheck, Bell, FileText, Lock, Users, Search, HelpCircle,
  User, LogIn, Smartphone, Bot, Zap, Shield, Star, Video,
  MessageSquare, KeyRound, Mail,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const features = [
  {
    title: "Account Recovery",
    description: "Step-by-step PUBG account recovery guidance with official support links.",
    icon: <ShieldCheck className="w-8 h-8" />,
    color: "text-primary",
    bg: "bg-primary/10",
    badge: "Core",
  },
  {
    title: "Security Center",
    description: "Account protection tips, two-factor setup guides, and best security practices.",
    icon: <Lock className="w-8 h-8" />,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    badge: "Core",
  },
  {
    title: "Account Status Info",
    description: "Check your account standing through official PUBG channels only.",
    icon: <Search className="w-8 h-8" />,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    badge: "Core",
  },
  {
    title: "Appeal Resources",
    description: "Navigate the PUBG support and appeal process with guided steps.",
    icon: <HelpCircle className="w-8 h-8" />,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    badge: "Core",
  },
  {
    title: "News & Updates",
    description: "Latest PUBG announcements, patch notes, and game updates.",
    icon: <FileText className="w-8 h-8" />,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    title: "Smart Notifications",
    description: "Real-time alerts for important updates, ban waves, and announcements.",
    icon: <Bell className="w-8 h-8" />,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    title: "User Profile",
    description: "Manage your preferences, notification settings, and saved guides.",
    icon: <User className="w-8 h-8" />,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
  },
  {
    title: "Google Sign-In",
    description: "Quick and secure authentication with your Google account.",
    icon: <LogIn className="w-8 h-8" />,
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
  {
    title: "Community Hub",
    description: "Access guides, tips, and resources from the community.",
    icon: <Users className="w-8 h-8" />,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    title: "Mobile Optimized",
    description: "Built natively for Android — smooth, fast, and intuitive.",
    icon: <Smartphone className="w-8 h-8" />,
    color: "text-teal-400",
    bg: "bg-teal-500/10",
  },
  {
    title: "AI Support Assistant",
    description: "Intelligent AI-powered assistant that helps guide you through recovery steps and answers PUBG support questions instantly.",
    icon: <Bot className="w-8 h-8" />,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    badge: "AI",
    highlight: true,
  },
  {
    title: "Direct Support Request",
    description: "Upload your screenshot and UID to submit a support case directly to our specialist team via email.",
    icon: <Mail className="w-8 h-8" />,
    color: "text-primary",
    bg: "bg-primary/10",
    badge: "New",
    highlight: true,
  },
];

const highlights = [
  {
    icon: <Bot className="w-7 h-7" />,
    title: "AI-Powered Assistance",
    desc: "Our upcoming AI integration will answer recovery questions, guide you through PUBG's appeal process step-by-step, and provide personalized support — available 24/7 inside the app.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    tag: "Coming in App",
  },
  {
    icon: <KeyRound className="w-7 h-7" />,
    title: "Account Specialist Support",
    desc: "Submit your case with your player name, UID, and a screenshot. Our team reviews every request and responds with personalised guidance.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    tag: "Live Now",
  },
  {
    icon: <Shield className="w-7 h-7" />,
    title: "100% Official Methods Only",
    desc: "Every recovery pathway, appeal guide, and security tip uses only PUBG's official support channels. No third-party tools, no account risks.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    tag: "Guaranteed",
  },
];

export default function FeaturesPage() {
  useSEO("Features");

  return (
    <div className="container mx-auto px-4 py-24 md:py-32 max-w-7xl">
      {/* Header */}
      <motion.div initial="hidden" animate="visible" variants={FADE_UP} className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest mb-6">
          <Zap className="w-3 h-3" /> Beta v1.3.2 Features
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tight text-foreground drop-shadow-md">
          Complete Arsenal
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Everything you need to recover, secure, and manage your PUBG account — all in one premium Android app.
        </p>
      </motion.div>

      {/* Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        {highlights.map((h, i) => (
          <motion.div
            key={h.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } } }}
            className={`glass-card rounded-3xl p-8 border ${h.border} relative overflow-hidden`}
          >
            <div className={`absolute top-0 right-0 w-40 h-40 ${h.bg} rounded-full blur-[60px] opacity-50 pointer-events-none`} />
            <div className={`w-14 h-14 rounded-2xl ${h.bg} ${h.color} flex items-center justify-center mb-5`}>
              {h.icon}
            </div>
            <div className={`text-xs font-bold uppercase tracking-widest ${h.color} mb-2`}>{h.tag}</div>
            <h3 className="text-xl font-black text-foreground uppercase tracking-wide mb-3">{h.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{h.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* All features grid */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={FADE_UP} className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-black text-foreground uppercase tracking-tight">All Features</h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-20"
      >
        {features.map((f, i) => (
          <motion.div
            key={i}
            variants={FADE_UP}
            className={`glass-card p-6 rounded-2xl group transition-all duration-300 hover:-translate-y-1 hover:border-white/20 ${f.highlight ? "border-primary/20 bg-primary/5" : "border-white/5"}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${f.bg} ${f.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              {f.badge && (
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${
                  f.badge === "AI" ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" :
                  f.badge === "New" ? "bg-primary/10 text-primary border border-primary/20" :
                  "bg-white/5 text-muted-foreground border border-white/10"
                }`}>
                  {f.badge}
                </span>
              )}
            </div>
            <h3 className="font-bold text-foreground uppercase tracking-wide mb-2 text-sm">{f.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{f.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Support CTA */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={FADE_UP}
        className="glass-card rounded-3xl p-8 md:p-12 text-center border-primary/20 bg-primary/5"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Star className="w-6 h-6 text-primary" />
          <span className="text-primary font-bold uppercase tracking-widest">Ready to get help?</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-black text-foreground uppercase tracking-tight mb-4">Submit a Support Request</h3>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          Share your player name, UID, and a screenshot. Our specialist team will review your case personally.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/support">
            <Button size="lg" className="rounded-none h-14 px-10 bg-primary text-primary-foreground font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(245,158,11,0.3)]">
              Submit Support Request
            </Button>
          </Link>
          <Link href="/preregister">
            <Button size="lg" variant="outline" className="rounded-none h-14 px-10 border-border text-foreground hover:bg-foreground/5 font-bold uppercase tracking-widest">
              Pre-Register Free
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
