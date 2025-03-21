import { ProductFeatures } from "./components/server/ProductFeatures";
import { InfoText } from "./components/server/InfoText";
import { serverTranslation } from "@i18n";
import { ProductJumbo } from "./components/server/ProductJumbo";
export default async function Home(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const { t } = await serverTranslation(locale, "home");
  return (
    <main className="directory-container">
      <ProductJumbo lng={locale} />
      <div className="flex flex-col items-center justify-center">
        <ProductFeatures lng={locale} />
        <div>
          <InfoText lng={locale} />
          <div className="d-flex justify-content-center w-100 mb-4">
            <ul className="w-75 ml-3 mr-3">
              <li>
                {t(
                  "Automatic profile creation when you register for GCaccount, which includes your name and email address."
                )}
              </li>
              <li>
                {t(
                  "Approval workflow that allows supervisors to approve requests for team members and employees."
                )}
              </li>
              <li>
                {t(
                  "In-app notifications for items that require your attention (approvals, change requests, etc.)"
                )}
              </li>
              <li>{t("Ability to choose team avatars and colours")}</li>
              <li>{t("Enhanced search functionality")}</li>
              <li>{t("One-time profile transfer from GCcollab to Directory")}</li>
              <li>{t("Integrating non-government accounts and users into Directory")}</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
