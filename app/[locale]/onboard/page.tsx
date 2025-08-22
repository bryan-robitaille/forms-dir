import { languages } from "@i18n/settings";
import { OnboardingProcess } from "./components/OnboardingProcess";

export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }));
}

export default async function Profile(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;

  return <OnboardingProcess />;
}
