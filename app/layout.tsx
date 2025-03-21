import type { Metadata } from "next";
import { Noto_Sans, Lato } from "next/font/google";
import { Viewport } from "next";
import "../styles/app.css";
import "@gctools-components/aurora-css/css/aurora.min.css";
const notoSans = Noto_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const lato = Lato({
  weight: ["400", "700"],
  variable: "--font-lato",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "GCForms Directory",
  description: "GCForms team management module",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${notoSans.variable} ${lato.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" sizes="32x32" />

        {/* Will only run if Browser does not have JS enabled */}
        <noscript>
          <style type="text/css">{`#__next {display:none;}`}</style>
          <meta httpEquiv="Refresh" content="0; url='/javascript-disabled.html'" />
        </noscript>
      </head>
      <body className={"has-[.bkd-soft]:bg-gray-soft"}>{children}</body>
    </html>
  );
}
