import { TranslationMessages } from "ra-core";
import englishMessages from "ra-language-english";
import { mergeMessages } from "./mergeMessages";

const messages: TranslationMessages = {
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

export const en = mergeMessages(
  messages,
  [] // place addon messages here
);
