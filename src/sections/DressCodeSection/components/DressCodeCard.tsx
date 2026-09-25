import { useLanguage } from "@/i18n";
export const DressCodeCard = () => {
  const { t } = useLanguage();
  return (
    <div className="box-border caret-transparent outline-[3px] text-center">
      <img
        src="https://c.animaapp.com/sYECYRLIChBJxO67a5WNpw/assets/dress-code-illustration-sBv8miCU.png"
        alt="Ilustración de invitados elegantes"
        className="relative box-border caret-transparent max-w-full outline-[3px] w-full z-10 -mb-8"
      />
      <div className="relative bg-white shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(58,69,52,0.08)_0px_2px_15px_-3px,rgba(58,69,52,0.04)_0px_4px_6px_-2px] box-border caret-transparent outline-[3px] z-0 pt-12 pb-8 px-8 rounded-[32px]">
        <p className="box-border caret-transparent text-lg leading-[28px] outline-[3px]">
          {t("dress.desc")}
        </p>
      </div>
    </div>
  );
};
