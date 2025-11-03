"use client";
import { usePathname } from "next/navigation";
import FloatingDownloadButton from "./FloatingDownloadButton";

export default function AppLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <>
      {children}
      {!isLoginPage && <FloatingDownloadButton />}
    </>
  );
}
