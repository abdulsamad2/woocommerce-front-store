import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import getSiteData from "@/actions/getSiteData";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Providers from "@/provider/next-auth-provider";
import { ToastProvider } from "@/provider/toast-provider";

async function getData() {
  const data = await getSiteData();

  return data;
}
export const metadata: Metadata = {
  title: "Woocomerce Front",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await getData();
  const { header, footer } = data;
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <Header header={header} />
          {children}
          <ToastProvider />
          <Footer footer={footer} />
        </body>
      </Providers>
    </html>
  );
}
