import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/i18n";
import { ScheduleTimeline } from "@/sections/ScheduleSection/components/ScheduleTimeline";

export const ScheduleSection = () => {
  const { t } = useLanguage();
  return (
    <section className="box-border overflow-hidden bg-[#f1ebdf] pt-16 md:pt-24">
      <Reveal>
        <div className="mx-auto mb-10 max-w-screen-lg px-6 text-center">
          <h2 className="mb-3 font-classic_script_mn text-5xl leading-[48px] text-[#3c4736] md:text-6xl md:leading-[60px]">
            {t("sch.title")}
          </h2>
          <p className="text-sm uppercase leading-5 tracking-[1.4px] text-[#3c4736]/70">
            {t("sch.subtitle")}
          </p>
        </div>

      </Reveal>      <ScheduleTimeline />
    </section>
  );
};
