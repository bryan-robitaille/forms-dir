import { languages } from "@i18n/settings";
import { OnboardingProcess } from "./components/OnboardingProcess";

export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }));
}

export default async function Profile() {
  return <OnboardingProcess />;
}
