import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "QUIET BATTLES™ | Wear Your Battles",
  description:
    "QUIET BATTLES™ is a storytelling fashion brand. Explore The Archive and wear your battles.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}