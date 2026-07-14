import { useSEO } from "@/hooks/use-seo";
import { useGetLatestDownload, useListDownloads } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Download, Info, ShieldCheck, FileClock, ArrowRight, Lock, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "wouter";
import { CountdownTimer } from "@/components/countdown";

export default function DownloadPage() {
  useSEO("Download Center");
  
  const { data: latest, isLoading: latestLoading } = useGetLatestDownload();
  const { data: history, isLoading: historyLoading } = useListDownloads();

  const formatSize = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="container mx-auto px-4 py-24 md:py-32 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tight text-foreground drop-shadow-md">
          Download Center
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          The ultimate PUBG account recovery and security toolkit.
        </p>
      </div>

      {/* Locked Release Banner */}
      <div className="glass-card border-primary/40 bg-primary/10 rounded-[2rem] p-8 md:p-12 mb-16 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none" />
        
        <Lock className="w-16 h-16 text-primary mx-auto mb-6" />
        <h2 className="text-3xl md:text-4xl font-black text-foreground uppercase tracking-wide mb-4">
          Available on Official Release Day
        </h2>
        <div className="flex items-center justify-center gap-2 text-primary font-bold text-xl uppercase tracking-widest mb-10">
          <Calendar className="w-6 h-6" />
          July 15, 2026
        </div>

        <div className="mb-12">
          <CountdownTimer targetDate="2026-07-15T00:00:00Z" size="small" />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <Link href="/preregister">
            <Button size="lg" className="w-full sm:w-auto rounded-none bg-primary text-primary-foreground text-lg uppercase tracking-widest font-bold h-14 px-8 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]">
              Pre-Register to get notified
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full rounded-none text-lg uppercase tracking-widest font-bold h-14 px-8 opacity-50 cursor-not-allowed border-border bg-muted/30">
                  <Download className="w-5 h-5 mr-2" /> Download APK
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-card border-border">
              <p>Downloads are locked until July 15.</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Latest Version Info */}
        <div className="lg:col-span-1 glass-card border-white/10 rounded-3xl p-6 h-fit">
          <h3 className="text-xl font-bold uppercase tracking-wider text-foreground mb-6 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-500" /> Current Build
          </h3>
          
          {latestLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ) : latest ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Version</span>
                <span className="font-bold text-foreground">{latest.version} <Badge className="bg-primary/20 text-primary border-none ml-2">BETA</Badge></span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Updated</span>
                <span className="font-bold text-foreground">{format(new Date(latest.releaseDate), 'MMM d, yyyy')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Size</span>
                <span className="font-bold text-foreground">{formatSize(latest.fileSizeBytes)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Requires</span>
                <span className="font-bold text-foreground">Android {latest.minAndroidVersion}+</span>
              </div>
              
              <div className="pt-6 border-t border-white/10">
                <h4 className="font-bold text-foreground mb-2 uppercase text-sm tracking-wider">Release Notes</h4>
                <p className="text-sm text-muted-foreground">{latest.releaseNotes}</p>
                
                {latest.changelog && latest.changelog.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {latest.changelog.map((log, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-blue-500">•</span> {log}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ) : null}
        </div>

        {/* Ad Space */}
        <div className="lg:col-span-2">
           <div className="ad-placement ad-rewarded w-full h-full min-h-[200px] border border-dashed border-border/50 rounded-3xl flex items-center justify-center bg-muted/10">
             <span className="text-xs text-muted-foreground/60">Rewarded Ad Space - Support Development</span>
           </div>
        </div>
      </div>

      {/* Version History */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <FileClock className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-black uppercase tracking-widest text-foreground">Beta History</h2>
        </div>

        <div className="glass-card border-white/10 rounded-3xl overflow-hidden">
          {historyLoading ? (
            <div className="p-6 space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : history && history.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/20 hover:bg-muted/20">
                  <TableRow className="border-border">
                    <TableHead className="w-[150px] text-foreground font-bold tracking-wider">Version</TableHead>
                    <TableHead className="text-foreground font-bold tracking-wider">Date</TableHead>
                    <TableHead className="text-foreground font-bold tracking-wider">Size</TableHead>
                    <TableHead className="text-right text-foreground font-bold tracking-wider">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.map((dl) => (
                    <TableRow key={dl.id} className="border-border hover:bg-muted/20">
                      <TableCell className="font-bold text-foreground">
                        {dl.version}
                        {dl.isLatest && (
                          <Badge className="ml-2 bg-primary/20 text-primary border-none text-[10px] px-1.5 uppercase tracking-wider">Latest</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground font-medium">{format(new Date(dl.releaseDate), 'MMM d, yyyy')}</TableCell>
                      <TableCell className="text-muted-foreground font-medium">{formatSize(dl.fileSizeBytes)}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline" className="border-blue-500/30 text-blue-400 bg-blue-500/10 uppercase tracking-wider">Locked</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="p-12 text-center text-muted-foreground font-medium">
              No version history available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}