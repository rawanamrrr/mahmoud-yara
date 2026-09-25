import { Heart, Utensils, Music, PartyPopper } from "lucide-react";
import { useLanguage, type TranslationKey } from "@/i18n";
import { ScheduleItem } from "@/sections/ScheduleSection/components/ScheduleItem";

const items: { icon: typeof Heart; key: string }[] = [
  { icon: Heart, key: "katb" },
  { icon: Music, key: "party1" },
  { icon: Utensils, key: "buffet" },
  { icon: PartyPopper, key: "party2" },
];

export const ScheduleTimeline = () => {
  const { t } = useLanguage();

  return (
    <ul className="mx-auto flex max-w-md flex-col gap-6 px-6 pb-16 md:pb-24">
      {items.map(({ icon: Icon, key }, index) => (
        <ScheduleItem
          key={key}
          delay={Math.min(index * 0.08, 0.4)}
          icon={<Icon size={20} strokeWidth={1.75} />}
          time={t(`sch.${key}Time` as TranslationKey)}
          title={t(`sch.${key}` as TranslationKey)}
          description={t(`sch.${key}Desc` as TranslationKey)}
        />
      ))}
    </ul>
  );
};
