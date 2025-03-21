import Image, { StaticImageData } from "next/image";
import selfService from "./images/self-service.png";
import search from "./images/search.png";
import simpleProfile from "./images/simple-profile.png";
import teams from "./images/teams.png";
import orgChart from "./images/org-chart.png";
import newUi from "./images/newLayout.png";
import { serverTranslation } from "@i18n";

const Features = async ({
  img,
  alt,
  featureHeading,
  description,
}: {
  img: StaticImageData;
  alt: string;
  featureHeading: string;
  description: string;
}) => {
  return (
    <div className="flex flex-row mb-4">
      <Image src={img} alt={alt} className="mb-3" placeholder="blur" width={200} />
      <div>
        <div className="text-lg font-semibold">{featureHeading}</div>
        <p>{description}</p>
      </div>
    </div>
  );
};

export const ProductFeatures = async ({ lng }: { lng: string }) => {
  const { t } = await serverTranslation(lng, ["home"]);

  const features = [
    {
      img: selfService,
      imgAlt: "",
      featureHeading: t("Self-serve contact information"),
      description: t(
        "Easily update your contact information so that it is always accurate. You can make changes yourself and they will show up immediately."
      ),
    },
    {
      img: search,
      imgAlt: "",
      featureHeading: t("Easy to search"),
      description: t("Looking for someone? Quickly find other members and start collaborating."),
    },
    {
      img: simpleProfile,
      imgAlt: "",
      featureHeading: t("Clean and simple profile"),
      description: t("Your profile is yours to complete. Add a profile photo to make it personal."),
    },
    {
      img: teams,
      imgAlt: "",
      featureHeading: t("Create teams"),
      description: t("Supervisors can create teams and self-manage members."),
    },
    {
      img: orgChart,
      imgAlt: "",
      featureHeading: t("Organizational chart"),
      description: t("Explore an entire team and find the exact person you need to talk to."),
    },
    {
      img: newUi,
      imgAlt: "",
      featureHeading: t("New interface design"),
      description: t(
        "A bright-blue colour scheme, rounded elements and minimalist look make the application just a little more fun to use."
      ),
    },
  ];
  return (
    <div className="mt-5 mb-2 bg-blue-50 mx-10 border rounded-2xl border-gray-75 ">
      <h2 className="text-center m-5">{t("Key features")}</h2>
      <div className="flex flex-col">
        {features.map((feature, index) => (
          <Features
            key={index}
            img={feature.img}
            alt={feature.imgAlt}
            featureHeading={feature.featureHeading}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};
