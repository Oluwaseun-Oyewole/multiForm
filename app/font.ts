import { Poppins, Roboto } from "next/font/google";

export const poppins = Poppins({
  weight: ["300", "500"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const roboto = Roboto({
  weight: ["300", "500"],
  subsets: ["latin"],
  variable: "--font-roboto",
});
