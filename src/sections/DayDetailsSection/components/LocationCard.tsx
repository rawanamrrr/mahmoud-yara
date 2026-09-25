import { Clock, MapPin } from "lucide-react";
import { useLanguage } from "@/i18n";

export const LocationCard = () => {
  const { t } = useLanguage();

  return (
    <div className="mx-auto w-full max-w-md rounded-xl bg-[#faf8f4] font-span px-5 pb-6 pt-8 text-center shadow-sm">
      <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#e6e2d6] text-[#3c4736]">
        <MapPin size={24} strokeWidth={1.75} />
      </span>
      <h3 className="mb-2 text-2xl leading-8 text-[#3c4736]">{t("loc.title")}</h3>
      <p className="mb-1 text-lg leading-7 text-[#3c4736]">{t("venue.name")}</p>
      <p className="mb-2 text-sm leading-6 text-[#3c4736]/80">{t("venue.address")}</p>
      <p className="mb-5 flex items-center justify-center gap-2 text-sm text-[#3c4736]/80">
        <Clock size={14} />
        <span>{t("loc.hours")}</span>
      </p>
      <iframe
        title="The Grove Venue"
        src="https://www.google.com/maps?q=The+Grove+Venue+El+Shorouk+Cairo&output=embed"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-44 w-full rounded-lg border-0"
      ></iframe>
    </div>
  );
};
