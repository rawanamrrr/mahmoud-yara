import { SectionDivider } from "@/components/SectionDivider";
import { HeroSection } from "@/sections/HeroSection";
import { CountdownSection } from "@/sections/CountdownSection";
import { DayDetailsSection } from "@/sections/DayDetailsSection";
import { ScheduleSection } from "@/sections/ScheduleSection";
import { DressCodeSection } from "@/sections/DressCodeSection";
import { RsvpSection } from "@/sections/RsvpSection";
import { FooterSection } from "@/sections/FooterSection";

export const MainContent = () => {
  return (
    <main className="bg-stone-200 box-border caret-transparent outline-[3px]">
      <HeroSection />
      <CountdownSection />
      <DayDetailsSection />
      <SectionDivider />
      <ScheduleSection />
      <DressCodeSection />
      <RsvpSection />
      <FooterSection />
    </main>
  );
};
