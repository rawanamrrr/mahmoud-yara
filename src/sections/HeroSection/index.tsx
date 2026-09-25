import { HeroVideo } from "@/sections/HeroSection/components/HeroVideo";
import { HeroTitle } from "@/sections/HeroSection/components/HeroTitle";
import { HeroRsvpButton } from "@/sections/HeroSection/components/HeroRsvpButton";

export const HeroSection = () => {
  return (
    <section className="relative items-center bg-stone-200 box-border caret-transparent flex justify-center h-screen h-[100svh] outline-[3px] overflow-hidden">
      <div className="absolute box-border caret-transparent outline-[3px] inset-0">
        <HeroVideo />
      </div>
      <div className="absolute bg-black/60 box-border caret-transparent outline-[3px] z-[1] inset-0"></div>
      <HeroTitle />
      <HeroRsvpButton />
    </section>
  );
};
