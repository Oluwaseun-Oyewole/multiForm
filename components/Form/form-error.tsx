import { FC } from "react";

type IFormErrorProps = {
  error?: string;
};

const FormError: FC<IFormErrorProps> = ({ error }) => {
  return (
    <p className="!text-btn mt-[5px] flex items-center text-sm">
      <p className="!text-btn inline-block mr-1 text-base leading-4" />
      {error}
    </p>
  );
};

export default FormError;
