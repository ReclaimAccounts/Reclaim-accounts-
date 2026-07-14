import { useSEO } from "@/hooks/use-seo";
import { useListFaq } from "@workspace/api-client-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { HelpCircle } from "lucide-react";

export default function FaqPage() {
  useSEO("Frequently Asked Questions");
  
  const { data: faqs, isLoading } = useListFaq();

  // Group FAQs by category
  const groupedFaqs = faqs?.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, typeof faqs>);

  const categoryTitles: Record<string, string> = {
    installation: "Setup & Access",
    usage: "Platform Features",
    account: "Account Recovery",
    security: "Security & Protection",
    general: "General Inquiries"
  };

  return (
    <div className="container mx-auto px-4 py-24 md:py-32 max-w-4xl">
      <div className="text-center mb-16">
        <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mx-auto mb-6 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
          <HelpCircle className="w-10 h-10" />
        </div>
        <h1 className="text-5xl md:text-6xl font-black mb-6 uppercase tracking-tight text-foreground drop-shadow-md">Support HQ</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Find answers to the most common questions about Reclaim Accounts, security practices, and PUBG account recovery.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-8">
          {[1, 2].map(section => (
            <div key={section} className="space-y-4">
              <Skeleton className="h-8 w-48 mb-6 bg-white/5" />
              <Skeleton className="h-20 w-full rounded-2xl bg-white/5" />
              <Skeleton className="h-20 w-full rounded-2xl bg-white/5" />
            </div>
          ))}
        </div>
      ) : groupedFaqs && Object.keys(groupedFaqs).length > 0 ? (
        <div className="space-y-16">
          {Object.entries(groupedFaqs).map(([category, items]) => (
            <div key={category}>
              <h2 className="text-2xl font-black uppercase tracking-widest mb-6 text-primary pb-4 border-b border-border">
                {categoryTitles[category] || category.charAt(0).toUpperCase() + category.slice(1)}
              </h2>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {items.sort((a, b) => (a.order || 99) - (b.order || 99)).map((faq) => (
                  <AccordionItem 
                    key={faq.id} 
                    value={faq.id.toString()}
                    className="glass-card border-white/5 rounded-2xl px-6 data-[state=open]:border-primary/50 data-[state=open]:shadow-[0_0_15px_rgba(245,158,11,0.1)] transition-all overflow-hidden"
                  >
                    <AccordionTrigger className="text-left font-bold text-lg hover:text-primary py-6 hover:no-underline uppercase tracking-wide text-foreground">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-base">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground glass-card border-white/10 rounded-3xl">
          <p className="font-bold text-lg uppercase tracking-widest mb-2 text-foreground">Intel Unavailable</p>
          <p>No FAQs available at the moment. Please check back later.</p>
        </div>
      )}
    </div>
  );
}