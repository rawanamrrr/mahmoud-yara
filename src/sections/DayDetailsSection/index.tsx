import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/i18n";
import champagne from "@/assets/champagne.png";
import couplePhoto from "@/assets/rsvp-couple-photo.jpg";
import { LocationCard } from "@/sections/DayDetailsSection/components/LocationCard";
import { LocationActions } from "@/sections/DayDetailsSection/components/LocationActions";

// The section's background is the couple photo's own khaki paper color, so the
// photo and everything under it read as one continuous surface.
export const DayDetailsSection = () => {
  const { t } = useLanguage();
  return (
    <section className="bg-[#c8c1ab]">
      {/* Blend in: eases the countdown's olive into the photo's khaki. It sits above
          the photo (never on it) and overlaps the section above by 1px so no
          hairline shows. */}
      <div
        aria-hidden="true"
        className="-mt-px h-20 md:h-36"
        style={{
          background:
            "linear-gradient(to bottom, #727c5a 0%, #808767 25%, #9ea084 50%, #bcb9a1 75%, #cac4ae 100%)",
        }}
      ></div>

      <Reveal>
        <img src={couplePhoto} alt="" className="block w-full" />
      </Reveal>

      <div className="px-4 pb-12 md:pb-20">
        <Reveal>
          <div className="mx-auto mb-10 max-w-md text-center">
            <img src={champagne} alt="" className="mx-auto mb-10 mt-2 w-14 max-w-full md:w-16" />
            <h2 className="mb-3 font-classic_script_mn text-4xl leading-10 text-[#3c4736] md:text-6xl md:leading-[60px]">
              {t("day.title")}
            </h2>
            <p className="font-span text-sm uppercase leading-5 tracking-[1.4px] text-[#3c4736]/80">
              {t("day.subtitle")}
            </p>
          </div>
        </Reveal>
        <div className="mx-auto flex w-full max-w-md flex-col">
          <Reveal>
            <LocationCard />
          </Reveal>
          <Reveal delay={0.15}>
            <LocationActions />
          </Reveal>
        </div>
      </div>

      {/* Blend out: eases the khaki back into the cream of the sections below. */}
      <div
        aria-hidden="true"
        className="-mb-px h-20 md:h-36"
        style={{
          background:
            "linear-gradient(to bottom, #c8c1ab 0%, #cec8b3 25%, #dcd6c5 50%, #ebe4d7 75%, #f1ebdf 100%)",
        }}
      ></div>
    </section>
  );
};
