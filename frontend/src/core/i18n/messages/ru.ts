import russianMessages from "@haulmont/ra-language-russian";
import { TranslationMessages } from "ra-core";

export const ru: TranslationMessages = {
  ...russianMessages,
  resources: {
    Doctor: {
      name: "Доктор |||| Доктора",

      fields: {
        firstName: "Имя",
        lastName: "Фамилия",
        specialty: "Специальность"
      }
    },

    Patient: {
      name: "Пациент |||| Пациенты",

      fields: {
        firstName: "Имя",
        lastName: "Фамилия"
      }
    },

    enums: {
      Specialty: {
        ALLERGY_AND_IMMUNOLOGY: "Аллергология и иммунология",
        DERMATOLOGY: "Дерматология",
        GP: "Общая практика",
        NEUROLOGY: "Неврология",
        OPHTHALMOLOGY: "Офтальмология",
        PSYCHIATRY: "Психиатрия"
      }
    }
  },
  // place for your messages
};
