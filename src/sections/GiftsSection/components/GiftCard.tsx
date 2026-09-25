import { useLanguage } from "@/i18n";
import { GiftOption } from "@/sections/GiftsSection/components/GiftOption";

export const GiftCard = () => {
  const { t } = useLanguage();
  return (
    <div className="relative box-border caret-transparent max-w-lg outline-[3px] mx-auto pb-16">
      <div className="backdrop-blur-sm bg-white/80 shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.05)_0px_1px_2px_0px] box-border caret-transparent outline-[3px] border border-stone-500/30 pt-10 pb-28 px-8 rounded-lg border-solid md:px-16">
        <p className="text-lg box-border caret-transparent leading-[29.25px] outline-[3px] mb-8">
          {t("gift.desc")}
        </p>
        <GiftOption
          containerVariant="mb-3"
          label={
            <div className="items-center box-border caret-transparent gap-x-2 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-2">
              <span className="font-black box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px]">
                {t("gift.envelope")}
              </span>
              <span className="text-xs bg-stone-500/20 box-border caret-transparent block leading-4 min-h-[auto] min-w-[auto] outline-[3px] px-2 py-0.5 rounded-full">
                {t("gift.preferred")}
              </span>
            </div>
          }
        />
        <GiftOption
          label={
            <span className="font-black box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px]">
              {t("gift.bank")}
            </span>
          }
          containerVariant=""
        />
      </div>
      <img
        src="https://c.animaapp.com/sYECYRLIChBJxO67a5WNpw/assets/flower-bouquet-Cd59z_hq.png"
        alt=""
        className="absolute box-border caret-transparent max-w-full outline-[3px] pointer-events-none translate-x-[-50.0%] w-72 z-10 left-2/4 bottom-0"
      />
    </div>
  );
};
