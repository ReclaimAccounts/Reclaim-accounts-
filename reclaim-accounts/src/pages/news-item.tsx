import { useSEO } from "@/hooks/use-seo";
import { useGetNewsItem } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { format } from "date-fns";

export default function NewsItemPage() {
  const { id } = useParams<{ id: string }>();
  const newsId = parseInt(id || "0", 10);
  
  const { data: article, isLoading, error } = useGetNewsItem(newsId, {
    query: { enabled: !!newsId, queryKey: ['news', newsId] }
  });

  useSEO(article ? article.title : "News Article");

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-24 max-w-3xl">
        <Skeleton className="h-6 w-32 mb-12 bg-white/5" />
        <Skeleton className="h-12 w-full mb-6 bg-white/5" />
        <Skeleton className="h-12 w-3/4 mb-12 bg-white/5" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full bg-white/5" />
          <Skeleton className="h-4 w-full bg-white/5" />
          <Skeleton className="h-4 w-5/6 bg-white/5" />
          <Skeleton className="h-4 w-full bg-white/5" />
          <Skeleton className="h-4 w-4/5 bg-white/5" />
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="container mx-auto px-4 py-32 text-center max-w-md">
        <h1 className="text-4xl font-black mb-4 uppercase tracking-widest text-foreground">Intel Not Found</h1>
        <p className="text-muted-foreground mb-8">The news update you're looking for doesn't exist or has been redacted.</p>
        <Link href="/news">
          <Button className="rounded-none bg-primary text-primary-foreground font-bold uppercase tracking-widest h-14 px-8">
            <ArrowLeft className="w-5 h-5 mr-2" /> Return to HQ
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24 md:py-32 max-w-3xl">
      <Link href="/news">
        <Button variant="ghost" className="mb-12 pl-0 hover:bg-transparent hover:text-primary text-muted-foreground transition-colors font-bold uppercase tracking-widest text-xs">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Updates
        </Button>
      </Link>

      <article className="glass-card border-white/10 rounded-[2rem] p-8 md:p-14 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="flex items-center gap-4 mb-8 relative z-10">
          <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-none uppercase tracking-widest font-bold px-3 py-1 text-xs">
            {article.category}
          </Badge>
          <div className="flex items-center text-sm font-medium text-muted-foreground uppercase tracking-widest">
            <Calendar className="w-4 h-4 mr-2" />
            {format(new Date(article.publishedAt), 'MMMM d, yyyy')}
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-black mb-8 text-foreground leading-tight uppercase tracking-wide relative z-10">
          {article.title}
        </h1>
        
        <p className="text-xl text-muted-foreground mb-12 leading-relaxed font-medium relative z-10">
          {article.summary}
        </p>

        <div className="w-full h-px bg-border mb-12 relative z-10" />

        <div className="prose dark:prose-invert prose-lg max-w-none text-muted-foreground relative z-10
            prose-headings:text-foreground prose-headings:font-black prose-headings:uppercase prose-headings:tracking-wide
            prose-a:text-primary hover:prose-a:text-primary/80 prose-a:no-underline
            prose-strong:text-foreground prose-strong:font-bold">
          {article.content.split('\n').map((paragraph, idx) => (
             paragraph.trim() ? <p key={idx} className="mb-6">{paragraph}</p> : null
          ))}
        </div>

        {article.tags && article.tags.length > 0 && (
          <div className="mt-16 pt-8 border-t border-border relative z-10">
            <div className="flex items-center gap-3 flex-wrap">
              <Tag className="w-5 h-5 text-muted-foreground mr-2" />
              {article.tags.map(tag => (
                <Badge key={tag} variant="outline" className="bg-muted border-border text-foreground font-bold tracking-wider uppercase text-[10px] px-3 py-1">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Ad Space */}
      <div className="mt-16 ad-placement w-full h-[100px] border border-dashed border-border/50 rounded-2xl flex items-center justify-center bg-muted/10">
        <span className="text-xs text-muted-foreground/60 font-bold uppercase tracking-widest">Sponsor Area</span>
      </div>
    </div>
  );
}