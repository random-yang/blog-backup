import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "RandomYang",
  description: "Code + Design => Magic",
  keywords: ["blog", "frontend", "design", "development"],
  authors: [{ name: "RandomYang" }],
  openGraph: {
    title: "RandomYang",
    description: "Code + Design => Magic",
    url: "http://www.randomyang.top",
    siteName: "RandomYang",
    locale: "zh_CN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow container py-12">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}