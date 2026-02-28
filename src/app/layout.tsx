import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Graveyard Chronicles | Solana Graveyard Hackathon 2026",
  description:
    "Crypto elites and the trenches left these for dead. But the best time to build is when everyone else has left.",
  openGraph: {
    title: "Graveyard Chronicles",
    description:
      "An interactive comic about resurrecting dead crypto categories on Solana.",
    images: ["/comics/cover-front.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Graveyard Chronicles",
    description:
      "Crypto elites and the trenches left these for dead. But the best time to build is when everyone else has left.",
    images: ["/comics/cover-front.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-black`}>
        {children}
      </body>
    </html>
  );
}
