import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/i18n";
import { CountdownItem } from "@/sections/CountdownSection/components/CountdownItem";

// Saturday 31 Oct 2026, 6:00 PM Cairo time (UTC+2).
const WEDDING_DATE = new Date("2026-10-31T18:00:00+02:00").getTime();

const getRemaining = () => {
  const diff = Math.max(WEDDING_DATE - Date.now(), 0);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  };
};

const pad = (n: number) => String(n).padStart(2, "0");

export const CountdownGrid = () => {
  const { t } = useLanguage();
  const [remaining, setRemaining] = useState(getRemaining);

  useEffect(() => {
    const id = window.setInterval(() => setRemaining(getRemaining()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const units = [
    { value: remaining.days, label: t("count.days") },
    { value: remaining.hours, label: t("count.hours") },
    { value: remaining.minutes, label: t("count.minutes") },
    { value: remaining.seconds, label: t("count.seconds") },
  ];

  return (
    <div className="box-border caret-transparent gap-x-2 grid grid-cols-[repeat(4,minmax(0px,1fr))] max-w-screen-md outline-[3px] gap-y-2 mx-auto md:gap-x-8 md:gap-y-8">
      {units.map((unit, index) => (
        <Reveal key={index} variant="scale" delay={index * 0.12}>
          <CountdownItem value={pad(unit.value)} label={unit.label} />
        </Reveal>
      ))}
    </div>
  );
};
