export type GuestFieldsProps = {
  variant: string;
  containerClassName: string;
  label: string;
  inputType: string;
  placeholder: string;
  maxLength: string;
  defaultValue: string;
  required: boolean;
  description: string;
  adultButtonText: string;
  childButtonText: string;
  transportLabel: string;
  accommodationLabel: string;
  accommodationPlaceholder: string;
  accommodationMaxLength: string;
  accommodationDefaultValue: string;
  songLabel: string;
  songPlaceholder: string;
  songMaxLength: string;
  songDefaultValue: string;
  textareaRows: string;
};

export const GuestFields = (props: GuestFieldsProps) => {
  if (props.variant === "companions") {
    return (
      <div className={props.containerClassName}>
        <div className="box-border caret-transparent outline-[3px]">
          <label className="text-sm font-black box-border caret-transparent leading-[14px] outline-[3px]">
            {props.label}
          </label>
          <p className="text-sm font-black box-border caret-transparent leading-5 outline-[3px] mt-4">
            {props.description}
          </p>
          <div className="box-border caret-transparent gap-x-3 flex outline-[3px] gap-y-3 mt-4">
          </div>
        </div>
      </div>
    );
  }
  return null;
};
