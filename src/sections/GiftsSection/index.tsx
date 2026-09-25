import { useLanguage } from "@/i18n";
import { GiftCard } from "@/sections/GiftsSection/components/GiftCard";

export const GiftsSection = () => {
  const { t } = useLanguage();
  return (
    <section className="bg-stone-200 box-border caret-transparent outline-[3px] px-6 py-20 md:px-12 md:py-32">
      <div className="box-border caret-transparent max-w-2xl outline-[3px] mx-auto">
        <div className="box-border caret-transparent outline-[3px] text-center">
          <h2 className="text-5xl box-border caret-transparent leading-[48px] outline-[3px] mb-3 font-classic_script_mn md:text-6xl md:leading-[60px]">
            {t("gift.title")}
          </h2>
          <p className="text-sm box-border caret-transparent tracking-[1.4px] leading-5 outline-[3px] uppercase mb-8">
            {t("gift.subtitle")}
          </p>
          <GiftCard />
        </div>
      </div>
    </section>
  );
};
