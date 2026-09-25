import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/i18n";

export const HeroTitle = () => {
  const { t } = useLanguage();
  return (
    <div className="relative text-white items-center box-border caret-transparent flex flex-col min-h-[auto] min-w-[auto] outline-[3px] text-center z-10">
      <Reveal as="p" trigger="intro" variant="up" duration={0.4} delay={0} className="text-sm box-border caret-transparent tracking-[4.9px] ltr:pl-[17px] leading-5 min-h-[auto] min-w-[auto] outline-[3px] uppercase mb-4 md:text-lg md:tracking-[6.3px] md:leading-7">
        {t("hero.weAreGettingMarried")}
      </Reveal>
      <div className="text-6xl box-border caret-transparent leading-[75px] min-h-[auto] min-w-[auto] outline-[3px] font-classic_script_mn md:text-8xl md:leading-[96px]">
        <Reveal as="span" trigger="intro" variant="fade" duration={0.6} delay={0.1} className="font-names text-6xl box-border caret-transparent block leading-[95px] pl-8 pr-10 py-4 overflow-visible outline-[3px] md:text-8xl md:leading-[96px]">
          {t("names.first")}
        </Reveal>
        <Reveal as="span" trigger="intro" variant="scale" duration={0.35} delay={0.2} className="font-names text-3xl box-border caret-transparent block leading-9 outline-[3px] my-1 md:text-5xl md:leading-[48px]">
          {t("names.and")}
        </Reveal>
        <Reveal as="span" trigger="intro" variant="fade" duration={0.6} delay={0.3} className="font-names text-6xl box-border caret-transparent block leading-[95px] pl-8 pr-14 py-4 overflow-visible outline-[3px] md:text-8xl md:leading-[96px]">
          {t("names.second")}
        </Reveal>
      </div>
      <Reveal as="p" trigger="intro" variant="up" duration={0.4} delay={0.45} className="text-sm box-border caret-transparent tracking-[3.5px] ltr:pl-[15px] leading-5 min-h-[auto] min-w-[auto] outline-[3px] uppercase mt-5 md:text-lg md:tracking-[4.5px] md:leading-7">
        {t("hero.date")}
      </Reveal>
    </div>
  );
};
