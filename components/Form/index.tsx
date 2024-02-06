import { stagger, useAnimate } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import FormStep1 from "./form-step1";
import FormStep2 from "./form-step2";
import FormStep3 from "./form-step3";

const staggerMenuItems = stagger(0.25, { startDelay: 0.1 });
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

const FormContent = () => {
  const searchParams = useSearchParams();
  const step = searchParams.get("step") ?? 1;
  const currentStep = Number(step);
  const scope = useMenuAnimation();

  const renderForm = () => {
    if (currentStep === 1) {
      return <FormStep1 />;
    } else if (currentStep === 2) {
      return <FormStep2 />;
    } else if (currentStep === 3) {
      return <FormStep3 />;
    }
  };
  return <div ref={scope}>{renderForm()}</div>;
};

export default FormContent;
