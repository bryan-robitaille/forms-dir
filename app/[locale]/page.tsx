import { ProductFeatures } from "./components/server/ProductFeatures";
import { languages } from "@i18n/settings";
import { CallToAction } from "./components/server/CallToAction";
import { auth } from "@lib/auth";
import { prisma } from "@lib/prisma";
export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }));
}

export default async function Home(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const session = await auth();
  const profile = session?.user
    ? await prisma.profile.findUnique({
        where: {
          id: session.user.id,
        },
      })
    : null;

  return (
    <div>
      {session && <CallToAction lng={locale} profileExists={Boolean(profile)} />}
      <ProductFeatures lng={locale} />
    </div>
  );
}
