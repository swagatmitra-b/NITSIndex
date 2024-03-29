import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Provider from "@/trpc_client/Provider";
import SessionProvider from "@/lib/SessionProvider";
import ThemeContext from "@/lib/ThemeContext";
import { getServerSession } from "next-auth";

const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "NITSIndex",
  description: "A popularity index for NIT Silchar",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        <ThemeContext>
          <SessionProvider session={session}>
            <Provider>{children}</Provider>
          </SessionProvider>
        </ThemeContext>
      </body>
    </html>
  );
}
