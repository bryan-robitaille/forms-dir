import React from "react";
import { serverTranslation } from "@i18n";
import Image from "next/image";
import GovLogo from "@public/images/wmms-alt.png";

interface FooterProps {
  className?: string;
}

const BulletPoint = () => {
  return <span className="px-3">&#x2022;</span>;
};

const DefaultLinks = async () => {
  const { t } = await serverTranslation("common");
  return (
    <a href={t("footer.terms-and-conditions.link")}>{t("footer.terms-and-conditions.desc")}</a>
  );
};

export const Footer = async ({}: FooterProps) => {
  const { t } = await serverTranslation("common");
  return (
    <footer
      className="mt-16 flex-none border-0 bg-gray-100 px-[1rem] tablet:px-[4rem] py-0 lg:mt-10 laptop:px-32"
      data-testid="footer"
    >
      <div className="flex flex-row items-center justify-between pb-5 pt-10 lg:flex-col lg:items-start lg:gap-4">
        <div>
          <nav aria-label={t("footer.ariaLabel")}>
            <DefaultLinks />
          </nav>
        </div>

        <div className="min-w-[168px]">
          <picture>
            <Image className="h-10 lg:h-8" alt={t("fip.text")} src={GovLogo} />
          </picture>
        </div>
      </div>
    </footer>
  );
};
