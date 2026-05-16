import { useEffect } from "react";
import { usePageSeoOverride } from "@/lib/content";

function setMeta(name: string, content: string, prop = false) {
  const attr = prop ? "property" : "name";
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function DynamicSeo({ pageId }: { pageId: string }) {
  const { data: override } = usePageSeoOverride(pageId);

  useEffect(() => {
    if (!override) return;

    if (override.seoTitle) {
      document.title = override.seoTitle;
      setMeta("og:title", override.seoTitle, true);
      setMeta("twitter:title", override.seoTitle);
    }
    if (override.seoDescription) {
      setMeta("description", override.seoDescription);
      setMeta("og:description", override.seoDescription, true);
      setMeta("twitter:description", override.seoDescription);
    }
    if (override.seoKeywords) {
      setMeta("keywords", override.seoKeywords);
    }
    if (override.ogTitle) {
      setMeta("og:title", override.ogTitle, true);
    }
    if (override.ogDescription) {
      setMeta("og:description", override.ogDescription, true);
    }
  }, [override]);

  return null;
}
