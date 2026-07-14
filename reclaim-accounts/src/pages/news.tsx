import { useSEO } from "@/hooks/use-seo";
import { useListNews } from "@workspace/api-client-react";
import { useState } from "react";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ArrowRight, Crosshair } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ListNewsCategory } from "@workspace/api-client-react";

type TabValue = ListNewsCategory | "all";

export default function NewsPage() {
  useSEO("News & Updates");
  const [category, setCategory] = useState<TabValue>("all");

  const queryParams = category === "all" ? undefined : { category };
  const { data: news, isLoading } = useListNews(queryParams);

  return (
    <div className="container mx-auto px-4 py-24 md:py-32 max-w-6xl">
      <div className="text-center mb-16">
        <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mx-auto mb-6 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
          <Crosshair className="w-8 h-8" />
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tight text-foreground drop-shadow-md">
          Intel & Updates
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          The latest security announcements, platform news, and PUBG ban wave intelligence.
        </p>

        <Tabs defaultValue="all" onValueChange={(v) => setCategory(v as TabValue)} className="max-w-3xl mx-auto">
          <TabsList className="grid grid-cols-3 md:grid-cols-5 h-auto p-1 bg-muted/60 border border-border backdrop-blur-md rounded-none mb-12">
            <TabsTrigger value="all" className="rounded-none px-4 py-3 uppercase tracking-widest font-bold text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">All</TabsTrigger>
            <TabsTrigger value="release" className="rounded-none px-4 py-3 uppercase tracking-widest font-bold text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Releases</TabsTrigger>
            <TabsTrigger value="announcement" className="rounded-none px-4 py-3 uppercase tracking-widest font-bold text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">News</TabsTrigger>
            <TabsTrigger value="update" className="rounded-none px-4 py-3 uppercase tracking-widest font-bold text-xs hidden md:block data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Updates</TabsTrigger>
            <TabsTrigger value="bugfix" className="rounded-none px-4 py-3 uppercase tracking-widest font-bold text-xs hidden md:block data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Fixes</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Ad Space */}
      <div className="ad-placement ad-banner w-full max-w-4xl mx-auto mb-16 h-[90px] border border-dashed border-border/50 rounded-xl flex items-center justify-center bg-muted/10">
        <span className="text-xs text-muted-foreground/60 uppercase tracking-widest font-bold">Banner Ad Space</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          [1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="flex flex-col gap-4 glass-card p-6 rounded-3xl">
              <Skeleton className="h-6 w-1/3 bg-white/5 mb-4" />
              <Skeleton className="h-8 w-3/4 bg-white/5 mb-4" />
              <Skeleton className="h-20 w-full bg-white/5" />
            </div>
          ))
        ) : news && news.length > 0 ? (
          news.map((item) => (
            <Link key={item.id} href={`/news/${item.id}`}>
              <div className="group h-full flex flex-col p-8 rounded-[2rem] glass-card border-white/5 hover:border-blue-500/50 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <Badge variant="outline" className={`
                    uppercase tracking-wider font-bold text-[10px] px-2 py-1
                    ${item.category === 'release' ? 'bg-green-500/10 text-green-400 border-green-500/30' : ''}
                    ${item.category === 'announcement' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' : ''}
                    ${item.category === 'update' ? 'bg-primary/10 text-primary border-primary/30' : ''}
                    ${item.category === 'bugfix' ? 'bg-red-500/10 text-red-400 border-red-500/30' : ''}
                  `}>
                    {item.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {format(new Date(item.publishedAt), 'MMM d, yyyy')}
                  </span>
                </div>
                
                <h2 className="text-2xl font-black mb-4 text-foreground group-hover:text-primary transition-colors line-clamp-2 uppercase tracking-wide relative z-10">
                  {item.title}
                </h2>
                
                <p className="text-muted-foreground text-sm line-clamp-3 mb-8 flex-1 relative z-10">
                  {item.summary}
                </p>
                
                <div className="flex items-center text-blue-400 text-sm font-bold uppercase tracking-widest mt-auto group-hover:text-primary transition-colors relative z-10">
                  Read Intel <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-24 text-center glass-card border-white/5 rounded-3xl">
            <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Crosshair className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-black mb-2 uppercase tracking-widest text-foreground">No Intel Found</h3>
            <p className="text-muted-foreground">There are currently no articles in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}