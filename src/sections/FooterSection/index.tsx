import { WeddingFooter } from "@/sections/FooterSection/components/WeddingFooter";
import { Credit } from "@/sections/FooterSection/components/Credit";

export const FooterSection = () => {
  return (
    <div className="relative bg-stone-300 box-border caret-transparent outline-[3px]">
      <WeddingFooter />
      <Credit />
    </div>
  );
};
