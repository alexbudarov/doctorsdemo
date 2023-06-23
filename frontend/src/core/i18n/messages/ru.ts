import russianMessages from "@haulmont/ra-language-russian";
import { TranslationMessages } from "ra-core";

export const ru: TranslationMessages = {
  ...russianMessages,
  resources: {
    SubDistrict: {
      name: "Участок |||| Участки",

      fields: {
        centerLon: "Долгота",
        postcode: "Почтовый код",
        name: "Название",
        centerLat: "Широта"
      }
    },
  },
  // place for your messages
};
