import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Caveat,
  Cormorant_Garamond,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-handwrite",
  subsets: ["latin"],
  display: "swap",
});

// classical Garamond revival — clean f / j, no quirks
const bookSerif = Cormorant_Garamond({
  variable: "--font-book",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Lee Lin — AI Builder",
  description: "Solo builder shipping AI products from Boston. Babson '27.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${jetbrainsMono.variable} ${caveat.variable} ${bookSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink text-bone selection:bg-volt selection:text-eclipse">
        {children}
      </body>
    </html>
  );
}
