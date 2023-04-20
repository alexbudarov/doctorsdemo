/* eslint-disable */
import * as graphql from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

const documents = {
  "\n  query Appointment_AppointmentList($id: ID!) {\n  appointment(id: $id) {\n    doctor {\n      firstName\n      id\n      lastName\n      specialty\n    }\n    durationMinutes\n    id\n    patient {\n      firstName\n      id\n      lastName\n    }\n    status\n    time\n  }\n}\n":
    graphql.Appointment_AppointmentListDocument,
  "\n  mutation UpdateAppointment_AppointmentList($input: AppointmentInput!) {\n  updateAppointment(input: $input) {\n    durationMinutes\n    id\n    status\n    time\n  }\n}\n":
    graphql.UpdateAppointment_AppointmentListDocument,
  "\n  query AppointmentList_AppointmentList(\n  $page: OffsetPageInput\n  $sort: [AppointmentOrderByInput]\n  $filter: AppointmentFilterInput\n) {\n  appointmentList(\n    page: $page\n    sort: $sort\n    filter: $filter\n  ) {\n    content {\n      doctor {\n        firstName\n        id\n        lastName\n        specialty\n      }\n      durationMinutes\n      id\n      patient {\n        firstName\n        id\n        lastName\n      }\n      status\n      time\n    }\n    totalElements\n  }\n}\n":
    graphql.AppointmentList_AppointmentListDocument,
  "\n  mutation DeleteAppointment_AppointmentList($id: ID!) {\n  deleteAppointment(id: $id) \n}\n":
    graphql.DeleteAppointment_AppointmentListDocument,
  "\n  query Doctor_DoctorList($id: ID!) {\n  doctor(id: $id) {\n    firstName\n    id\n    lastName\n    specialty\n  }\n}\n":
    graphql.Doctor_DoctorListDocument,
  "\n  mutation UpdateDoctor_DoctorList($input: DoctorInput!) {\n  updateDoctor(input: $input) {\n    firstName\n    id\n    lastName\n    specialty\n  }\n}\n":
    graphql.UpdateDoctor_DoctorListDocument,
  "\n  query DoctorList_DoctorList(\n  $filter: DoctorFilterInput\n  $sort: [DoctorOrderByInput]\n  $page: OffsetPageInput\n) {\n  doctorList(\n    filter: $filter\n    sort: $sort\n    page: $page\n  ) {\n    content {\n      firstName\n      id\n      lastName\n      specialty\n    }\n    totalElements\n  }\n}\n":
    graphql.DoctorList_DoctorListDocument,
  "\n  mutation DeleteDoctor_DoctorList($id: ID!) {\n  deleteDoctor(id: $id) \n}\n":
    graphql.DeleteDoctor_DoctorListDocument,
  "\n  query DoctorFullList_DoctorFullLookup {\n  doctorFullList {\n    firstName\n    id\n    lastName\n    specialty\n  }\n}\n":
    graphql.DoctorFullList_DoctorFullLookupDocument,
  "\n  query Patient_PatientList($id: ID!) {\n  patient(id: $id) {\n    firstName\n    id\n    lastName\n  }\n}\n":
    graphql.Patient_PatientListDocument,
  "\n  mutation UpdatePatient_PatientList($input: PatientInput!) {\n  updatePatient(input: $input) {\n    firstName\n    id\n    lastName\n  }\n}\n":
    graphql.UpdatePatient_PatientListDocument,
  "\n  query PatientList_PatientList(\n  $filter: PatientFilterInput\n  $sort: [PatientOrderByInput]\n  $page: OffsetPageInput\n) {\n  patientList(\n    filter: $filter\n    sort: $sort\n    page: $page\n  ) {\n    content {\n      firstName\n      id\n      lastName\n    }\n    totalElements\n  }\n}\n":
    graphql.PatientList_PatientListDocument,
  "\n  mutation DeletePatient_PatientList($id: ID!) {\n  deletePatient(id: $id) \n}\n":
    graphql.DeletePatient_PatientListDocument,
  "\n  query PatientFullList_PatientFullLookup {\n  patientFullList {\n    firstName\n    id\n    lastName\n  }\n}\n":
    graphql.PatientFullList_PatientFullLookupDocument,
};

export function gql(
  source: "\n  query Appointment_AppointmentList($id: ID!) {\n  appointment(id: $id) {\n    doctor {\n      firstName\n      id\n      lastName\n      specialty\n    }\n    durationMinutes\n    id\n    patient {\n      firstName\n      id\n      lastName\n    }\n    status\n    time\n  }\n}\n"
): typeof documents["\n  query Appointment_AppointmentList($id: ID!) {\n  appointment(id: $id) {\n    doctor {\n      firstName\n      id\n      lastName\n      specialty\n    }\n    durationMinutes\n    id\n    patient {\n      firstName\n      id\n      lastName\n    }\n    status\n    time\n  }\n}\n"];
export function gql(
  source: "\n  mutation UpdateAppointment_AppointmentList($input: AppointmentInput!) {\n  updateAppointment(input: $input) {\n    durationMinutes\n    id\n    status\n    time\n  }\n}\n"
): typeof documents["\n  mutation UpdateAppointment_AppointmentList($input: AppointmentInput!) {\n  updateAppointment(input: $input) {\n    durationMinutes\n    id\n    status\n    time\n  }\n}\n"];
export function gql(
  source: "\n  query AppointmentList_AppointmentList(\n  $page: OffsetPageInput\n  $sort: [AppointmentOrderByInput]\n  $filter: AppointmentFilterInput\n) {\n  appointmentList(\n    page: $page\n    sort: $sort\n    filter: $filter\n  ) {\n    content {\n      doctor {\n        firstName\n        id\n        lastName\n        specialty\n      }\n      durationMinutes\n      id\n      patient {\n        firstName\n        id\n        lastName\n      }\n      status\n      time\n    }\n    totalElements\n  }\n}\n"
): typeof documents["\n  query AppointmentList_AppointmentList(\n  $page: OffsetPageInput\n  $sort: [AppointmentOrderByInput]\n  $filter: AppointmentFilterInput\n) {\n  appointmentList(\n    page: $page\n    sort: $sort\n    filter: $filter\n  ) {\n    content {\n      doctor {\n        firstName\n        id\n        lastName\n        specialty\n      }\n      durationMinutes\n      id\n      patient {\n        firstName\n        id\n        lastName\n      }\n      status\n      time\n    }\n    totalElements\n  }\n}\n"];
export function gql(
  source: "\n  mutation DeleteAppointment_AppointmentList($id: ID!) {\n  deleteAppointment(id: $id) \n}\n"
): typeof documents["\n  mutation DeleteAppointment_AppointmentList($id: ID!) {\n  deleteAppointment(id: $id) \n}\n"];
export function gql(
  source: "\n  query Doctor_DoctorList($id: ID!) {\n  doctor(id: $id) {\n    firstName\n    id\n    lastName\n    specialty\n  }\n}\n"
): typeof documents["\n  query Doctor_DoctorList($id: ID!) {\n  doctor(id: $id) {\n    firstName\n    id\n    lastName\n    specialty\n  }\n}\n"];
export function gql(
  source: "\n  mutation UpdateDoctor_DoctorList($input: DoctorInput!) {\n  updateDoctor(input: $input) {\n    firstName\n    id\n    lastName\n    specialty\n  }\n}\n"
): typeof documents["\n  mutation UpdateDoctor_DoctorList($input: DoctorInput!) {\n  updateDoctor(input: $input) {\n    firstName\n    id\n    lastName\n    specialty\n  }\n}\n"];
export function gql(
  source: "\n  query DoctorList_DoctorList(\n  $filter: DoctorFilterInput\n  $sort: [DoctorOrderByInput]\n  $page: OffsetPageInput\n) {\n  doctorList(\n    filter: $filter\n    sort: $sort\n    page: $page\n  ) {\n    content {\n      firstName\n      id\n      lastName\n      specialty\n    }\n    totalElements\n  }\n}\n"
): typeof documents["\n  query DoctorList_DoctorList(\n  $filter: DoctorFilterInput\n  $sort: [DoctorOrderByInput]\n  $page: OffsetPageInput\n) {\n  doctorList(\n    filter: $filter\n    sort: $sort\n    page: $page\n  ) {\n    content {\n      firstName\n      id\n      lastName\n      specialty\n    }\n    totalElements\n  }\n}\n"];
export function gql(
  source: "\n  mutation DeleteDoctor_DoctorList($id: ID!) {\n  deleteDoctor(id: $id) \n}\n"
): typeof documents["\n  mutation DeleteDoctor_DoctorList($id: ID!) {\n  deleteDoctor(id: $id) \n}\n"];
export function gql(
  source: "\n  query DoctorFullList_DoctorFullLookup {\n  doctorFullList {\n    firstName\n    id\n    lastName\n    specialty\n  }\n}\n"
): typeof documents["\n  query DoctorFullList_DoctorFullLookup {\n  doctorFullList {\n    firstName\n    id\n    lastName\n    specialty\n  }\n}\n"];
export function gql(
  source: "\n  query Patient_PatientList($id: ID!) {\n  patient(id: $id) {\n    firstName\n    id\n    lastName\n  }\n}\n"
): typeof documents["\n  query Patient_PatientList($id: ID!) {\n  patient(id: $id) {\n    firstName\n    id\n    lastName\n  }\n}\n"];
export function gql(
  source: "\n  mutation UpdatePatient_PatientList($input: PatientInput!) {\n  updatePatient(input: $input) {\n    firstName\n    id\n    lastName\n  }\n}\n"
): typeof documents["\n  mutation UpdatePatient_PatientList($input: PatientInput!) {\n  updatePatient(input: $input) {\n    firstName\n    id\n    lastName\n  }\n}\n"];
export function gql(
  source: "\n  query PatientList_PatientList(\n  $filter: PatientFilterInput\n  $sort: [PatientOrderByInput]\n  $page: OffsetPageInput\n) {\n  patientList(\n    filter: $filter\n    sort: $sort\n    page: $page\n  ) {\n    content {\n      firstName\n      id\n      lastName\n    }\n    totalElements\n  }\n}\n"
): typeof documents["\n  query PatientList_PatientList(\n  $filter: PatientFilterInput\n  $sort: [PatientOrderByInput]\n  $page: OffsetPageInput\n) {\n  patientList(\n    filter: $filter\n    sort: $sort\n    page: $page\n  ) {\n    content {\n      firstName\n      id\n      lastName\n    }\n    totalElements\n  }\n}\n"];
export function gql(
  source: "\n  mutation DeletePatient_PatientList($id: ID!) {\n  deletePatient(id: $id) \n}\n"
): typeof documents["\n  mutation DeletePatient_PatientList($id: ID!) {\n  deletePatient(id: $id) \n}\n"];
export function gql(
  source: "\n  query PatientFullList_PatientFullLookup {\n  patientFullList {\n    firstName\n    id\n    lastName\n  }\n}\n"
): typeof documents["\n  query PatientFullList_PatientFullLookup {\n  patientFullList {\n    firstName\n    id\n    lastName\n  }\n}\n"];

export function gql(source: string): unknown;
export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;