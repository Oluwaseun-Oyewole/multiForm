import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import Spinner from "../Form/loader";

type IProps = { isLoading?: boolean } & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  className,
  isLoading,
  ...rest
}: IProps) {
  return (
    <button
      {...rest}
      className={twMerge(
        `py-[20px] px-[12px] rounded-[5px] bg-btn text-white w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-4 justify-center`,
        className
      )}
    >
      {children} {isLoading && <Spinner />}
    </button>
  );
}
