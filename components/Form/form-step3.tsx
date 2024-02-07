import { useFormContext } from "@/context";
import { Form, Formik } from "formik";
import { usePathname, useRouter } from "next/navigation";
import * as Yup from "yup";
import Button from "../Button";
import FormikController from "./form-controller";

const FormStep3 = () => {
  const { openModal } = useFormContext();
  const getFormValues = JSON.parse(
    localStorage.getItem("stepTwoFormValues") || "{}"
  );
  const getStepThreeFormValues = JSON.parse(
    localStorage.getItem("stepThreeFormValues") || "{}"
  );
  const formValidity = Object.values(getFormValues).every(
    (value) => value === ""
  );
  const stepTwoFormValidity = Object.values(getStepThreeFormValues).every(
    (value) => value === ""
  );
  const router = useRouter();
  const pathname = usePathname();
  const { stepThreeFormValues, setStepThreeFormValues } = useFormContext();

  const validationSchemaStepOne = Yup.object({
    previousEconomicActivity: Yup.string().required("Field is required"),
    // skills: Yup.string().required("Field is required"),
    currentEngagement: Yup.string().required("Field is required"),
    monthlyIncome: Yup.string()
      .required("Monthly income is required")
      .matches(/^[0-9]+$/, "Monthly income must not contain letters"),
    bankAccountNumber: Yup.string()
      .matches(/^[0-9]+$/, "Account number must not contain letters")
      .required("Account number is required")
      .min(10, "Account number must be at least 10 digits")
      .max(10, "Account number must not exceed 10 digits"),
    useOfCredit: Yup.string().required("Field is required"),
    // detailsOfLoans: Yup.string().required("Field is required"),
    // membership: Yup.string().required("Field is reqmuired"),
  });

  return (
    <>
      <Formik
        initialValues={{
          previousEconomicActivity:
            stepThreeFormValues.previousEconomicActivity,
          skills: stepThreeFormValues.skills,
          currentEngagement: stepThreeFormValues.currentEngagement,
          monthlyIncome: stepThreeFormValues.monthlyIncome,
          bankAccountNumber: stepThreeFormValues.bankAccountNumber,
          useOfCredit: stepThreeFormValues.useOfCredit,
          detailsOfLoans: stepThreeFormValues.detailsOfLoans,
          membership: stepThreeFormValues.membership,
        }}
        //   validateOnMount
        validationSchema={validationSchemaStepOne}
        onSubmit={(values) => {
          setStepThreeFormValues((prevValues) => ({
            ...prevValues,
            previousEconomicActivity: values.previousEconomicActivity,
            skills: values.skills,
            currentEngagement: values.currentEngagement,
            monthlyIncome: values.monthlyIncome,
            bankAccountNumber: values.bankAccountNumber,
            useOfCredit: values.bankAccountNumber,
            detailsOfLoans: values.detailsOfLoans,
            membership: values.membership,
          }));
          // localStorage.setItem("stepThreeFormValues", JSON.stringify(values));
          localStorage.clear();
          openModal();
          router.push(`${pathname}?step=1`);
        }}
      >
        {(formik) => {
          return (
            <Form className="flex flex-col items-center justify-center">
              <div className="md:w-[85%] div">
                <div className="w-full div ">
                  <FormikController
                    control="input"
                    type="text"
                    label="Previous Economic Activity"
                    name="previousEconomicActivity"
                    value={formik.values.previousEconomicActivity}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Job"
                    disabled={formValidity && stepTwoFormValidity}
                  />
                </div>

                <div className="md:flex justify-between gap-4 py-2">
                  <div className="w-full div">
                    <FormikController
                      control="input"
                      type="text"
                      label="Skills (If Any)"
                      name="skills"
                      value={formik.values.skills}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Skills"
                      disabled={formValidity && stepTwoFormValidity}
                    />
                  </div>
                  <div className="w-full div">
                    <FormikController
                      control="input"
                      type="text"
                      label="Current Engagement"
                      name="currentEngagement"
                      value={formik.values.currentEngagement}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Current Engagement"
                      disabled={formValidity && stepTwoFormValidity}
                    />
                  </div>
                </div>

                <div className="w-full div py-2">
                  <FormikController
                    control="input"
                    type="text"
                    label="Average Monthly Income (NGN)"
                    name="monthlyIncome"
                    value={formik.values.monthlyIncome}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Average Monthly Income"
                    disabled={formValidity && stepTwoFormValidity}
                  />
                </div>

                <div className="w-full div py-2">
                  <FormikController
                    control="input"
                    type="text"
                    label="Bank Account Details"
                    name="bankAccountNumber"
                    value={formik.values.bankAccountNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Bank Account Details"
                    disabled={formValidity && stepTwoFormValidity}
                  />
                </div>

                <div className="w-full div py-2">
                  <FormikController
                    control="area"
                    type="textarea"
                    label="Intended use of the credit"
                    name="useOfCredit"
                    value={formik.values.useOfCredit}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder=""
                    disabled={formValidity && stepTwoFormValidity}
                  />
                </div>

                <div className="w-full div">
                  <FormikController
                    control="area"
                    type="textarea"
                    label="Details of loan previously taken and current status"
                    name="detailsOfLoans"
                    value={formik.values.detailsOfLoans}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder=""
                    disabled={formValidity && stepTwoFormValidity}
                  />
                </div>
                <div className="w-full div py-4">
                  <FormikController
                    control="area"
                    type="textarea"
                    label="Membership of any cooperative society or savings And Collection Association 
              (Provide details)"
                    name="membership"
                    value={formik.values.membership}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder=""
                    disabled={formValidity && stepTwoFormValidity}
                  />
                </div>

                <Button
                  className="!my-[30px] div"
                  type="submit"
                  disabled={!formik.isValid}
                  isLoading={formik.isSubmitting && formik.isValid}
                >
                  Submit
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default FormStep3;
