import { useSEO } from "@/hooks/use-seo";
import { motion, type Variants } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import { SiYoutube } from "react-icons/si";
import { SOCIAL_LINKS } from "@/lib/social-links";

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const VIDEOS = [
  {
    id: "xBt3PIqtpUM",
    title: "Reclaim Accounts — Official Teaser #1",
    desc: "First look at the Reclaim Accounts app launching July 15, 2026.",
    type: "teaser" as const,
    badge: "Teaser #1",
    badgeColor: "bg-primary/10 text-primary border-primary/30",
  },
  {
    id: "Hj9FChQ5kJ8",
    title: "Reclaim Accounts — Official Teaser #2",
    desc: "A deeper look at features and what's coming for PUBG players.",
    type: "teaser" as const,
    badge: "Teaser #2",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  },
  {
    id: "IrCblM91rZs",
    title: "Reclaim Accounts — Short Preview",
    desc: "Quick highlight of what the app does. Watch on TikTok & YouTube Shorts.",
    type: "short" as const,
    badge: "Shorts",
    badgeColor: "bg-pink-500/10 text-pink-400 border-pink-500/30",
    isShort: true,
  },
];

function VideoEmbed({ videoId, isShort = false }: { videoId: string; isShort?: boolean }) {
  const src = isShort
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&rel=0`
    : `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1`;

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden bg-black ${isShort ? "aspect-[9/16] max-w-[320px] mx-auto" : "aspect-video"}`}>
      <iframe
        src={src}
        title="Reclaim Accounts teaser"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full border-0"
      />
    </div>
  );
}

export default function VideosPage() {
  useSEO("App Teasers & Videos");

  return (
    <div className="container mx-auto px-4 py-24 md:py-32 max-w-6xl">
      {/* Header */}
      <motion.div initial="hidden" animate="visible" variants={FADE_UP} className="text-center mb-16">
        <div className="w-20 h-20 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 mx-auto mb-6">
          <Play className="w-10 h-10" />
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          Official Teasers
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tight text-foreground">Watch Our Teasers</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Get a preview of Reclaim Accounts before the official launch on July 15, 2026.
        </p>
      </motion.div>

      {/* Main teasers — side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {VIDEOS.filter((v) => !v.isShort).map((video, i) => (
          <motion.div
            key={video.id}
            initial="hidden"
            animate="visible"
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.15 } } }}
          >
            <div className="glass-card rounded-3xl overflow-hidden border-white/10 hover:border-white/20 transition-all duration-300 group">
              <VideoEmbed videoId={video.id} />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${video.badgeColor}`}>
                    {video.badge}
                  </span>
                </div>
                <h3 className="text-xl font-black text-foreground uppercase tracking-wide mb-2">{video.title}</h3>
                <p className="text-sm text-muted-foreground">{video.desc}</p>
                <a
                  href={`https://youtu.be/${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-xs font-bold text-red-400 hover:text-red-300 uppercase tracking-widest transition-colors"
                >
                  <SiYoutube className="w-4 h-4" /> Watch on YouTube <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Shorts section */}
      {VIDEOS.filter((v) => v.isShort).map((video) => (
        <motion.div
          key={video.id}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={FADE_UP}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <span className={`text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border ${video.badgeColor}`}>
              YouTube Shorts
            </span>
            <h2 className="text-3xl font-black text-foreground uppercase tracking-tight mt-4 mb-2">{video.title}</h2>
            <p className="text-muted-foreground">{video.desc}</p>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-sm">
              <div className="glass-card rounded-3xl overflow-hidden border-white/10 p-4">
                <VideoEmbed videoId={video.id} isShort />
                <a
                  href={`https://youtube.com/shorts/${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 mt-4 text-xs font-bold text-red-400 hover:text-red-300 uppercase tracking-widest transition-colors"
                >
                  <SiYoutube className="w-4 h-4" /> Open in YouTube <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Subscribe CTA */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={FADE_UP}
        className="glass-card rounded-3xl p-8 md:p-12 text-center border-red-500/20 bg-red-500/5"
      >
        <SiYoutube className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-3xl font-black text-foreground uppercase tracking-widest mb-3">Don't Miss the Launch</h3>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Subscribe to our YouTube channel to get notified the moment the app drops on July 15, 2026.
        </p>
        <a
          href={SOCIAL_LINKS.youtube.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-widest text-sm transition-all hover:scale-105 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
        >
          <SiYoutube className="w-5 h-5" /> Subscribe on YouTube
        </a>
      </motion.div>
    </div>
  );
}
