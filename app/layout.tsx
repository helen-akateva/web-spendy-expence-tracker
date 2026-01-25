import type { Metadata } from "next";
import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { ToastProvider } from "@/components/ToastProvider/ToastProvider";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Spendy",
  description: "Personal finance tracker",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable}`}>
        <TanStackProvider>
          {children}
          <ToastProvider />
        </TanStackProvider>
      </body>
    </html>
  );
}
