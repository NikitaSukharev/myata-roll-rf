import type { Metadata } from "next";
import { Inter, Source_Code_Pro } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "МЯТА ROLL — Доставка роллов и суши в Горячем Ключе",
  description:
    "Закажите свежие роллы и суши с доставкой в Горячем Ключе от МЯТА ROLL! Бесплатная доставка от 1500₽, акции и большое разнообразие блюд.",
  keywords:
    "роллы гк, мята ролл гк, суши горячий ключ, доставка роллов гк, мята роллы, мята суши, боллы гк, роллы горячий ключ, мята ролл, мята гк",
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico?v=2",
  },
  openGraph: {
    title: "МЯТА ROLL — Доставка роллов и суши в Горячем Ключе",
    description:
      "Закажите свежие роллы и суши с доставкой в Горячем Ключе от МЯТА ROLL! Бесплатная доставка от 1500₽.",
    url: "https://www.myata-roll.ru",
    siteName: "МЯТА ROLL",
    images: [
      {
        url: "/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "МЯТА ROLL — роллы и суши в Горячем Ключе",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body
        className={`${inter.variable} ${sourceCodePro.variable} antialiased bg-[#fdfaf5] text-[#1a1a1a]`}
      >
        {children}
      </body>
    </html>
  );
}
