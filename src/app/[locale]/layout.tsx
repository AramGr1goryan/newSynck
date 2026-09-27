import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Inter, Noto_Sans_Armenian } from 'next/font/google';
import '../globals.css';
import { ReactNode } from 'react';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

const notoArmenian = Noto_Sans_Armenian({
  subsets: ['armenian'],
  variable: '--font-noto-armenian',
  display: 'swap',
});

import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  // Initialize translations for the metadata namespace
  // Defaulting to the brand name and simple description if specific keys aren't set
  return {
    title: {
      template: '%s | Project SyncK',
      default: 'Project SyncK',
    },
    description: 'Everything in sync. Everything connects. Everything communicates.',
    metadataBase: new URL('https://project-synck.com'),
    openGraph: {
      title: 'Project SyncK',
      description: 'Everything in sync. Everything connects.',
      url: `https://project-synck.com/${locale}`,
      siteName: 'Project SyncK',
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Project SyncK',
      description: 'Everything in sync.',
    },
    alternates: {
      canonical: `https://project-synck.com/${locale}`,
      languages: {
        'en': '/en',
        'ru': '/ru',
        'hy': '/hy',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "ru" | "hy")) {
    notFound();
  }
 
  const messages = await getMessages();
 
  return (
    <html lang={locale} className={`${inter.variable} ${notoArmenian.variable}`}>
      <body className="antialiased font-sans">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
