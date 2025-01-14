import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Recipes for Grls",
  description: "Recipes for girls and girlie people",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
