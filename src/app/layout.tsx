"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Pdf App",
//   description: "Aplicativo para gerenciamento e assinatura de PDFs",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <SessionProvider>
        <body className={inter.className}>{children}</body>
      </SessionProvider>
    </html>
  );
}
