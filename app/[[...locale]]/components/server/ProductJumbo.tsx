import bannerLeft from "./images/directory_banner_left.png";
import bannerright from "./images/directory_banner_right.png";
import { serverTranslation } from "@i18n";
import Image from "next/image";
export const ProductJumbo = async ({ lng }: { lng: string }) => {
  const { t } = await serverTranslation(lng, "home");
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div className="flex flex-row">
        <Image src={bannerLeft} alt="banner-left" />
        <div>
          <h1>{t("GCForms Directory")}</h1>
        </div>
        <Image src={bannerright} alt="banner-right" />
      </div>
    </div>
  );
};
