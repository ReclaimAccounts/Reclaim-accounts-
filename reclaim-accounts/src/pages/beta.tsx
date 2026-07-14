import { useSEO } from "@/hooks/use-seo";
import { useGetStats } from "@workspace/api-client-react";
import { PreRegisterForm } from "@/components/preregister-form";
import { Bug, Zap, HandHeart, MessageSquare, Star, ShieldCheck } from "lucide-react";

export default function BetaPage() {
  useSEO("Beta Program");
  const { data: stats } = useGetStats();

  const benefits = [
    { title: "Early Access", desc: "Test new features before public release", icon: <Zap /> },
    { title: "Give Feedback", desc: "Directly influence the platform's development", icon: <MessageSquare /> },
    { title: "Bug Reporting", desc: "Help us identify and squash bugs", icon: <Bug /> },
    { title: "Shape the App", desc: "Your suggestions build the roadmap", icon: <HandHeart /> },
    { title: "Beta Badge", desc: "Exclusive profile badge on launch", icon: <Star /> },
    { title: "Priority Support", desc: "Jump to the front of the support queue", icon: <ShieldCheck /> },
  ];

  return (
    <div className="container mx-auto px-4 py-24 md:py-32 max-w-6xl">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-bold uppercase tracking-wider mb-6">
          Beta v1.3.2
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tight text-foreground drop-shadow-md">
          Join the Beta Program
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Help us build the ultimate PUBG account recovery and security platform. Beta testers get exclusive early access and help shape the future of Reclaim Accounts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-wide text-foreground mb-8">What's in it for you?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((b, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl border-white/5">
                <div className="text-primary mb-4">{b.icon}</div>
                <h3 className="font-bold text-foreground uppercase tracking-wide mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 glass-card p-6 rounded-2xl border-blue-500/20 bg-blue-500/5">
            <h3 className="font-bold text-blue-400 uppercase tracking-wide mb-2">Current Test Phase</h3>
            <p className="text-sm text-muted-foreground">We are currently testing the new Account Status checker API integration and the Appeal Resources navigation flow. Your feedback on these specific features is highly valuable.</p>
          </div>
        </div>

        <div className="flex flex-col h-full">
          <div className="glass-panel p-8 rounded-3xl border-primary/20 relative overflow-hidden flex-1">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
            
            <h2 className="text-3xl font-black uppercase tracking-wide text-foreground mb-2 relative z-10">Apply Now</h2>
            <p className="text-muted-foreground mb-8 relative z-10">Join {stats?.betaTesters || 0} other testers currently active.</p>
            
            <div className="relative z-10">
              <PreRegisterForm defaultWantsBeta={true} compact={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}