import "./globals.css";
import Header from "@/components/Header";
import Providers from "@/utils/provider";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "2016 政治獻金資訊平台",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Header />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
