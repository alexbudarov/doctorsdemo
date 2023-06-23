import { TranslationMessages } from "ra-core";
import englishMessages from "ra-language-english";

export const en: TranslationMessages = {
  ...englishMessages,
  resources: {
    SubDistrict: {
      name: "SubDistrict |||| SubDistricts",

      fields: {
        centerLon: "Longitude",
        postcode: "Postal code",
        name: "Name",
        centerLat: "Latitude"
      }
    },

    Doctor: {
      name: "Doctor |||| Doctors",

      fields: {
        lastName: "Last Name",
        firstName: "First Name"
      }
    },

    Patient: {
      name: "Patient |||| Patients",

      fields: {
        lastName: "Last Name",
        firstName: "First Name",
        subDistrict: "Sub District",
        birthDate: "Birth Date",
        homeAddress: "Home Address"
      }
    },

    Appointment: {
      name: "Appointment |||| Appointments",

      fields: {
        doctor: "Doctor",
        durationMinutes: "Duration Minutes",
        endTime: "End Time",
        patient: "Patient",
        status: "Status",
        time: "Time"
      }
    }
  },
};
