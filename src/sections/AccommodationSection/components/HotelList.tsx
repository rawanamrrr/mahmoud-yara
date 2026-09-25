import { useLanguage } from "@/i18n";
import { HotelCard } from "@/sections/AccommodationSection/components/HotelCard";

export const HotelList = () => {
  const { t } = useLanguage();
  return (
    <div className="box-border caret-transparent outline-[3px]">
      <HotelCard
        containerClassName="backdrop-blur-sm bg-white/80 shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.05)_0px_1px_2px_0px] box-border caret-transparent outline-[3px] border border-stone-500/30 p-6 rounded-lg border-solid"
        headerWrapperClassName="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]"
        hasInnerHeaderWrapper="true"
        optionLabel={t("acc.optA")}
        hotelName="Hotel La Pérgola"
        locationText={t("acc.locA")}
        descriptionPrefix={t("acc.aPre")}
        descriptionBoldText={t("acc.aBold")}
        descriptionSuffix={t("acc.aSuf")}
        hotelUrl="https://www.hotelpergolamallorca.com/"
      />
      <HotelCard
        containerClassName="relative backdrop-blur-sm bg-white/80 shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.05)_0px_1px_2px_0px] box-border caret-transparent outline-[3px] border border-stone-500/30 mt-6 p-6 rounded-lg border-solid"
        headerWrapperClassName="box-border caret-transparent outline-[3px] mb-4"
        hasInnerHeaderWrapper="false"
        optionLabel={t("acc.optB")}
        hotelName="Hotel Es Quatre Cantons"
        locationText={t("acc.locB")}
        descriptionPrefix={t("acc.bPre")}
        descriptionBoldText={t("acc.bBold")}
        descriptionSuffix="."
        hotelUrl="https://www.esquatrecantons.es/"
      />
    </div>
  );
};
