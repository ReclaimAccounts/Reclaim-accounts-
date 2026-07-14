import { useSEO } from "@/hooks/use-seo";
import { useSubmitContact } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, MessageSquare } from "lucide-react";
import { SiYoutube, SiWhatsapp, SiTiktok, SiTelegram } from "react-icons/si";
import { SOCIAL_LINKS } from "@/lib/social-links";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  useSEO("Contact Us");
  const { toast } = useToast();
  const submitMutation = useSubmitContact();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = (data: ContactFormValues) => {
    submitMutation.mutate(
      { data },
      {
        onSuccess: () => {
          toast({
            title: "Message Received",
            description: "Your message has been delivered. We will respond shortly.",
            className: "bg-green-600 text-white border-none font-bold tracking-wide",
          });
          form.reset();
        },
        onError: () => {
          toast({
            title: "Failed to Send",
            description: "There was a problem sending your message. Please try again.",
            variant: "destructive",
          });
        },
      }
    );
  };

  const socials = [
    {
      name: "Email Support",
      desc: "support@reclaimaccounts.app",
      icon: <Mail className="w-6 h-6" />,
      link: "mailto:support@reclaimaccounts.app",
      color: "text-primary",
      hoverBorder: "hover:border-primary/50",
      hoverShadow: "hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]",
      bg: "bg-primary/10",
    },
    {
      name: SOCIAL_LINKS.telegram.label,
      desc: SOCIAL_LINKS.telegram.handle,
      icon: <SiTelegram className="w-6 h-6" />,
      link: SOCIAL_LINKS.telegram.url,
      color: SOCIAL_LINKS.telegram.color,
      hoverBorder: SOCIAL_LINKS.telegram.hoverBorder,
      hoverShadow: SOCIAL_LINKS.telegram.hoverShadow,
      bg: SOCIAL_LINKS.telegram.bgColor,
    },
    {
      name: SOCIAL_LINKS.whatsapp.label,
      desc: SOCIAL_LINKS.whatsapp.handle,
      icon: <SiWhatsapp className="w-6 h-6" />,
      link: SOCIAL_LINKS.whatsapp.url,
      color: SOCIAL_LINKS.whatsapp.color,
      hoverBorder: SOCIAL_LINKS.whatsapp.hoverBorder,
      hoverShadow: SOCIAL_LINKS.whatsapp.hoverShadow,
      bg: SOCIAL_LINKS.whatsapp.bgColor,
    },
    {
      name: SOCIAL_LINKS.youtube.label,
      desc: SOCIAL_LINKS.youtube.handle,
      icon: <SiYoutube className="w-6 h-6" />,
      link: SOCIAL_LINKS.youtube.url,
      color: SOCIAL_LINKS.youtube.color,
      hoverBorder: SOCIAL_LINKS.youtube.hoverBorder,
      hoverShadow: SOCIAL_LINKS.youtube.hoverShadow,
      bg: SOCIAL_LINKS.youtube.bgColor,
    },
    {
      name: SOCIAL_LINKS.tiktok.label,
      desc: SOCIAL_LINKS.tiktok.handle,
      icon: <SiTiktok className="w-6 h-6" />,
      link: SOCIAL_LINKS.tiktok.url,
      color: SOCIAL_LINKS.tiktok.color,
      hoverBorder: SOCIAL_LINKS.tiktok.hoverBorder,
      hoverShadow: SOCIAL_LINKS.tiktok.hoverShadow,
      bg: SOCIAL_LINKS.tiktok.bgColor,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-24 md:py-32 max-w-6xl">
      <div className="text-center mb-16">
        <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
          <MessageSquare className="w-10 h-10" />
        </div>
        <h1 className="text-5xl md:text-6xl font-black mb-6 uppercase tracking-tight text-foreground drop-shadow-md">Get In Touch</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Have a question or need support? Reach out through any channel — we typically respond within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Form */}
        <div className="lg:col-span-2 glass-card p-8 md:p-12 rounded-[2.5rem] border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
          <h2 className="text-2xl font-black uppercase tracking-widest mb-8 text-foreground relative z-10">Send a Message</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase font-bold tracking-wider text-xs text-muted-foreground">Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Player123" className="bg-background/80 border-border h-14 rounded-xl text-foreground placeholder:text-muted-foreground/40" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase font-bold tracking-wider text-xs text-muted-foreground">Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" className="bg-background/80 border-border h-14 rounded-xl text-foreground placeholder:text-muted-foreground/40" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <FormField control={form.control} name="subject" render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase font-bold tracking-wider text-xs text-muted-foreground">Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="How can we help?" className="bg-background/80 border-border h-14 rounded-xl text-foreground placeholder:text-muted-foreground/40" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase font-bold tracking-wider text-xs text-muted-foreground">Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your question or issue..."
                      className="min-h-[180px] bg-background/80 border-border rounded-xl resize-none text-foreground placeholder:text-muted-foreground/40 p-4"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto h-14 px-10 rounded-none bg-primary text-primary-foreground font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all"
                disabled={submitMutation.isPending}
              >
                {submitMutation.isPending ? "Sending..." : <span className="flex items-center gap-2">Send Message <Send className="w-5 h-5" /></span>}
              </Button>
            </form>
          </Form>
        </div>

        {/* Social Links */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-black uppercase tracking-widest text-foreground mb-2">Find Us On</h2>
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.link}
              target={social.link.startsWith("mailto") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className={`glass-card border-white/5 p-5 rounded-2xl flex items-center gap-4 ${social.hoverBorder} ${social.hoverShadow} transition-all duration-300 group`}
            >
              <div className={`w-12 h-12 rounded-xl ${social.bg} flex items-center justify-center group-hover:scale-110 transition-transform ${social.color}`}>
                {social.icon}
              </div>
              <div className="min-w-0">
                <div className="font-bold uppercase tracking-wide text-foreground group-hover:text-primary transition-colors text-sm">{social.name}</div>
                <div className="text-xs text-muted-foreground truncate">{social.desc}</div>
              </div>
              <div className="ml-auto text-muted-foreground/40 group-hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest">Join</div>
            </a>
          ))}

          <div className="ad-placement w-full flex-1 min-h-[100px] mt-2 border border-dashed border-border/50 rounded-2xl flex items-center justify-center bg-muted/10">
            <span className="text-xs text-muted-foreground/60 uppercase tracking-widest font-bold">Sponsor Area</span>
          </div>
        </div>
      </div>
    </div>
  );
}
