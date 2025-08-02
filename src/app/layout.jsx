import {
  Inter,
  Montserrat,
  Poppins,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";
import Header from "../components/Header/Header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "700", "900"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-Poppins",
  weight: ["400", "500", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plusjakarta",
  weight: ["400", "500", "700", "800"], // Add other weights if needed
});

export const metadata = {
  title: "Arunchal-web",
  description: "",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${montserrat.variable} ${poppins.variable} ${plusJakartaSans.variable}`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
