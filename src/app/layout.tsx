import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Champion Motor Visual Builder",
  description: "Build and preview Yamaha coverset, rim, and accessory setups.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
