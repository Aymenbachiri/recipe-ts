"use client";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { useLocale } from "next-intl";

export default function MyNextIntlClientProvider({
  children,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const locale = useLocale();
  return (
    <NextIntlClientProvider locale={locale}>{children}</NextIntlClientProvider>
  );
}
