"use client";
import { PropsWithChildren, createContext, useContext, useState } from "react";
interface FormValues {
  firstName?: string;
  lastName?: string;
  maiden?: string;
  address?: string;
  phone?: string;
  status?: string;
  gender?: string;
  level?: string;
  previousEconomicActivity?: string;
  skills?: string;
  currentEngagement?: string;
  monthlyIncome?: string;
  bankAccountNumber?: string;
  useOfCredit?: string;
  detailsOfLoans?: string;
  membership?: string;
}

interface FormContextType {
  formValues: FormValues;
  stepTwoFormValues: Partial<FormValues>;
  stepThreeFormValues: Partial<FormValues>;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
  setStepTwoFormValues: React.Dispatch<
    React.SetStateAction<Partial<FormValues>>
  >;
  setStepThreeFormValues: React.Dispatch<
    React.SetStateAction<Partial<FormValues>>
  >;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

export const FormProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [formValues, setFormValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    phone: "",
    status: "",
    address: "",
    maiden: "",
    level: "",
  });

  const [stepTwoFormValues, setStepTwoFormValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    level: "",
  });

  const [stepThreeFormValues, setStepThreeFormValues] = useState<FormValues>({
    previousEconomicActivity: "",
    skills: "",
    currentEngagement: "",
    monthlyIncome: "",
    bankAccountNumber: "",
    useOfCredit: "",
    detailsOfLoans: "",
    membership: "",
  });

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <FormContext.Provider
      value={{
        formValues,
        setFormValues,
        stepTwoFormValues,
        setStepTwoFormValues,
        stepThreeFormValues,
        setStepThreeFormValues,
        isOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
