import { Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import AppLayout from "@/components/AppLayout";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont",
  weight: ["400", "700", "900"],
});

export const metadata = {
  title: "Arunchal-web",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body className={montserrat.variable}>
        <Providers>
          <AppLayout>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  );
}
