export const SOCIAL_LINKS = {
  youtube: {
    url: "https://youtube.com/@reclaimaccounts?si=d0F2KciuXIHui3Tp",
    label: "YouTube",
    handle: "@ReclaimAccounts",
    description: "Tutorials, guides & news",
    color: "text-red-500",
    hoverBorder: "hover:border-red-500/50",
    hoverShadow: "hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]",
    bgColor: "bg-red-500/10",
  },
  whatsapp: {
    url: "https://whatsapp.com/channel/0029VbB1MnVAojYqZ89rTl47",
    label: "WhatsApp Channel",
    handle: "Reclaim Accounts",
    description: "Instant updates & alerts",
    color: "text-green-500",
    hoverBorder: "hover:border-green-500/50",
    hoverShadow: "hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]",
    bgColor: "bg-green-500/10",
  },
  tiktok: {
    url: "https://www.tiktok.com/@reclaim_accounts?_r=1&_t=ZS-97Hv5osoBN4",
    label: "TikTok",
    handle: "@reclaim_accounts",
    description: "Short tips & highlights",
    color: "text-pink-400",
    hoverBorder: "hover:border-pink-400/50",
    hoverShadow: "hover:shadow-[0_0_20px_rgba(244,114,182,0.2)]",
    bgColor: "bg-pink-500/10",
  },
  telegram: {
    url: "https://t.me/ReclaimAccounts",
    label: "Telegram",
    handle: "@ReclaimAccounts",
    description: "Community & support chat",
    color: "text-blue-400",
    hoverBorder: "hover:border-blue-400/50",
    hoverShadow: "hover:shadow-[0_0_20px_rgba(96,165,250,0.2)]",
    bgColor: "bg-blue-500/10",
  },
} as const;

export const SOCIAL_LINKS_ARRAY = Object.values(SOCIAL_LINKS);
