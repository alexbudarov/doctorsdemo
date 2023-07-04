import { TranslationMessages } from "ra-core";
import englishMessages from "ra-language-english";

export const en: TranslationMessages = {
  ...englishMessages,

  resources: {
    Doctor: {
      name: "Doctor |||| Doctors",

      fields: {
        firstName: "First Name",
        lastName: "Last Name",
        specialty: "Specialty"
      }
    },

    Patient: {
      name: "Patient |||| Patients",

      fields: {
        firstName: "First Name",
        lastName: "Last Name"
      }
    }
  },

  enums: {
    Specialty: {
      ALLERGY_AND_IMMUNOLOGY: "Allergy and immunology",
      DERMATOLOGY: "Dermatology",
      GP: "Gp",
      NEUROLOGY: "Neurology",
      OPHTHALMOLOGY: "Ophthalmology",
      PSYCHIATRY: "Psychiatry"
    }
  }
};
