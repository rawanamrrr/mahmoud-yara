import { Reveal } from "@/components/Reveal";
import type { ReactNode } from "react";

export type ScheduleItemProps = {
  icon: ReactNode;
  time: string;
  title: string;
  description: string;
  delay?: number;
};

export const ScheduleItem = (props: ScheduleItemProps) => {
  return (
    <Reveal as="li" variant="left" delay={props.delay} className="flex items-start gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#3c4736] shadow-sm">
        {props.icon}
      </span>
      <div className="min-w-0 flex-1 pt-0.5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span
            dir="ltr"
            className="rounded-md bg-[#3c4736] px-2 py-0.5 text-xs font-black leading-4 tracking-wide text-white"
          >
            {props.time}
          </span>
          <h3 className="text-base font-black leading-6 text-[#3c4736]">{props.title}</h3>
        </div>
        <p className="mt-0.5 text-sm leading-5 text-[#3c4736]/70">{props.description}</p>
      </div>
    </Reveal>
  );
};
