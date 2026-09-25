export type CountdownItemProps = {
  value: string;
  label: string;
};

export const CountdownItem = (props: CountdownItemProps) => {
  return (
    <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] p-2 md:p-6">
      <span className="text-white text-3xl font-light box-border caret-transparent block leading-9 outline-[3px] md:text-6xl md:leading-[60px]">
        {props.value}
      </span>
      <span className="text-white/70 text-[10px] box-border caret-transparent block tracking-[1.5px] leading-[15px] outline-[3px] uppercase mt-1 md:text-xs md:tracking-[2.4px] md:leading-4 md:mt-2">
        {props.label}
      </span>
    </div>
  );
};
