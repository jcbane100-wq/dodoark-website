import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "DodoArk - ARK Survival Ascended Server Cluster",
  description:
    "Premium PvP & PvE ARK Survival Ascended servers with boosted rates, active community, and fair play. Cross-platform support.",
  keywords: ["ARK", "ARK Survival Ascended", "DodoArk", "server", "PvP", "PvE", "gaming"],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "DodoArk - ARK Survival Ascended Server Cluster",
    description: "Premium PvP & PvE ARK Survival Ascended servers with boosted rates, active community, and fair play.",
    images: ["/logo.png"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-dark-900">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
