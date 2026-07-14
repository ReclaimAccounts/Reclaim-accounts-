import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSubmitPreRegistration } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  wantsBeta: z.boolean().default(false),
  discordUsername: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function PreRegisterForm({ defaultWantsBeta = false, compact = false }: { defaultWantsBeta?: boolean, compact?: boolean }) {
  const { toast } = useToast();
  const submitMutation = useSubmitPreRegistration();
  const [successData, setSuccessData] = useState<{ position: number; isBetaTester: boolean } | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      wantsBeta: defaultWantsBeta,
      discordUsername: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    submitMutation.mutate(
      { data },
      {
        onSuccess: (res) => {
          setSuccessData({ position: res.position, isBetaTester: res.isBetaTester });
          // Optional confetti or something could go here
        },
        onError: (err) => {
          toast({
            title: "Pre-Registration Failed",
            description: err.message === "Conflict" ? "This email is already registered." : "An error occurred. Please try again.",
            variant: "destructive",
          });
        },
      }
    );
  };

  if (successData) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 rounded-[2rem] text-center border-primary/30 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-3xl font-bold mb-4 text-foreground uppercase tracking-wider">You're on the list!</h3>
        <p className="text-xl text-muted-foreground mb-6">
          Your position in line is <strong className="text-primary text-2xl">#{successData.position.toLocaleString()}</strong>
        </p>
        
        {successData.isBetaTester && (
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6">
            <h4 className="font-bold text-primary mb-1 uppercase tracking-widest text-sm">Beta Access Granted</h4>
            <p className="text-sm text-white/80">You have been selected for early beta testing. Check your email for instructions.</p>
          </div>
        )}
        
        <p className="text-sm text-muted-foreground">
          We'll email you when Reclaim Accounts officially launches on July 15.
        </p>
      </motion.div>
    );
  }

  return (
    <div className={`glass-card p-6 md:p-8 rounded-[2rem] ${compact ? '' : 'max-w-2xl mx-auto'} border-primary/20`}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className={`grid ${compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-6`}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground font-bold">Player Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" className="bg-background/50 border-border/50 h-12 rounded-xl text-foreground placeholder:text-muted-foreground/40" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground font-bold">Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="player@example.com" className="bg-background/50 border-border/50 h-12 rounded-xl text-foreground placeholder:text-muted-foreground/40" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="wantsBeta"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border border-primary/20 bg-primary/5 p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground border-primary"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-foreground font-medium">Join the Beta Program</FormLabel>
                  <p className="text-sm text-muted-foreground">
                    Get early access to test new features before July 15.
                  </p>
                </div>
              </FormItem>
            )}
          />

          <AnimatePresence>
            {form.watch("wantsBeta") && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <FormField
                  control={form.control}
                  name="discordUsername"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground font-bold">Discord Username (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="username#1234" className="bg-background/50 border-border/50 h-12 rounded-xl text-foreground placeholder:text-muted-foreground/40" {...field} />
                      </FormControl>
                      <p className="text-xs text-muted-foreground mt-1">For access to the private beta tester channels.</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <Button 
            type="submit" 
            className="w-full h-14 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-lg uppercase tracking-widest font-bold shadow-lg shadow-primary/20"
            disabled={submitMutation.isPending}
          >
            {submitMutation.isPending ? (
              <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Processing...</span>
            ) : (
              <span className="flex items-center gap-2"><Send className="w-5 h-5" /> Pre-Register Now</span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}