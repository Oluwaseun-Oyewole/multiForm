import { FormProvider } from "@/context";
import { poppins } from "./font";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Stepper Form</title>
        <meta name="Stepper Form" content="Description" />
      </head>
      <FormProvider>
        <body className={`${poppins.variable} font-poppins`}>{children}</body>
      </FormProvider>
    </html>
  );
}
