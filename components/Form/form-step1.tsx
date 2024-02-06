import { useFormContext } from "@/context";
import { Form, Formik } from "formik";
import { usePathname, useRouter } from "next/navigation";
import * as Yup from "yup";
import Button from "../Button";
import FormikController from "./form-controller";

const FormStep1 = () => {
  const router = useRouter();
  const pathname = usePathname();
  const getFormValuesFromLocalStorage = JSON.parse(
    localStorage.getItem("formValues") || "{}"
  );

  const { formValues, setFormValues } = useFormContext();
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
    address: Yup.string().required("Please enter your address"),
    status: Yup.string().required("Please enter your marital status"),
    maiden: Yup.string().required("Please enter your maiden name"),
    level: Yup.string().required("Please enter your education level"),
  });

  return (
    <Formik
      initialValues={{
        firstName:
          getFormValuesFromLocalStorage?.firstName ?? formValues.firstName,
        lastName:
          getFormValuesFromLocalStorage?.lastName ?? formValues.lastName,
        status: getFormValuesFromLocalStorage?.status ?? formValues.status,
        maiden: getFormValuesFromLocalStorage?.maiden ?? formValues.maiden,
        address: getFormValuesFromLocalStorage?.address ?? formValues.address,
        phone: getFormValuesFromLocalStorage?.phone ?? formValues.phone,
        level: getFormValuesFromLocalStorage?.level ?? formValues.level,
      }}
      //   validateOnMount
      validationSchema={validationSchemaStepOne}
      onSubmit={(values) => {
        setFormValues((prevValues) => ({
          ...prevValues,
          firstName: values.firstName,
          lastName: values.lastName,
          status: values.status,
          maiden: values.maiden,
          address: values.address,
          phone: values.phone,
          level: values.level,
        }));
        localStorage.setItem("formValues", JSON.stringify(values));
        router.push(`${pathname}?step=2`);
      }}
    >
      {(formik) => {
        return (
          <Form className="flex flex-col items-center justify-center">
            <div className="md:w-[85%]">
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
                  />
                </div>
              </div>
              <div className="md:flex justify-between gap-4 py-2">
                <div className="w-full div">
                  <FormikController
                    control="input"
                    type="text"
                    label="Maiden Name"
                    name="maiden"
                    value={formik.values.maiden}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter your last name"
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
                  />
                </div>
              </div>

              <div className="w-full div">
                <FormikController
                  control="input"
                  type="text"
                  label="Home Address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your phone number"
                />
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
                  />
                </div>
              </div>

              <div className="w-full div">
                <FormikController
                  control="select"
                  type="select"
                  label="Marital Status"
                  name="status"
                  value={formik.values.status}
                  onChange={(value: string) => {
                    formik.setFieldValue("status", value);
                  }}
                  onBlur={() => formik.setFieldTouched("status", true)}
                  placeholder="Please Select"
                  options={[
                    { label: "Single", value: "Single" },
                    { label: "Married", value: "Married" },
                    { label: "Divorced", value: "Divorced" },
                  ]}
                />
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

export default FormStep1;
