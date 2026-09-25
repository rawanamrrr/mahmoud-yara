import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/i18n";
import { DressCodeCard } from "@/sections/DressCodeSection/components/DressCodeCard";

export const DressCodeSection = () => {
  const { t } = useLanguage();
  return (
    <section className="bg-[#727c5a] box-border caret-transparent outline-[3px] px-6 py-20 md:px-12 md:py-32">
      <div className="box-border caret-transparent max-w-xl outline-[3px] mx-auto">
        <div className="box-border caret-transparent outline-[3px] text-center">
          <Reveal>
            <h2 className="text-white text-5xl box-border caret-transparent tracking-[-1.2px] leading-[48px] outline-[3px] mb-3 font-classic_script_mn md:text-6xl md:tracking-[-1.5px] md:leading-[60px]">
              {t("dress.title")}
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <DressCodeCard />
        </Reveal>
      </div>
    </section>
  );
};
