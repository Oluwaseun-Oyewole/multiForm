"use client";
import { poppins } from "@/app/font";
import { useFormContext } from "@/context";
import { ConfigProvider } from "antd";
import { motion, stagger, useAnimate } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Form from ".";
import Button from "../Button";
import InvalidRoute from "../error";

const staggerMenuItems = stagger(0.25, { startDelay: 0.4 });
function useMenuAnimation() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      ".div",
      { opacity: [0, 0.5, 0.6, 0.8, 1] },
      {
        duration: 0.4,
        delay: staggerMenuItems,
      }
    );
  }, []);
  return scope;
}

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

const FormLayout = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const totalStepNumber = 3;
  const step = searchParams.get("step") ?? 1;
  const stepNumber = Number(step);
  const scope = useMenuAnimation();

  const { isOpen, closeModal } = useFormContext();

  const updateUrlStringOnPageLoad = (step: number) => {
    const sp = new URLSearchParams(searchParams);
    sp.set("step", step.toString());
    router.push(`?${sp.toString()}`);
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

  const variants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 left-0 bg-base h-screen w-full z-50 overflow-hidden flex items-center justify-center"
          onClick={() => {
            window.location.reload();
            setTimeout(() => {
              closeModal();
            }, 1000);
          }}
        >
          <motion.div
            className="bg-white w-[400px] shadow-md flex flex-col items-center py-10 gap-7"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: [0.3, 0.5, 0.7, 1], y: 0 }}
          >
            {/* <Image src={Checked} alt="checked" className="" /> */}
            <div className="text-sm">
              <p>Form Submitted Successfully</p>
            </div>
            <div className="w-1/2">
              <Button className="bg-btn !text-sm">Continue</Button>
            </div>
          </motion.div>
        </div>
      )}

      <ConfigProvider
        theme={{
          token: {
            fontFamily: `${poppins}`,
          },
        }}
      >
        {stepNumber <= 3 ? (
          <div ref={scope} className="relative">
            {
              <motion.div
                className="grid grid-flow-row lg:grid-flow-col lg:grid-cols-[30%_auto] w-full"
                variants={variants}
                initial="initial"
                animate="animate"
              >
                <div className="bg-base text-black w-full px-10 pt-10 h-[450px] lg:h-screen sticky left-0 top-0 overflow-hidden z-40">
                  {/* <Image src={Logo} alt="logo" /> */}
                  <div className="text-sm pt-20 flex flex-col gap-10">
                    {data?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className={`div flex gap-2 items-start opacity-100`}
                        >
                          <p
                            className={`self-start border-2 ${
                              stepNumber === item.id
                                ? "border-primary"
                                : "text-gray-400"
                            } rounded-full w-8 h-8 flex items-center justify-center text-sm`}
                          >
                            {item.id}
                          </p>

                          <Link href={`${item.step}`}>
                            <motion.div className="flex flex-col gap-2">
                              <p
                                className={`transition-all ease-in-out duration-200 text-gray-400 ${
                                  stepNumber === item.id &&
                                  "!text-primary text-lg font-bold"
                                }`}
                              >
                                {item.title}
                              </p>
                              <p
                                className={`transition-all ease-in-out duration-200 text-gray-400  ${
                                  stepNumber === item.id &&
                                  "!text-primary font-bold"
                                }`}
                              >
                                {item.description}
                              </p>
                            </motion.div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="px-10 pt-10">
                  <div
                    className={`flex items-center ${
                      stepNumber === 1 ? "justify-end" : "justify-between"
                    }`}
                  >
                    {stepNumber > 1 && (
                      <p
                        onClick={() => {
                          stepNumber === 3
                            ? router.push(`${pathname}?step=2`)
                            : router.push(`${pathname}?step=1`);
                        }}
                        className="cursor-pointer"
                      >
                        Back
                      </p>
                    )}
                    <div className="self-end flex items-end justify-end flex-col">
                      <p className="text-secondary">
                        Step 0{stepNumber}/0{totalStepNumber}
                      </p>
                      <p className="text-primary">{title()}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center pt-10 pb-5">
                    <p className="text-primary text-xl">{title()}</p>
                    <p className="text-gray-500 text-sm pt-1">
                      {description()}
                    </p>
                  </div>
                  <Form />
                </div>
              </motion.div>
            }
          </div>
        ) : (
          <div ref={scope}>
            <InvalidRoute />
          </div>
        )}
      </ConfigProvider>
    </>
  );
};

export default FormLayout;
