/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInteger: any;
  Date: any;
  DateTime: any;
  LocalDateTime: any;
  LocalTime: any;
  Long: any;
  Time: any;
  Timestamp: any;
  Url: any;
  Void: any;
};

export type Appointment = {
  __typename?: "Appointment";
  doctor?: Maybe<Doctor>;
  durationMinutes: Scalars["Int"];
  endTime?: Maybe<Scalars["LocalDateTime"]>;
  id?: Maybe<Scalars["ID"]>;
  patient: Patient;
  status?: Maybe<AppointmentStatus>;
  time: Scalars["LocalDateTime"];
};

export type AppointmentFilterInput = {
  doctorLastName?: InputMaybe<Scalars["String"]>;
  patientLastName?: InputMaybe<Scalars["String"]>;
  timeMax?: InputMaybe<Scalars["LocalDateTime"]>;
  timeMin?: InputMaybe<Scalars["LocalDateTime"]>;
};

export type AppointmentOrderByInput = {
  direction?: InputMaybe<SortDirection>;
  property?: InputMaybe<AppointmentOrderByProperty>;
};

export enum AppointmentOrderByProperty {
  DoctorFirstName = "DOCTOR_FIRST_NAME",
  PatientFirstName = "PATIENT_FIRST_NAME",
  Time = "TIME",
}

export type AppointmentRequestInput = {
  doctorId: Scalars["ID"];
  durationMinutes: Scalars["Int"];
  patientId: Scalars["ID"];
  time: Scalars["LocalDateTime"];
};

export type AppointmentRequestResult = {
  __typename?: "AppointmentRequestResult";
  appointment?: Maybe<Appointment>;
  reserved: Scalars["Boolean"];
};

export type AppointmentResultPage = {
  __typename?: "AppointmentResultPage";
  content?: Maybe<Array<Maybe<Appointment>>>;
  totalElements: Scalars["Long"];
};

export enum AppointmentStatus {
  Cancelled = "CANCELLED",
  Finished = "FINISHED",
  InProgress = "IN_PROGRESS",
  Missed = "MISSED",
  Pending = "PENDING",
}

export type Doctor = {
  __typename?: "Doctor";
  firstName: Scalars["String"];
  id?: Maybe<Scalars["ID"]>;
  lastName: Scalars["String"];
  specialty?: Maybe<Specialty>;
};

export type DoctorFilterInput = {
  firstName?: InputMaybe<Scalars["String"]>;
  lastName?: InputMaybe<Scalars["String"]>;
};

export type DoctorInput = {
  firstName: Scalars["String"];
  id?: InputMaybe<Scalars["ID"]>;
  lastName: Scalars["String"];
  specialty?: InputMaybe<Specialty>;
};

export type DoctorOrderByInput = {
  direction?: InputMaybe<SortDirection>;
  property?: InputMaybe<DoctorOrderByProperty>;
};

export enum DoctorOrderByProperty {
  FirstName = "FIRST_NAME",
  LastName = "LAST_NAME",
}

export type DoctorResultPage = {
  __typename?: "DoctorResultPage";
  content?: Maybe<Array<Maybe<Doctor>>>;
  totalElements: Scalars["Long"];
};

export type Mutation = {
  __typename?: "Mutation";
  cancelAppointment?: Maybe<Scalars["Void"]>;
  deleteDoctor?: Maybe<Scalars["Void"]>;
  deletePatient?: Maybe<Scalars["Void"]>;
  requestAppointment: AppointmentRequestResult;
  updateDoctor: Doctor;
  updatePatient: Patient;
};

export type MutationCancelAppointmentArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteDoctorArgs = {
  id: Scalars["ID"];
};

export type MutationDeletePatientArgs = {
  id: Scalars["ID"];
};

export type MutationRequestAppointmentArgs = {
  request: AppointmentRequestInput;
};

export type MutationUpdateDoctorArgs = {
  input: DoctorInput;
};

export type MutationUpdatePatientArgs = {
  input: PatientInput;
};

export type OffsetPageInput = {
  number: Scalars["Int"];
  size: Scalars["Int"];
};

export type Patient = {
  __typename?: "Patient";
  firstName: Scalars["String"];
  id?: Maybe<Scalars["ID"]>;
  lastName: Scalars["String"];
};

export type PatientFilterInput = {
  firstName?: InputMaybe<Scalars["String"]>;
  lastName?: InputMaybe<Scalars["String"]>;
};

export type PatientInput = {
  firstName: Scalars["String"];
  id?: InputMaybe<Scalars["ID"]>;
  lastName: Scalars["String"];
};

export type PatientOrderByInput = {
  direction?: InputMaybe<SortDirection>;
  property?: InputMaybe<PatientOrderByProperty>;
};

export enum PatientOrderByProperty {
  FirstName = "FIRST_NAME",
  LastName = "LAST_NAME",
}

export type PatientResultPage = {
  __typename?: "PatientResultPage";
  content?: Maybe<Array<Maybe<Patient>>>;
  totalElements: Scalars["Long"];
};

export type Query = {
  __typename?: "Query";
  appointment: Appointment;
  appointmentList: AppointmentResultPage;
  doctor: Doctor;
  doctorFullList: Array<Maybe<Doctor>>;
  doctorList: DoctorResultPage;
  patient: Patient;
  patientFullList: Array<Maybe<Patient>>;
  patientList: PatientResultPage;
  userInfo?: Maybe<UserInfo>;
};

export type QueryAppointmentArgs = {
  id: Scalars["ID"];
};

export type QueryAppointmentListArgs = {
  filter?: InputMaybe<AppointmentFilterInput>;
  page?: InputMaybe<OffsetPageInput>;
  sort?: InputMaybe<Array<InputMaybe<AppointmentOrderByInput>>>;
};

export type QueryDoctorArgs = {
  id: Scalars["ID"];
};

export type QueryDoctorListArgs = {
  filter?: InputMaybe<DoctorFilterInput>;
  page?: InputMaybe<OffsetPageInput>;
  sort?: InputMaybe<Array<InputMaybe<DoctorOrderByInput>>>;
};

export type QueryPatientArgs = {
  id: Scalars["ID"];
};

export type QueryPatientListArgs = {
  filter?: InputMaybe<PatientFilterInput>;
  page?: InputMaybe<OffsetPageInput>;
  sort?: InputMaybe<Array<InputMaybe<PatientOrderByInput>>>;
};

export enum SortDirection {
  Asc = "ASC",
  Desc = "DESC",
}

export enum Specialty {
  AllergyAndImmunology = "ALLERGY_AND_IMMUNOLOGY",
  Dermatology = "DERMATOLOGY",
  Gp = "GP",
  Neurology = "NEUROLOGY",
  Ophthalmology = "OPHTHALMOLOGY",
  Psychiatry = "PSYCHIATRY",
}

export type UserInfo = {
  __typename?: "UserInfo";
  username?: Maybe<Scalars["String"]>;
};

export type UpdatePatientMutationVariables = Exact<{
  input: PatientInput;
}>;

export type UpdatePatientMutation = {
  __typename?: "Mutation";
  updatePatient: {
    __typename?: "Patient";
    firstName: string;
    id?: string | null;
    lastName: string;
  };
};

export type PatientQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type PatientQuery = {
  __typename?: "Query";
  patient: {
    __typename?: "Patient";
    firstName: string;
    id?: string | null;
    lastName: string;
  };
};

export type PatientListQueryVariables = Exact<{
  filter?: InputMaybe<PatientFilterInput>;
  sort?: InputMaybe<
    Array<InputMaybe<PatientOrderByInput>> | InputMaybe<PatientOrderByInput>
  >;
  page?: InputMaybe<OffsetPageInput>;
}>;

export type PatientListQuery = {
  __typename?: "Query";
  patientList: {
    __typename?: "PatientResultPage";
    totalElements: any;
    content?: Array<{
      __typename?: "Patient";
      firstName: string;
      id?: string | null;
      lastName: string;
    } | null> | null;
  };
};

export type DeletePatientMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeletePatientMutation = {
  __typename?: "Mutation";
  deletePatient?: any | null;
};

export const UpdatePatientDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdatePatient" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "PatientInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updatePatient" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdatePatientMutation,
  UpdatePatientMutationVariables
>;
export const PatientDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Patient" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "patient" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PatientQuery, PatientQueryVariables>;
export const PatientListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PatientList" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "filter" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "PatientFilterInput" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "sort" } },
          type: {
            kind: "ListType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "PatientOrderByInput" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "page" } },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "OffsetPageInput" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "patientList" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "filter" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "sort" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "sort" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "page" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "page" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "content" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "firstName" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastName" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "totalElements" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PatientListQuery, PatientListQueryVariables>;
export const DeletePatientDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeletePatient" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deletePatient" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeletePatientMutation,
  DeletePatientMutationVariables
>;
