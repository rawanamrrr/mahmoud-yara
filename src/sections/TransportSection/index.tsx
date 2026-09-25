import { useLanguage } from "@/i18n";
export const TransportSection = () => {
  const { t } = useLanguage();
  return (
    <section className="bg-stone-200 box-border caret-transparent outline-[3px] px-6 py-10 md:px-12 md:py-16">
      <div className="box-border caret-transparent max-w-2xl outline-[3px] mx-auto">
        <div className="box-border caret-transparent outline-[3px] text-center">
          <h2 className="text-5xl box-border caret-transparent leading-[48px] outline-[3px] mb-3 font-classic_script_mn md:text-6xl md:leading-[60px]">
            {t("tr.title")}
          </h2>
          <p className="text-sm box-border caret-transparent tracking-[1.4px] leading-5 outline-[3px] uppercase mb-6">
            {t("tr.subtitle")}
          </p>
          <div className="box-border caret-transparent leading-[26px] max-w-lg outline-[3px] mb-8 mx-auto">
            <p className="box-border caret-transparent outline-[3px]">
              {t("tr.before")}{" "}
              <span className="font-black box-border caret-transparent outline-[3px]">
                {t("tr.bus")}
              </span>
              {t("tr.after")}
            </p>
          </div>
          <img
            src="https://c.animaapp.com/sYECYRLIChBJxO67a5WNpw/assets/bus-illustration-eVtX45sg.png"
            alt="Ilustración de autobús"
            className="box-border caret-transparent max-w-full outline-[3px] w-56 mb-6 mx-auto"
          />
        </div>
      </div>
    </section>
  );
};
