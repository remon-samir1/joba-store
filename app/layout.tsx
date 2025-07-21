import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "@/components/query-provider";
import { DevBanner } from "@/components/dev-banner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://goba-store.netlify.app"),
  title: "Goba Store - Natural Health Products",
  description:
    "Discover premium natural health products and supplements at Goba Store. Quality products for your wellness journey.",
  keywords: "natural health, supplements, wellness, organic products",
  authors: [{ name: "Goba Store" }],
  openGraph: {
    title: "Goba Store - Natural Health Products",
    description:
      "Discover premium natural health products and supplements at Goba Store. Quality products for your wellness journey.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Goba Store - Natural Health Products",
    description:
      "Discover premium natural health products and supplements at Goba Store. Quality products for your wellness journey.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <TooltipProvider>
            <DevBanner />
            <Toaster />
            {children}
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
