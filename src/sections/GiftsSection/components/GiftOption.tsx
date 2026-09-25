export type GiftOptionProps = {
  label: React.ReactNode;
  containerVariant: string;
};

export const GiftOption = (props: GiftOptionProps) => {
  return (
    <div
      className={`box-border caret-transparent outline-[3px] text-left border border-stone-500/20 overflow-hidden rounded-lg border-solid ${props.containerVariant}`}
    >
      <button className="items-center bg-white/60 caret-transparent flex justify-between outline-[3px] text-center w-full px-4 py-3 hover:bg-white/80">
        {props.label}
        <img
          src="https://c.animaapp.com/sYECYRLIChBJxO67a5WNpw/assets/icon-8.svg"
          alt="Icon"
          className="box-border caret-transparent h-[18px] outline-[3px] w-[18px]"
        />
      </button>
    </div>
  );
};
