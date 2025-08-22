import Link from "next/link";
import { serverTranslation } from "@i18n";
import Image from "next/image";

import SiteLogo from "@public/images/teams.png";

import LanguageToggle from "./LanguageToggle";
import { Login } from "./Login";

type HeaderParams = {
  locale: string;
};
export const Header = async ({ locale }: HeaderParams) => {
  const {
    t,
    i18n: { language },
  } = await serverTranslation(locale, ["common"]);
  const context = "default";
  return (
    <>
      <header className="mb-5 border-b-1 border-gray-500 bg-white px-0  relative">
        <div className="grid w-full grid-flow-col p-2">
          <div className="flex">
            <Link
              href={`/${language}/`}
              prefetch={false}
              id="logo"
              className="mr-5 flex border-r-1 pr-2 text-3xl font-semibold !text-black no-underline focus:bg-white"
            >
              <div className="flex items-center h-[60px] w-[60px]">
                <Image src={SiteLogo} alt={t("app name")} width={60} />
              </div>
            </Link>

            {context === "default" && (
              <div className="mt-3 box-border block h-[40px] px-2 py-1 text-xl font-semibold">
                {t("app name", { ns: "common" })}
              </div>
            )}
          </div>
          <nav
            className="justify-self-end flex flex-row gap-4"
            aria-label={t("mainNavAriaLabel", { ns: "common" })}
          >
            <ul className="mt-2 flex list-none px-0 text-base">
              <Login />
            </ul>
            <ul className="mt-2 flex list-none px-0 text-base">
              {
                <li className="mr-2 py-2 tablet:mr-4">
                  <LanguageToggle />
                </li>
              }
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
