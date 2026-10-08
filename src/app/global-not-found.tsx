import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { LogoMark } from "@/components/brand/Logo";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "404 | Loamics",
  robots: { index: false },
};

/** Unmatched URLs have no language yet, so the 404 speaks both. */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="grid min-h-dvh place-items-center px-4 text-center">
        <div aria-hidden className="bg-grid fixed inset-0 -z-10" />
        <main>
          <div className="mx-auto w-fit text-ink-3">
            <LogoMark size={72} />
          </div>
          <p className="t-eyebrow mt-10">Error 404 · schema mismatch</p>
          <h1 className="t-h1 mt-4">This data point is out of orbit.</h1>
          <p lang="fr" className="t-lead mx-auto mt-4 max-w-md">
            Cette donnée est sortie de son orbite.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn btn-primary">
              Back to home
            </Link>
            <Link href="/fr" hrefLang="fr" lang="fr" className="btn btn-ghost">
              Retour à l&apos;accueil
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
