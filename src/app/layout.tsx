import { GlassSheen } from "@/components/glass-sheen";
import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/content/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["wdth", "opsz"],
});

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Your stickers. Your vibe.`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | Your stickers. Your vibe.`,
    description: site.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Stix N Vibes stickers over a crowded stall in Goa" }],
  },
  twitter: { card: "summary_large_image" },
};

// Tells Google who we are: a sticker store in Goa, its Instagram and shop.
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: site.name,
  url: site.url,
  image: `${site.url}/og.jpg`,
  description: site.description,
  slogan: site.tagline,
  areaServed: "Goa, India",
  address: { "@type": "PostalAddress", addressRegion: "Goa", addressCountry: "IN" },
  paymentAccepted: "Cash, UPI",
  founder: [
    { "@type": "Person", name: "Atreya Kamat" },
    { "@type": "Person", name: "Kritik Sawant" },
  ],
  sameAs: [site.contact.instagram, site.shop],
};

export const viewport: Viewport = {
  themeColor: "#070707",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${geist.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <script
          // Marks JS as available so reveal styles can hide content safely.
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-dvh flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] btn btn-primary"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          <GlassSheen />
          {children}
        </main>
        <SiteFooter />
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
