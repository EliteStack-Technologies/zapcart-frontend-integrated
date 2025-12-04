import { Lato } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/next"
// Import Lato font
const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["300", "400", "700", "900"], // Add or remove weights as needed
});

export const metadata = {
  title: "zapcart Supermarket | Latest Offers & Discounts",
  description:
    "Discover the latest offers, deals, and discounts at zapcart Supermarket. Shop smarter with daily savings on groceries, essentials, and more.",
  keywords: [
    "zapcart Supermarket",
    "zapcart offers",
    "supermarket deals",
    "daily discounts",
    "grocery offers",
    "best supermarket prices",
    "Kadooli promotions",
  ],
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${lato.variable} font-sans antialiased`}
      >
        <Analytics/>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
