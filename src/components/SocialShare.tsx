import { Linkedin, Facebook, MessageCircle, Mail, Share2 } from "lucide-react";

interface SocialShareProps {
  className?: string;
  label?: string;
}

export function SocialShare({
  className = "",
  label = "Follow Webcore Solutions",
}: SocialShareProps) {

  const platforms = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/company/webcore-solutions-uae/",
      color: "#0A66C2",
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://www.facebook.com/profile.php?id=61587249472207",
      color: "#1877F2",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: "https://wa.me/447570792516",
      color: "#25D366",
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:info@webcoreuae.com",
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
        Follow us
      </span>
      {platforms.map(({ name, icon: Icon, href, color }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="nofollow noopener noreferrer"
          aria-label={`Visit us on ${name}`}
          className="group relative inline-flex h-10 w-10 items-center justify-center rounded-xl glass border border-border/30 hover:border-primary/40 hover:shadow-glow transition-all duration-200 hover:-translate-y-0.5"
        >
          <div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-[0.18] transition-opacity duration-200"
            style={{ background: color }}
          />
          <Icon className="relative h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
          <span className="sr-only">Visit us on {name}</span>
        </a>
      ))}
    </nav>
  );
}
