import { Input } from "antd";
import { TextAreaProps } from "antd/es/input";
import { ErrorMessage } from "formik";
import React from "react";
import FormError from "./form-error";
import FormFieldLayout from "./form-layout";

type IForms = {
  label?: string;
  placeholder?: string;
  value?: string;
} & TextAreaProps;

const FormTextArea: React.FC<IForms> = ({
  label,
  onChange,
  onBlur,
  name,
  value,
  disabled,
  placeholder,
}) => {
  const { TextArea } = Input;
  return (
    <FormFieldLayout
      label={label}
      content={
        <>
          <TextArea
            className="w-full rounded-[5px] bg-white border-[1.3px] focus:border-btn hover:border-btn"
            value={value || undefined}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            cols={7}
            rows={7}
            disabled={disabled}
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
};

export default FormTextArea;
