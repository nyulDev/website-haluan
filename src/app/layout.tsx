import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WhatsAppChatWidgetClient from "@/components/WhatsAppChatWidgetClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Haluan Group - Ships Supplier Indonesia",
  description:
    "No#1 Solution for Ships Supplier, Marine Spare Parts Specialist serving all major ports in Indonesia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className={inter.className}>
        {children}
        {/* WhatsApp widget dimatikan */}
        {/* <WhatsAppChatWidgetClient /> */}
      </body>
    </html>
  );
}
