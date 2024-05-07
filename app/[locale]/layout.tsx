import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MaterialTailwindProvider from "@/components/MaterialTailwindProvider";
import { ThProvider } from "@/components/ThemeProvider";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { notFound } from "next/navigation";
import { useLocale } from "next-intl";

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const dir = locale === "ar" ? "rtl" : "ltr";
  const messages = useMessages();
  const nextLocale = useLocale();
  if (nextLocale !== locale) {
    notFound();
  }
  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider>
            <ThProvider>
              <MaterialTailwindProvider>
                <>
                  <Header />
                  {children}
                  <Footer />
                </>
              </MaterialTailwindProvider>
            </ThProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
