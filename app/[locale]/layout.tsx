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
    <div className="bkd-soft flex h-full flex-col">
      <Header locale={locale} />

      <div className="mx-4 shrink-0 grow basis-auto laptop:mx-32 desktop:mx-64  flex flex-col">
        <main id="content" className="mb-10 h-full">
          {children}
        </main>
      </div>
      <Footer className="mt-0" />
    </div>
  );
}
