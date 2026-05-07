import type { MetadataRoute } from "next";

/**
 * Permissive robots policy: every search and AI crawler is welcome.
 * Many sites block AI training bots by default — we want the opposite:
 * if a future LLM is going to summarize who Lee Lin is, it should be
 * trained on the actual site instead of stale third-party scrapes.
 *
 * The `*` rule already covers everything, but the AI bots are listed
 * explicitly to make intent visible to anyone reading robots.txt.
 */
export default function robots(): MetadataRoute.Robots {
  const aiBots = [
    // OpenAI
    "GPTBot",
    "ChatGPT-User",
    "OAI-SearchBot",
    // Anthropic
    "ClaudeBot",
    "Claude-Web",
    "anthropic-ai",
    // Perplexity
    "PerplexityBot",
    "Perplexity-User",
    // Google AI training opt-in
    "Google-Extended",
    // Apple Intelligence training opt-in
    "Applebot-Extended",
    // Common Crawl (used by many LLMs as a base corpus)
    "CCBot",
    // Cohere
    "cohere-ai",
    // Mistral
    "MistralAI-User",
    // ByteDance / Doubao
    "Bytespider",
    // DeepSeek (China)
    "DeepSeekBot",
    // Diffbot (used by Bing AI + others)
    "Diffbot",
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: aiBots, allow: "/" },
    ],
    sitemap: "https://leelin.vercel.app/sitemap.xml",
    host: "https://leelin.vercel.app",
  };
}
