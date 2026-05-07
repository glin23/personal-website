import type { MetadataRoute } from "next";

/**
 * Single-page portfolio: only the home URL is indexed. The hash sections
 * (#about / #work / #hobby / #contact) are not separate routes — search
 * engines that respect fragment identifiers will still surface them via
 * the page's structured data and headings.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://leelin.vercel.app",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
