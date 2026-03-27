import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Advertise | Get Your OB-GYN Practice in Front of Patients",
  description:
    "Featured and premium listings on ObGynDirectories.com. Reach families actively searching for OB-GYN practices and women's health care across the United States.",
  alternates: {
    canonical: "/advertise",
    languages: {
      "en-us": "https://obgyndirectories.com/advertise",
    },
  },
  openGraph: {
    title: "Advertise | Get Your OB-GYN Practice in Front of Patients",
    description:
      "A featured listing puts your practice at the top of your city directory section and in front of visitors who are choosing an OB-GYN or women's health provider.",
    url: "/advertise",
    siteName: "ObGynDirectories.com",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "ObGynDirectories.com advertise page preview",
      },
    ],
  },
};

const siteUrl = "https://obgyndirectories.com";
const STRIPE_LINK_49 = "https://buy.stripe.com/4gMbJ1gmK6zB0tEf1TfAc0o";
const STRIPE_LINK_99 = "https://buy.stripe.com/4gM9ATb2qgab1xIf1TfAc0p";

export default function AdvertisePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "ObGynDirectories.com",
        item: `${siteUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Advertise",
        item: `${siteUrl}/advertise`,
      },
    ],
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
          For OB-GYN Practice Owners
        </p>
        <h1 className="text-3xl font-semibold text-navy sm:text-4xl">
          Get Your Practice in Front of Patients Who Are Ready to Choose
        </h1>
        <p className="max-w-3xl text-sm text-slate-600">
          ObGynDirectories.com is visited by patients and families actively searching for
          OB-GYN and women's health care across the United States. A featured listing puts
          your practice at the top of your city directory section and in front of
          visitors at the moment they are comparing providers.
        </p>
      </header>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="rounded-xl border border-surface-muted bg-surface p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-navy">
            Featured Listing — $49/month
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
            <li>Priority placement at the top of your city directory section</li>
            <li>Featured badge on your listing</li>
            <li>Included in the Top Picks section on your state page</li>
            <li>Cancel anytime</li>
          </ul>
          <a
            href={STRIPE_LINK_49}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
          >
            Pay $49/month with Stripe
          </a>
        </article>
        <article className="rounded-xl border border-surface-muted bg-surface p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-navy">
            Premium Listing — $99/month
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
            <li>Everything in Featured</li>
            <li>Included in the Featured OB-GYN Practices section on the homepage</li>
            <li>Your clinic logo or photo displayed</li>
            <li>Custom tagline (up to 60 words)</li>
            <li>Cancel anytime</li>
          </ul>
          <a
            href={STRIPE_LINK_99}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
          >
            Pay $99/month with Stripe
          </a>
        </article>
      </section>

      <section className="mt-10 rounded-xl border border-gold/30 bg-gold/5 px-6 py-5">
        <p className="text-sm text-slate-700">
          To get started or ask questions, contact us at{" "}
          <a
            href="mailto:hello@directoriesnetwork.com"
            className="font-medium text-teal underline underline-offset-2 hover:text-teal-soft"
          >
            hello@directoriesnetwork.com
          </a>{" "}
          — we&apos;ll have your listing live within 24 hours.
        </p>
      </section>

      <div className="mt-8 text-sm text-slate-600">
        <Link href="/" className="text-teal hover:text-teal-soft">
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
