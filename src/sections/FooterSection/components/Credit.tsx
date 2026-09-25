import { useLanguage } from "@/i18n";
export const Credit = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-white box-border caret-transparent outline-[3px] text-center border-stone-500/10 py-4 border-t border-solid">
      <p className="text-stone-500 text-xs font-medium box-border caret-transparent leading-4 opacity-100 outline-[3px] md:opacity-0">
        {t("credit.madeBy")}{" "}
        <a
          href="https://invitations.digitivaa.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-black box-border caret-transparent outline-[3px] underline hover:text-stone-500/80"
        >
          Digitiva
        </a>
      </p>
    </div>
  );
};
