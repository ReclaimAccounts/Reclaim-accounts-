import { useSEO } from "@/hooks/use-seo";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Upload, Send, CheckCircle2, Loader2, ImageIcon, X, ShieldAlert, KeyRound, Unlock } from "lucide-react";

const ISSUE_TYPES = [
  {
    id: "banned",
    label: "Account Banned",
    desc: "My account was suspended or permanently banned",
    icon: <ShieldAlert className="w-6 h-6" />,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    activeBorder: "border-red-500",
    glow: "shadow-[0_0_20px_rgba(239,68,68,0.3)]",
  },
  {
    id: "hacked",
    label: "Account Hacked",
    desc: "My account was compromised or accessed without permission",
    icon: <KeyRound className="w-6 h-6" />,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    activeBorder: "border-amber-500",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.3)]",
  },
  {
    id: "locked",
    label: "Account Locked",
    desc: "I cannot log in or access my account",
    icon: <Unlock className="w-6 h-6" />,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    activeBorder: "border-blue-500",
    glow: "shadow-[0_0_20px_rgba(96,165,250,0.3)]",
  },
];

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function SupportPage() {
  useSEO("Support Request");
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<"type" | "form" | "success">("type");
  const [selectedType, setSelectedType] = useState<string>("");
  const [playerName, setPlayerName] = useState("");
  const [uid, setUid] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setScreenshot(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    setScreenshot(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = async () => {
    if (!playerName.trim() || !uid.trim()) {
      toast({ title: "Missing Information", description: "Please fill in your player name and UID.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("playerName", playerName.trim());
      formData.append("uid", uid.trim());
      formData.append("issueType", selectedType);
      if (screenshot) formData.append("screenshot", screenshot);

      const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
      const res = await fetch(`${baseUrl}/api/support-request`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Submission failed");
      }

      setStep("success");
    } catch (err: unknown) {
      toast({
        title: "Submission Failed",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const selectedIssue = ISSUE_TYPES.find((t) => t.id === selectedType);

  return (
    <div className="container mx-auto px-4 py-24 md:py-32 max-w-3xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
          <ShieldAlert className="w-10 h-10" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tight text-foreground">Support Request</h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Submit your account issue and we'll review it personally. Your details are sent directly to our team.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 1: Choose issue type */}
        {step === "type" && (
          <motion.div key="type" initial="hidden" animate="visible" exit={{ opacity: 0, y: -20 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}>
            <motion.p variants={FADE_UP} className="text-center text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">
              Step 1 of 2 — Select Your Issue
            </motion.p>
            <div className="grid grid-cols-1 gap-4">
              {ISSUE_TYPES.map((type) => (
                <motion.button
                  key={type.id}
                  variants={FADE_UP}
                  onClick={() => { setSelectedType(type.id); setStep("form"); }}
                  className={`glass-card rounded-2xl p-6 flex items-center gap-5 border text-left transition-all duration-300 hover:-translate-y-1 ${type.border} ${type.glow} group`}
                >
                  <div className={`w-14 h-14 rounded-2xl ${type.bg} ${type.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    {type.icon}
                  </div>
                  <div>
                    <div className={`font-black text-foreground text-xl uppercase tracking-wide mb-1`}>{type.label}</div>
                    <div className="text-sm text-muted-foreground">{type.desc}</div>
                  </div>
                  <div className={`ml-auto text-2xl ${type.color} opacity-40 group-hover:opacity-100 transition-opacity`}>→</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 2: Fill details */}
        {step === "form" && (
          <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <div className="flex items-center gap-3 mb-8">
              <button onClick={() => setStep("type")} className="text-muted-foreground hover:text-foreground transition-colors text-sm font-bold uppercase tracking-widest">← Back</button>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${selectedIssue?.bg} ${selectedIssue?.color} text-xs font-bold uppercase tracking-widest`}>
                {selectedIssue?.icon}
                {selectedIssue?.label}
              </div>
            </div>

            <div className="glass-card rounded-[2rem] p-8 border-white/10 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Step 2 of 2 — Your Details</p>

              {/* Player Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Player Name (In-Game)</label>
                <Input
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Your PUBG player name"
                  className="bg-background/80 border-border h-14 rounded-xl text-foreground placeholder:text-muted-foreground/40 text-base"
                />
              </div>

              {/* UID */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">PUBG UID / Account ID</label>
                <Input
                  value={uid}
                  onChange={(e) => setUid(e.target.value)}
                  placeholder="e.g. 5123456789"
                  className="bg-background/80 border-border h-14 rounded-xl text-foreground placeholder:text-muted-foreground/40 text-base font-mono"
                />
                <p className="text-xs text-muted-foreground">Find your UID in PUBG → Settings → Basic Info</p>
              </div>

              {/* Screenshot upload */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Screenshot (Optional)</label>
                {!preview ? (
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="w-full h-32 rounded-xl border border-dashed border-white/20 flex flex-col items-center justify-center gap-3 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                  >
                    <Upload className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Click to upload screenshot</span>
                    <span className="text-xs text-muted-foreground/60">JPG, PNG, WEBP — max 10MB</span>
                  </button>
                ) : (
                  <div className="relative rounded-xl overflow-hidden border border-white/10 group">
                    <img src={preview} alt="Screenshot preview" className="w-full max-h-48 object-cover" />
                    <button
                      onClick={removeFile}
                      className="absolute top-3 right-3 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                    <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/60 px-3 py-1 rounded-full">
                      <ImageIcon className="w-3 h-3 text-green-400" />
                      <span className="text-xs text-green-400 font-bold">{screenshot?.name}</span>
                    </div>
                  </div>
                )}
                <input ref={fileRef} type="file" accept=".jpg,.jpeg,.png,.webp" onChange={handleFileChange} className="hidden" />
              </div>

              <Button
                onClick={handleSubmit}
                disabled={loading}
                size="lg"
                className="w-full h-14 rounded-xl bg-primary text-primary-foreground font-bold uppercase tracking-widest text-base shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all"
              >
                {loading
                  ? <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Sending to our team...</span>
                  : <span className="flex items-center gap-2"><Send className="w-5 h-5" /> Submit Support Request</span>
                }
              </Button>

              <p className="text-center text-xs text-muted-foreground/60">
                Your request is sent directly to reclaimservices2027@gmail.com
              </p>
            </div>
          </motion.div>
        )}

        {/* SUCCESS */}
        {step === "success" && (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="glass-card rounded-[2rem] p-12 text-center border-primary/30 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-3xl font-black text-foreground uppercase tracking-widest mb-4">Request Submitted!</h2>
            <p className="text-muted-foreground text-lg mb-2">
              Your support request for <strong className="text-foreground">UID: {uid}</strong> has been sent to our team.
            </p>
            <p className="text-muted-foreground mb-8">
              We'll review your case and respond at our earliest. While you wait, join our community channels for updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://t.me/ReclaimAccounts" target="_blank" rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform">
                Join Telegram
              </a>
              <button onClick={() => { setStep("type"); setPlayerName(""); setUid(""); removeFile(); }}
                className="px-6 py-3 rounded-xl bg-muted border border-border text-foreground font-bold uppercase tracking-widest text-sm hover:bg-muted/80 transition-colors">
                Submit Another
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
