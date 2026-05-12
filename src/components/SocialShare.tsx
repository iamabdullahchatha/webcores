import { Linkedin, Twitter, Facebook, MessageCircle, Mail, Share2 } from "lucide-react";

interface SocialShareProps {
  url?: string;
  title?: string;
  className?: string;
  label?: string;
}

const DEFAULT_URL = "https://www.webcoreuae.com/";
const DEFAULT_TITLE = "Webcore Solutions — Web, Software & SEO Agency in Dubai";

export function SocialShare({
  url = DEFAULT_URL,
  title = DEFAULT_TITLE,
  className = "",
  label = "Share Webcore Solutions",
}: SocialShareProps) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const platforms = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      color: "#0A66C2",
    },
    {
      name: "X",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
      color: "#0f172a",
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      color: "#1877F2",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: `https://wa.me/?text=${t}%20${u}`,
      color: "#25D366",
    },
    {
      name: "Email",
      icon: Mail,
      href: `mailto:?subject=${t}&body=${u}`,
      color: "#64748B",
    },
  ];

  return (
    <nav
      aria-label={label}
      className={`flex flex-wrap items-center justify-center gap-3 ${className}`}
    >
      <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/70">
        <Share2 className="h-3.5 w-3.5" />
        Share this page
      </span>
      {platforms.map(({ name, icon: Icon, href, color }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${name}`}
          className="group relative inline-flex h-10 w-10 items-center justify-center rounded-xl glass border border-border/30 hover:border-primary/40 hover:shadow-glow transition-all duration-200 hover:-translate-y-0.5"
        >
          <div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-[0.18] transition-opacity duration-200"
            style={{ background: color }}
          />
          <Icon className="relative h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
          <span className="sr-only">Share on {name}</span>
        </a>
      ))}
    </nav>
  );
}
