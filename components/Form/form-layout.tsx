import { ReactNode } from "react";
import Label from "./form-label";

export default function FormFieldLayout({
  content,
  label,
}: {
  content: ReactNode;
  label?: string;
}) {
  return (
    <div>
      <Label label={label} />
      <div>{content}</div>
    </div>
  );
}
