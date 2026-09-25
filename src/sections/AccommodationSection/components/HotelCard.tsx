export type HotelCardProps = {
  containerClassName: string;
  headerWrapperClassName: string;
  hasInnerHeaderWrapper: string;
  optionLabel: string;
  hotelName: string;
  locationText: string;
  descriptionPrefix: string;
  descriptionBoldText: string;
  descriptionSuffix: string;
  hotelUrl: string;
};

export const HotelCard = (props: HotelCardProps) => {
  const content = (
    <>
      <span className="text-xs box-border caret-transparent block tracking-[0.6px] leading-4 outline-[3px] uppercase mb-1">
        {props.optionLabel}
      </span>
      <h3 className="text-xl box-border caret-transparent leading-7 outline-[3px]">
        {props.hotelName}
      </h3>
      <p className="text-sm items-center box-border caret-transparent gap-x-1 flex leading-5 outline-[3px] gap-y-1 mt-1">
        <img
          src="https://c.animaapp.com/sYECYRLIChBJxO67a5WNpw/assets/icon-6.svg"
          alt="Icon"
          className="box-border caret-transparent h-3 outline-[3px] w-3"
        />
        {props.locationText}
      </p>
    </>
  );

  return (
    <div className={props.containerClassName}>
      {props.hasInnerHeaderWrapper === "true" ? (
        <a href={props.hotelUrl} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
};
