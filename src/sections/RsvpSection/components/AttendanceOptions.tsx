import { useLanguage } from "@/i18n";

type AttendanceOptionsProps = {
  value: "yes" | "no";
  onChange: (value: "yes" | "no") => void;
};

export const AttendanceOptions = ({ value, onChange }: AttendanceOptionsProps) => {
  const { t } = useLanguage();

  return (
    <fieldset className="mb-5">
      <legend className="mb-3 block text-sm text-[#3c4736]">{t("rsvp.attend")}</legend>
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        {(["yes", "no"] as const).map((option) => (
          <label key={option} className="flex cursor-pointer items-center gap-2 text-sm text-[#3c4736]">
            <input
              type="radio"
              name="attending"
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="h-4 w-4 accent-[#3c4736]"
            />
            {t(option === "yes" ? "rsvp.yes" : "rsvp.no")}
          </label>
        ))}
      </div>
    </fieldset>
  );
};
