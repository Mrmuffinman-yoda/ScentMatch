import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/core/Navbar";
import Footer from "./components/core/Footer";



export const metadata: Metadata = {
  title: "ScentMatch",
  description: "Find your perfect scent by Harison",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="luxury" lang="en">
      <body
        className="font-geist-sans font-geist-mono antialiased"
        style={{
          backgroundImage: "url('/api/minio/scentmatch/core/tile.webp')",
          backgroundSize: "500px auto",
          backgroundAttachment: "fixed",
        }}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
