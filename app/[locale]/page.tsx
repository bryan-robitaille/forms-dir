import { ProductFeatures } from "./components/server/ProductFeatures";
import { InfoText } from "./components/server/InfoText";
import { serverTranslation } from "@i18n";
import { languages } from "@i18n/settings";
import { CallToAction } from "./components/server/CallToAction";
export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }));
}

export default async function Home(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;

  return (
    <div>
      <CallToAction lng={locale} />
      <ProductFeatures lng={locale} />
    </div>
  );
}
