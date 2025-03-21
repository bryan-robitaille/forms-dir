import { Footer } from "globals/server/Footer";
import { Header } from "globals/server/Header";

export default async function AppLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <div>
      <Header locale={locale} />
      <main className="w-full ">{children}</main>
      <Footer />
    </div>
  );
}
