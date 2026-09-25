import { useLanguage } from "@/i18n";
import { HotelList } from "@/sections/AccommodationSection/components/HotelList";

export const AccommodationSection = () => {
  const { t } = useLanguage();
  return (
    <section className="bg-stone-200 box-border caret-transparent outline-[3px]">
      <div className="relative box-border caret-transparent flex justify-center outline-[3px] z-10 -mt-8">
        <img
          src="https://c.animaapp.com/sYECYRLIChBJxO67a5WNpw/assets/accommodation-icon-mQBd7pDb.png"
          alt="Icono de fuente decorativa"
          className="box-border caret-transparent max-w-full min-h-[auto] min-w-[auto] object-contain outline-[3px] w-48"
        />
      </div>
      <div className="box-border caret-transparent max-w-screen-md outline-[3px] mx-auto pt-4 pb-20 px-6 md:pb-32 md:px-12">
        <div className="box-border caret-transparent outline-[3px] text-center mb-12">
          <h2 className="text-5xl box-border caret-transparent leading-[48px] outline-[3px] mb-3 font-classic_script_mn md:text-6xl md:leading-[60px]">
            {t("acc.title")}
          </h2>
          <p className="text-sm box-border caret-transparent tracking-[1.4px] leading-5 outline-[3px] uppercase mb-6">
            {t("acc.subtitle")}
          </p>
        </div>
        <HotelList />
      </div>
      <div className="box-border caret-transparent outline-[3px] w-full">
        <img
          src="https://c.animaapp.com/sYECYRLIChBJxO67a5WNpw/assets/mallorca-map-illustrated-CZKZhiTw.png"
          alt="Mapa ilustrado de Mallorca"
          className="box-border caret-transparent max-w-full outline-[3px] w-full"
        />
      </div>
    </section>
  );
};
