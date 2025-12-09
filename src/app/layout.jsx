import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import AppLayout from "@/components/AppLayout";


const montserrat = localFont({
  src: [
    {
      path: "../fonts/Montserrat-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Montserrat-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Montserrat-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-mont",
});



export const metadata = {
  title: "Department of Panchayati Raj",
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
