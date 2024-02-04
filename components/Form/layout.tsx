import Logo from "@/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const data = [
  {
    id: 1,
    title: "Personal Information",
    description: "Enter your personal data appropriately",
    step: "?step=1",
  },

  {
    id: 2,
    title: "Dependent Information",
    description: "Enter your dependent data appropriately",
    step: "?step=2",
  },

  {
    id: 3,
    title: "Financial Information",
    description: "Enter your dependent data appropriately",
    step: "?step=3",
  },
];
const FormLayout = ({}: //   header,
//   content,
{
  //   header: React.ReactNode;
  //   content: React.ReactNode;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalStepNumber = 3;
  const stepNumber = Number(searchParams.get("step")) ?? 1;
  const updateUrlStringOnPageLoad = (step: number) => {
    const sp = new URLSearchParams(searchParams);
    sp.set("step", step.toString());
    router.push(`?${sp.toString()}`);
    // window.history.replaceState({}, "", `?${sp.toString()}`);
  };

  useEffect(() => {
    updateUrlStringOnPageLoad(Number(stepNumber));
  }, [searchParams]);

  const title = () => {
    if (stepNumber === 1) {
      return "Personal Information";
    } else if (stepNumber === 2) {
      return "Dependent Information";
    } else return "Financial Information";
  };

  const description = () => {
    if (stepNumber === 1) {
      return "Enter your personal data appropriately";
    } else if (stepNumber === 2) {
      return "Enter your dependent data appropriately";
    } else return "Enter your financial data appropriately";
  };

  return (
    <>
      {stepNumber !== 0 && stepNumber <= 3 ? (
        <>
          {
            <div className="grid grid-flow-row lg:grid-flow-col lg:grid-cols-[30%_auto] h-screen w-full">
              <div className="bg-base text-black w-full px-10 pt-10">
                <Image src={Logo} alt="logo" />

                <div className="text-sm pt-20 flex flex-col gap-6">
                  {data?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={`flex gap-2 items-start opacity-50 ${
                          stepNumber === item.id && "opacity-100"
                        }`}
                      >
                        <p className="self-start border-2 border-primary rounded-full w-8 h-8 flex items-center justify-center text-sm">
                          {index}
                        </p>

                        <Link href={`${item.step}`}>
                          <div className="flex flex-col gap-2">
                            <p
                              className={`transition-all ease-in-out duration-200 ${
                                stepNumber === item.id &&
                                "text-primary text-lg "
                              }`}
                            >
                              {item.title}
                            </p>
                            <p
                              className={`transition-all ease-in-out duration-200  ${
                                stepNumber === item.id && "text-primary "
                              }`}
                            >
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="px-10 pt-10">
                {stepNumber > 1 && (
                  <p
                    onClick={() => {
                      // router.back();
                      window.history.back();
                    }}
                    className="cursor-pointer"
                  >
                    Back
                  </p>
                )}

                <div className="flex items-end justify-end flex-col">
                  <p>
                    Step 0{stepNumber}/0{totalStepNumber}
                  </p>
                  <p className="text-primary">{title()}</p>
                </div>

                <div className="flex flex-col items-center justify-center pt-10">
                  <p className="text-primary">{title()}</p>
                  <p className="text-gray-500">{description()}</p>
                </div>
              </div>
            </div>
          }
        </>
      ) : (
        <>
          Invalid URL Route
          <Link href="?step=1">Go back</Link>
        </>
      )}
    </>
  );
};

export default FormLayout;
