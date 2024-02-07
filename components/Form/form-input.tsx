import { Input, InputProps } from "antd";
import { ErrorMessage } from "formik";
import FormError from "./form-error";
import FormFieldLayout from "./form-layout";

type IProps = {
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  value?: string | number | null;
} & InputProps;

export default function FormInput({
  label,
  placeholder,
  value,
  name,
  onChange,
  onBlur,
  ...props
}: IProps) {
  return (
    <FormFieldLayout
      label={label}
      content={
        <>
          <Input
            className="py-[17px] rounded-[5px] border-gray-300 border-[1.3px] focus:border-btn hover:border-btn"
            value={value || undefined}
            placeholder={placeholder}
            onChange={onChange && onChange}
            onBlur={onBlur}
            name={name}
            autoComplete="off"
            {...props}
          />
          <ErrorMessage
            name={name as string}
            // eslint-disable-next-line react/no-children-prop
            children={(msg) => <FormError error={msg} />}
          />
        </>
      }
    />
  );
}
