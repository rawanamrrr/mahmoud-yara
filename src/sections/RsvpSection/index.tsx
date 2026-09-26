import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/i18n";
import { RsvpForm } from "@/sections/RsvpSection/components/RsvpForm";
import couplePhoto from "@/assets/rsvp-couple-photo.png";

export const RsvpSection = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-[#c8c0aa]">
      {/* Blend: a tall, eased gradient from the schedule section's cream down to
          the photo's own khaki paper color (#ccc4ad), so the page flows into the
          photo instead of hitting a hard edge. Sits above the image, never on it. */}
      <div
        aria-hidden="true"
        className="-mt-px h-20 md:h-36"
        style={{
          background:
            "linear-gradient(to bottom, #f1ebdf 0%, #ebe5d7 25%, #dfd8c6 50%, #d2cab5 75%, #ccc4ad 100%)",
        }}
      ></div>
      {/* Full-bleed: breaks out of the section's own side padding to reach
          the true edges of the screen, regardless of container width. */}
      <div className="mb-8 w-screen" style={{ marginLeft: "calc(50% - 50vw)" }}>
        <Reveal>
          <img src={couplePhoto} alt="" className="block w-full max-w-none" />
        </Reveal>
      </div>
      <div className="mx-auto max-w-md px-4">
        <Reveal>
          <div className="mb-8 text-center">
            <h2 className="mb-3 font-classic_script_mn text-4xl leading-10 text-[#3c4736] md:text-6xl md:leading-[60px]">
              {t("hero.rsvp")}
            </h2>
            <p className="font-span text-sm uppercase leading-5 tracking-[1.4px] text-[#3c4736]/80">
              {t("rsvp.subtitle")}
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <RsvpForm />
        </Reveal>
      </div>
      {/* Same blend as above the photo, mirrored: eases this section's khaki
          (#c8c0aa) back into the cream of the dress code section below. */}
      <div
        aria-hidden="true"
        className="-mb-px mt-16 h-20 md:mt-24 md:h-36"
        style={{
          background:
            "linear-gradient(to bottom, #c8c0aa 0%, #cec7b2 25%, #dcd6c5 50%, #ebe4d7 75%, #f1ebdf 100%)",
        }}
      ></div>
    </section>
  );
};
