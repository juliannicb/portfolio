import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Toaster } from "react-hot-toast";
import MatrixRain from "@/components/background/matrix-rain";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["400","500","700","800"] });
const jbMono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["400","600","700"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Julian Nicácio – Blockchain & Smart Contract Engineer",
    template: "%s | Julian Nicácio",
  },
  description: "Secure, scalable blockchain systems with AI automations and usable frontend.",
  applicationName: "Julian – Portfolio",
  openGraph: {
    title: "Julian Nicácio – Blockchain & Smart Contract Engineer",
    description: "Secure, scalable blockchain systems with AI automations and usable frontend.",
    url: "/",
    siteName: "Julian Nicácio",
    images: [{ url: "/api/og", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Julian Nicácio – Blockchain & Smart Contract Engineer",
    description: "Secure, scalable blockchain systems with AI automations and usable frontend.",
    images: ["/api/og"],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0B0C10",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jbMono.variable} antialiased min-h-dvh bg-background text-foreground`}>
        <a href="#main" className="skip-to-content ring-focus rounded px-3 py-2 bg-foreground text-background">Skip to content</a>
        <Providers>
          {/* Background visual layer */}
          <MatrixRain />
          <Header />
          <main id="main" className="mx-auto max-w-6xl px-6 sm:px-8 md:px-10 py-10">
            {children}
          </main>
          <Footer />
          <Toaster position="bottom-right" />
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
