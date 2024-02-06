import { useFormContext } from "@/context";
import { Form, Formik } from "formik";
import { usePathname, useRouter } from "next/navigation";
import * as Yup from "yup";
import Button from "../Button";
import FormikController from "./form-controller";

const FormStep2 = () => {
  const getFormValues = JSON.parse(localStorage.getItem("formValues") || "{}");
  const getStepTwoFormValues = JSON.parse(
    localStorage.getItem("stepTwoFormValues") || "{}"
  );
  const formValidity = Object.values(getFormValues).every(
    (value) => value === ""
  );
  const stepTwoFormValidity = Object.values(getStepTwoFormValues).every(
    (value) => value === ""
  );
  const router = useRouter();
  const pathname = usePathname();
  const { stepTwoFormValues, setStepTwoFormValues } = useFormContext();

  const validationSchemaStepOne = Yup.object({
    firstName: Yup.string()
      .required("Please enter first name")
      .min(4, "Name must be more than 4 characters"),
    lastName: Yup.string()
      .required("Please enter last name")
      .min(4, "Name must be more than 4 characters"),
    phone: Yup.string()
      .trim()
      .matches(/(?:\+234|0)[789][01]\d{8}$/, "Invalid phone format")
      .matches(/^[0-9]{11}$/, "Phone number must be exactly 12 digits")
      .required("Phone number is required"),
    gender: Yup.string().required("Please enter your gender"),
    level: Yup.string().required("Please enter your education level"),
  });

  return (
    <Formik
      initialValues={{
        firstName:
          getStepTwoFormValues?.firstName ?? stepTwoFormValues.firstName,
        lastName: getStepTwoFormValues?.lastName ?? stepTwoFormValues.lastName,
        gender: getStepTwoFormValues?.gender ?? stepTwoFormValues.gender,
        phone: getStepTwoFormValues?.phone ?? stepTwoFormValues.phone,
        level: getStepTwoFormValues?.level ?? stepTwoFormValues.level,
      }}
      //   validateOnMount
      validationSchema={validationSchemaStepOne}
      onSubmit={(values) => {
        setStepTwoFormValues((prevValues) => ({
          ...prevValues,
          firstName: values.firstName,
          lastName: values.lastName,
          gender: values.gender,
          phone: values.phone,
          level: values.level,
        }));
        localStorage.setItem("stepTwoFormValues", JSON.stringify(values));
        router.push(`${pathname}?step=3`);
      }}
    >
      {(formik) => {
        return (
          <Form className="flex flex-col items-center justify-center">
            <div className="md:w-[85%] div">
              <div className="md:flex justify-between gap-4 py-4">
                <div className="w-full div">
                  <FormikController
                    control="input"
                    type="text"
                    label="FirstName"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter your first name"
                    disabled={formValidity && stepTwoFormValidity}
                  />
                </div>

                <div className="w-full div">
                  <FormikController
                    control="input"
                    type="text"
                    label="LastName"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter your last name"
                    disabled={formValidity && stepTwoFormValidity}
                  />
                </div>
              </div>
              <div className="md:flex justify-between gap-4 py-2">
                <div className="w-full div">
                  <FormikController
                    control="select"
                    type="select"
                    label="Gender"
                    name="gender"
                    value={formik.values.gender}
                    options={[
                      { label: "Male", value: "Male" },
                      { label: "Female", value: "Female" },
                    ]}
                    onChange={(value: string) => {
                      formik.setFieldValue("gender", value);
                    }}
                    onBlur={() => formik.setFieldTouched("gender", true)}
                    placeholder="Please Select"
                    disabled={formValidity && stepTwoFormValidity}
                  />
                </div>

                <div className="w-full div">
                  <FormikController
                    control="input"
                    type="text"
                    label="Phone Number"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter your phone number"
                    disabled={formValidity && stepTwoFormValidity}
                  />
                </div>
              </div>
              <div className="flex justify-between py-2">
                <div className="w-full div">
                  <FormikController
                    control="select"
                    type="select"
                    label="Level Of Education: (e.g JSSCE, WASSCE, Bsc etc)"
                    name="level"
                    value={formik.values.level}
                    onChange={(value: string) => {
                      formik.setFieldValue("level", value);
                    }}
                    onBlur={() => formik.setFieldTouched("level", true)}
                    placeholder="Please Select"
                    options={[
                      { label: "JSCE", value: "JSCE" },
                      { label: "WASSCE", value: "WASSCE" },
                      { label: "Bsc", value: "Bsc" },
                      { label: "Masters", value: "Masters" },
                      { label: "Phd", value: "Phd" },
                    ]}
                    disabled={formValidity && stepTwoFormValidity}
                  />
                </div>
              </div>
              <Button
                className="!my-[30px] div"
                type="submit"
                disabled={!formik.isValid}
                isLoading={formik.isSubmitting && formik.isValid}
              >
                Save and continue
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormStep2;
