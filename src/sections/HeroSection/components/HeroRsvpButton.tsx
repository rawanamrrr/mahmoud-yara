import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/i18n";

export const HeroRsvpButton = () => {
  const { t } = useLanguage();
  return (
    <Reveal as="button" trigger="intro" variant="fade" duration={0.5} delay={0.6} className="absolute text-white items-center bg-transparent caret-transparent gap-x-2 flex flex-col outline-[3px] gap-y-2 text-center z-10 p-0 bottom-8 inset-x-0 hover:text-white/80">
      <span className="text-xs box-border caret-transparent block tracking-[3.6px] ltr:pl-[3.6px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] uppercase">
        {t("hero.rsvp")}
      </span>
      <div className="animate-soft-bounce box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] translate-y-[6.07107px] md:translate-y-[7.99287px]">
        <img
          src="https://c.animaapp.com/sYECYRLIChBJxO67a5WNpw/assets/icon-2.svg"
          alt="Icon"
          className="box-border caret-transparent h-5 outline-[3px] w-5"
        />
      </div>
    </Reveal>
  );
};
