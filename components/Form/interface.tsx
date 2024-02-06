export type FormType = {};
export type IForms = {
  personalInformation: {
    formEntries: {
      firstName: string;
      lastName: string;
      maidenName: string;
      phone: string;
      address: string;
      educationLevel: string[];
      status: string[];
    };
  };
  dependentInformation: {
    formEntries: {
      firstName: string;
      lastName: string;
      gender: string[];
      phone: string;
      educationLevel: string[];
    };
  };
};
