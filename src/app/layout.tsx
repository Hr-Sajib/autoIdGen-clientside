
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "sonner";

// Geist Sans
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// Geist Mono
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// Inter
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight:'variable', // optional weights
});

export const metadata: Metadata = {
  title: "AutoIDGen",
  description: "Generate Your ID Cards Automatically",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${inter.className} antialiased`}
      >
        <StoreProvider >
          <Toaster position="top-right" duration={1000}/>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
