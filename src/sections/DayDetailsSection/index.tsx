import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/i18n";
import champagne from "@/assets/champagne.png";
import { LocationCard } from "@/sections/DayDetailsSection/components/LocationCard";
import { LocationActions } from "@/sections/DayDetailsSection/components/LocationActions";

export const DayDetailsSection = () => {
  const { t } = useLanguage();
  return (
    <section className="bg-[#f1ebdf] px-4 py-12 md:py-20">
      <Reveal>
        <div className="mx-auto mb-10 max-w-md text-center">
          <img src={champagne} alt="" className="mx-auto my-10 w-14 max-w-full md:w-16" />
          <h2 className="mb-3 font-classic_script_mn text-4xl leading-10 text-[#3c4736] md:text-6xl md:leading-[60px]">{t("day.title")}</h2>
          <p className="font-span text-sm uppercase leading-5 tracking-[1.4px] text-[#3c4736]/80">
            {t("day.subtitle")}
          </p>
        </div>

      </Reveal>      <div className="mx-auto flex w-full max-w-md flex-col">
        <Reveal>
          <LocationCard />
        </Reveal>
        <Reveal delay={0.15}>
          <LocationActions />
        </Reveal>
      </div>
    </section>
  );
};
