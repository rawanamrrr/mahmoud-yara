import monogram from "@/assets/monogram-my.png";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/i18n";
import { CountdownGrid } from "@/sections/CountdownSection/components/CountdownGrid";

export const CountdownSection = () => {
  const { t } = useLanguage();
  return (
    <section className="bg-[#727c5a] box-border caret-transparent outline-[3px] overflow-hidden px-6 py-20 md:px-12 md:py-32">
      <div className="box-border caret-transparent max-w-4xl outline-[3px] text-center mx-auto px-4">
        <Reveal variant="scale">
          <img
            src={monogram}
            alt="M & Y"
            className="animate-soft-glow box-border caret-transparent max-w-full outline-[3px] w-32 mb-4 mx-auto md:w-40"
          />
        </Reveal>
        <Reveal>
          <h2 className="text-white text-4xl box-border caret-transparent leading-10 outline-[3px] mb-3 font-classic_script_mn md:text-6xl md:leading-[60px]">
            {t("count.title")}
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-white/60 text-sm box-border caret-transparent tracking-[1.4px] leading-5 outline-[3px] uppercase mb-8 md:mb-12">
            {t("count.subtitle")}
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <CountdownGrid />
        </Reveal>
        <p className="text-white/60 text-sm box-border caret-transparent tracking-[1.4px] leading-5 outline-[3px] uppercase mt-8">
          {t("hero.date")}
        </p>
      </div>
    </section>
  );
};
