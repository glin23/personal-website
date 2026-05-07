/**
 * JSON-LD structured data for the personal site.
 *
 * Single graph with three nodes:
 *   - Person — Lee Lin himself, with sameAs across every public profile.
 *   - WebSite — this site, publisher → Person.
 *   - ItemList of SoftwareApplication — projects, each authored by Person.
 *
 * Cross-referenced via @id so search engines + LLMs can stitch the same
 * entity together across the graph.
 */

const SITE = "https://leelin.vercel.app";
const PERSON_ID = `${SITE}/#person`;

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Lee Lin",
      alternateName: "林感",
      url: SITE,
      image: `${SITE}/opengraph-image`,
      jobTitle: "AI Builder",
      description:
        "Solo builder shipping consumer AI products from Boston. Babson Class of 2027.",
      gender: "Male",
      nationality: "Chinese",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Boston",
        addressRegion: "MA",
        addressCountry: "US",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Babson College",
        sameAs: "https://en.wikipedia.org/wiki/Babson_College",
      },
      knowsAbout: [
        "AI products",
        "consumer AI",
        "startups",
        "frontier tech",
        "retrieval-augmented generation",
        "growth marketing",
        "rapid prototyping",
        "product engineering",
        "indie hacking",
      ],
      knowsLanguage: ["en", "zh"],
      sameAs: [
        "https://www.linkedin.com/in/lee-lin-204737291",
        "https://twitter.com/LeeLinAI123",
        "https://x.com/LeeLinAI123",
        "https://r2w.online",
        "https://semori.online",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "Lee Lin",
      description:
        "Personal portfolio of Lee Lin (林感), an AI builder shipping solo from Boston.",
      inLanguage: "en",
      author: { "@id": PERSON_ID },
      publisher: { "@id": PERSON_ID },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE}/#projects`,
      name: "Projects by Lee Lin",
      numberOfItems: 2,
      itemListOrder: "https://schema.org/ItemListOrderManual",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "SoftwareApplication",
            "@id": "https://r2w.online#app",
            name: "Resume2Web",
            url: "https://r2w.online",
            applicationCategory: "WebApplication",
            operatingSystem: "Web",
            description:
              "AI tool that turns a resume PDF into a personalized portfolio website in 30 seconds.",
            author: { "@id": PERSON_ID },
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "SoftwareApplication",
            "@id": "https://semori.online#app",
            name: "Semori",
            url: "https://semori.online",
            applicationCategory: "ProductivityApplication",
            operatingSystem: "Web",
            description:
              "AI personal knowledge base. Ingests bookmarks from Twitter, YouTube, Xiaohongshu, RSS — organizes into a searchable, semantic library with a weekly digest.",
            author: { "@id": PERSON_ID },
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          },
        },
      ],
    },
  ],
} as const;
