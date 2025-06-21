import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Farcaster from "@/config/farcaster";
import { Wagmi } from "@/config/wagmi";
import Header from "@/components/header";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ETHCP Mini",
  description: "ethcp.top - ETH Community Profile",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="fc:frame" content="<stringified FrameEmbed JSON>" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <Wagmi >
          <Farcaster>

            <Header />
            {children}
            <Footer />
          </Farcaster>
        </Wagmi>

      </body>
    </html>
  );
}
