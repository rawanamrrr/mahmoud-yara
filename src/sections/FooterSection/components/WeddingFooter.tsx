import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/i18n";
import footerVenue from "@/assets/footer-venue.webp";
export const WeddingFooter = () => {
  const { t } = useLanguage();
  return (
    <footer
      className="relative bg-cover box-border caret-transparent flex flex-col justify-start min-h-[500px] outline-[3px] text-center"
      style={{ backgroundImage: `url(${footerVenue})`, backgroundPosition: "center 20%" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 md:h-32"
        style={{ background: "linear-gradient(to bottom, #f1ebdf, transparent)" }}
      ></div>
      <Reveal>
        <div className="items-center box-border caret-transparent flex flex-col min-h-[auto] min-w-[auto] opacity-100 outline-[3px] transform-none pt-2 md:opacity-0 md:translate-y-5">
          <img
            src="https://c.animaapp.com/sYECYRLIChBJxO67a5WNpw/assets/rings-illustration-tO3OeALU.png"
            alt="Rings"
            className="box-border caret-transparent max-w-full min-h-[auto] min-w-[auto] outline-[3px] w-24 mb-4 mx-auto"
          />
          <p className="text-3xl box-border caret-transparent leading-9 min-h-[auto] min-w-[auto] outline-[3px] mt-2 mb-1 font-names">
            {t("names.first")} {t("names.and")} {t("names.second")}
          </p>
          <p className="text-sm box-border caret-transparent tracking-[0.35px] leading-5 min-h-[auto] min-w-[auto] outline-[3px]">
            {t("hero.date")}
          </p>
        </div>

      </Reveal>    </footer>
  );
};
