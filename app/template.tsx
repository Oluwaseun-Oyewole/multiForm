import { FormProvider } from "@/context";

export default function Template({ children }: { children: React.ReactNode }) {
  return <FormProvider> {children}</FormProvider>;
}
