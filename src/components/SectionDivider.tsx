import { Heart } from "lucide-react";

export const SectionDivider = () => {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center gap-4 bg-[#f1ebdf] px-6 py-8 text-[#3c4736]/50"
    >
      <span
        className="h-px w-20 md:w-32"
        style={{ background: "linear-gradient(to right, transparent, currentColor)" }}
      ></span>
      <Heart size={16} strokeWidth={1.5} fill="currentColor" className="shrink-0 opacity-70" />
      <span
        className="h-px w-20 md:w-32"
        style={{ background: "linear-gradient(to left, transparent, currentColor)" }}
      ></span>
    </div>
  );
};
