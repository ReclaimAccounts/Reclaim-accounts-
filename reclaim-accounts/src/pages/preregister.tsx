import { useSEO } from "@/hooks/use-seo";
import { useGetStats } from "@workspace/api-client-react";
import { PreRegisterForm } from "@/components/preregister-form";
import { CountdownTimer } from "@/components/countdown";
import { BellRing, Shield, Gift, Zap } from "lucide-react";

export default function PreRegisterPage() {
  useSEO("Pre-Register");
  const { data: stats } = useGetStats();

  const perks = [
    { title: "Launch Day Notification", icon: <BellRing className="w-6 h-6" /> },
    { title: "Exclusive Security Guides", icon: <Shield className="w-6 h-6" /> },
    { title: "Early Beta Opportunities", icon: <Zap className="w-6 h-6" /> },
    { title: "Founder Profile Badge", icon: <Gift className="w-6 h-6" /> },
  ];

  return (
    <div className="container mx-auto px-4 py-24 md:py-32 max-w-5xl">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tight text-foreground drop-shadow-md">
          Secure Your Early Access
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          Join {stats?.totalPreRegistrations.toLocaleString() || "thousands of"} players waiting for the ultimate PUBG account management platform.
        </p>
        
        <div className="mb-16">
          <CountdownTimer />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <PreRegisterForm />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-black uppercase tracking-widest text-foreground mb-6">Pre-Registration Perks</h3>
          {perks.map((perk, i) => (
            <div key={i} className="glass-card p-4 rounded-xl flex items-center gap-4 border-white/5 hover:border-primary/30 transition-colors">
              <div className="text-primary bg-primary/10 p-2 rounded-lg">
                {perk.icon}
              </div>
              <span className="font-bold text-foreground tracking-wide">{perk.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}