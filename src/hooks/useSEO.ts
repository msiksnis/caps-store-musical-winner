import { useEffect } from "react";

interface UseSEOProps {
  title: string;
  description?: string;
  keywords?: string;
  currentPath: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
}

// Helper to update meta tags
const updateMetaTag = (name: string, content: string) => {
  if (!content) return; // Ensure there's content to set
  let metaTag = document.querySelector(`meta[name="${name}"]`);

  if (!metaTag) {
    metaTag = document.createElement("meta");
    metaTag.setAttribute("name", name);
    document.head.appendChild(metaTag);
  }

  metaTag.setAttribute("content", content);
};

// Helper to update Open Graph tags (for social media SEO)
const updateOGTag = (property: string, content: string) => {
  if (!content) return; // Ensure there's content to set
  let ogTag = document.querySelector(`meta[property="${property}"]`);

  if (!ogTag) {
    ogTag = document.createElement("meta");
    ogTag.setAttribute("property", property);
    document.head.appendChild(ogTag);
  }

  ogTag.setAttribute("content", content);
};

// SEO Hook to update document title and meta tags
export const useSEO = ({
  title,
  description = "Default description for Cap's Store",
  keywords = "default, keywords, for, seo",
  currentPath,
  ogTitle,
  ogDescription,
  ogImage = `${window.location.origin}/assets/logo.png`,
  ogUrl,
}: UseSEOProps) => {
  useEffect(() => {
    // Sets the document title
    document.title = title || "Cap's Store";

    // Sets meta description
    updateMetaTag("description", description);

    // Sets meta keywords
    updateMetaTag("keywords", keywords);

    // Sets Open Graph meta tags
    updateOGTag("og:title", ogTitle || title);
    updateOGTag("og:description", ogDescription || description);
    updateOGTag("og:image", ogImage);
    updateOGTag("og:url", ogUrl || window.location.href);

    // Sets canonical URL
    let canonicalTag = document.querySelector("link[rel='canonical']");
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute("href", ogUrl || window.location.href);
  }, [
    title,
    description,
    keywords,
    currentPath,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
  ]);
};
