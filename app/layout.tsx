import type { Metadata } from "next"
import { Fraunces, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google"
import "./globals.css"
import { siteConfig } from "@/lib/site"
import { webAppJsonLd, faqJsonLd } from "@/lib/seo"

/* ---- Self-hosted type system (CJK falls to native system stacks) ------- */
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-display",
})

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
})

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-mono",
})

const U = siteConfig.url // absolute canonical origin incl. basePath
const ogImage = `${U}/og.png`

export const metadata: Metadata = {
  metadataBase: new URL(U),
  title: {
    default: `${siteConfig.name} · ${siteConfig.nameEn} — 时间进度可视化`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description.zh,
  applicationName: `${siteConfig.name} ${siteConfig.nameEn}`,
  authors: [{ name: siteConfig.author, url: siteConfig.social.github }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  keywords: [
    "时间进度",
    "年度进度",
    "今年过去多少了",
    "进度条",
    "year progress",
    "year progress bar",
    "time progress",
    "lifetime progress",
    "人生进度",
    "时间管理",
    "时间可视化",
    "countdown",
    "progress visualizer",
    "年間進捗",
    "時間進捗",
  ],
  category: "utilities",
  alternates: {
    canonical: U,
    languages: {
      "zh-CN": U,
      en: U,
      ja: U,
    },
  },
  openGraph: {
    type: "website",
    url: U,
    siteName: `${siteConfig.name} · ${siteConfig.nameEn}`,
    title: `${siteConfig.name} · ${siteConfig.nameEn} — 时间进度可视化`,
    description: siteConfig.description.zh,
    locale: "zh_CN",
    alternateLocale: ["en_US", "ja_JP"],
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} ${siteConfig.nameEn} — 年度、月度、周与人生进度可视化`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} · ${siteConfig.nameEn}`,
    description: siteConfig.description.en,
    images: [ogImage],
    creator: "@xcm0215",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: `${U}/manifest.webmanifest`,
  icons: {
    icon: `${U}/icon.svg`,
    shortcut: `${U}/icon.svg`,
    apple: `${U}/icon.svg`,
  },
  formatDetection: { telephone: false },
  other: {
    "application-name": `${siteConfig.name} ${siteConfig.nameEn}`,
  },
  // Next 13.5: viewport-related fields live on metadata (moved to `viewport`
  // export only in Next 14+).
  viewport: { width: "device-width", initialScale: 1 },
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F3EFE6" },
    { media: "(prefers-color-scheme: dark)", color: "#13110D" },
  ],
}

const structuredData = [webAppJsonLd(), faqJsonLd()]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${fraunces.variable} ${hanken.variable} ${plexMono.variable}`}>
        {children}
        {/* Structured data for search engines + generative AI engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </body>
    </html>
  )
}
