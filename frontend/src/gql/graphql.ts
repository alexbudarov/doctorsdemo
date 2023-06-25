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
  doctorId?: InputMaybe<Scalars["Long"]>;
  doctorLastName?: InputMaybe<Scalars["String"]>;
  patientLastName?: InputMaybe<Scalars["String"]>;
  timeMax?: InputMaybe<Scalars["LocalDateTime"]>;
  timeMin?: InputMaybe<Scalars["LocalDateTime"]>;
};

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
  specialty?: InputMaybe<Specialty>;
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
  deleteSubDistrict?: Maybe<Scalars["Void"]>;
  requestAppointment: AppointmentRequestResult;
  updateDoctor: Doctor;
  updatePatient: Patient;
  updateSubDistrict: SubDistrict;
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

export type MutationDeleteSubDistrictArgs = {
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

export type MutationUpdateSubDistrictArgs = {
  input: SubDistrictInput;
};

export type OffsetPageInput = {
  number: Scalars["Int"];
  size: Scalars["Int"];
};

export type Patient = {
  __typename?: "Patient";
  birthDate?: Maybe<Scalars["Date"]>;
  firstName: Scalars["String"];
  homeAddress?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  lastName: Scalars["String"];
  subDistrict?: Maybe<SubDistrict>;
};

export type PatientFilterInput = {
  birthDateMax?: InputMaybe<Scalars["Date"]>;
  birthDateMin?: InputMaybe<Scalars["Date"]>;
  firstName?: InputMaybe<Scalars["String"]>;
  homeAddress?: InputMaybe<Scalars["String"]>;
  lastName?: InputMaybe<Scalars["String"]>;
};

export type PatientInput = {
  birthDate?: InputMaybe<Scalars["Date"]>;
  firstName: Scalars["String"];
  homeAddress?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  lastName: Scalars["String"];
  subDistrict?: InputMaybe<SubDistrictInput>;
};

export type PatientOrderByInput = {
  direction?: InputMaybe<SortDirection>;
  property?: InputMaybe<PatientOrderByProperty>;
};

export enum PatientOrderByProperty {
  BirthDate = "BIRTH_DATE",
  FirstName = "FIRST_NAME",
  HomeAddress = "HOME_ADDRESS",
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
  doctorList: DoctorResultPage;
  patient: Patient;
  patientList: PatientResultPage;
  subDistrict: SubDistrict;
  subDistrictList?: Maybe<Array<Maybe<SubDistrict>>>;
  userInfo?: Maybe<UserInfo>;
};

export type QueryAppointmentArgs = {
  id: Scalars["ID"];
};

export type QueryAppointmentListArgs = {
  filter?: InputMaybe<AppointmentFilterInput>;
  page?: InputMaybe<OffsetPageInput>;
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

export type QuerySubDistrictArgs = {
  id: Scalars["ID"];
};

export type QuerySubDistrictListArgs = {
  filter?: InputMaybe<SubDistrictFilterInput>;
  sort?: InputMaybe<Array<InputMaybe<SubDistrictOrderByInput>>>;
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

export type SubDistrict = {
  __typename?: "SubDistrict";
  centerLat?: Maybe<Scalars["Float"]>;
  centerLon?: Maybe<Scalars["Float"]>;
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  postcode?: Maybe<Scalars["String"]>;
};

export type SubDistrictFilterInput = {
  centerLatMax?: InputMaybe<Scalars["Float"]>;
  centerLatMin?: InputMaybe<Scalars["Float"]>;
  centerLonMax?: InputMaybe<Scalars["Float"]>;
  centerLonMin?: InputMaybe<Scalars["Float"]>;
  name?: InputMaybe<Scalars["String"]>;
  postcode?: InputMaybe<Scalars["String"]>;
};

export type SubDistrictInput = {
  centerLat?: InputMaybe<Scalars["Float"]>;
  centerLon?: InputMaybe<Scalars["Float"]>;
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  postcode?: InputMaybe<Scalars["String"]>;
};

export type SubDistrictOrderByInput = {
  direction?: InputMaybe<SortDirection>;
  property?: InputMaybe<SubDistrictOrderByProperty>;
};

export enum SubDistrictOrderByProperty {
  CenterLat = "CENTER_LAT",
  CenterLon = "CENTER_LON",
  Name = "NAME",
  Postcode = "POSTCODE",
}

export type UserInfo = {
  __typename?: "UserInfo";
  username?: Maybe<Scalars["String"]>;
};

export type AppointmentList_AppointmentListQueryVariables = Exact<{
  filter?: InputMaybe<AppointmentFilterInput>;
  page?: InputMaybe<OffsetPageInput>;
}>;

export type AppointmentList_AppointmentListQuery = {
  __typename?: "Query";
  appointmentList: {
    __typename?: "AppointmentResultPage";
    totalElements: any;
    content?: Array<{
      __typename?: "Appointment";
      durationMinutes: number;
      endTime?: any | null;
      id?: string | null;
      status?: AppointmentStatus | null;
      time: any;
      doctor?: {
        __typename?: "Doctor";
        firstName: string;
        id?: string | null;
        lastName: string;
        specialty?: Specialty | null;
      } | null;
      patient: {
        __typename?: "Patient";
        birthDate?: any | null;
        firstName: string;
        homeAddress?: string | null;
        id?: string | null;
        lastName: string;
      };
    } | null> | null;
  };
};

export type UpdateDoctorMutationVariables = Exact<{
  input: DoctorInput;
}>;

export type UpdateDoctorMutation = {
  __typename?: "Mutation";
  updateDoctor: {
    __typename?: "Doctor";
    lastName: string;
    firstName: string;
    id?: string | null;
  };
};

export type DoctorQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DoctorQuery = {
  __typename?: "Query";
  doctor: {
    __typename?: "Doctor";
    lastName: string;
    firstName: string;
    id?: string | null;
  };
};

export type AppointmentList_DoctorEditQueryVariables = Exact<{
  doctorId?: InputMaybe<Scalars["Long"]>;
}>;

export type AppointmentList_DoctorEditQuery = {
  __typename?: "Query";
  appointmentList: {
    __typename?: "AppointmentResultPage";
    totalElements: any;
    content?: Array<{
      __typename?: "Appointment";
      durationMinutes: number;
      endTime?: any | null;
      id?: string | null;
      status?: AppointmentStatus | null;
      time: any;
      patient: {
        __typename?: "Patient";
        firstName: string;
        id?: string | null;
        lastName: string;
      };
    } | null> | null;
  };
};

export type DoctorListQueryVariables = Exact<{
  filter?: InputMaybe<DoctorFilterInput>;
  page?: InputMaybe<OffsetPageInput>;
  sort?: InputMaybe<
    Array<InputMaybe<DoctorOrderByInput>> | InputMaybe<DoctorOrderByInput>
  >;
}>;

export type DoctorListQuery = {
  __typename?: "Query";
  doctorList: {
    __typename?: "DoctorResultPage";
    totalElements: any;
    content?: Array<{
      __typename?: "Doctor";
      lastName: string;
      firstName: string;
      id?: string | null;
    } | null> | null;
  };
};

export type DeleteDoctorMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteDoctorMutation = {
  __typename?: "Mutation";
  deleteDoctor?: any | null;
};

export type UpdatePatientMutationVariables = Exact<{
  input: PatientInput;
}>;

export type UpdatePatientMutation = {
  __typename?: "Mutation";
  updatePatient: {
    __typename?: "Patient";
    lastName: string;
    firstName: string;
    id?: string | null;
    birthDate?: any | null;
    homeAddress?: string | null;
    subDistrict?: { __typename?: "SubDistrict"; id?: string | null } | null;
  };
};

export type PatientQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type PatientQuery = {
  __typename?: "Query";
  patient: {
    __typename?: "Patient";
    lastName: string;
    firstName: string;
    id?: string | null;
    birthDate?: any | null;
    homeAddress?: string | null;
    subDistrict?: { __typename?: "SubDistrict"; id?: string | null } | null;
  };
};

export type PatientList_PatientListQueryVariables = Exact<{
  page?: InputMaybe<OffsetPageInput>;
}>;

export type PatientList_PatientListQuery = {
  __typename?: "Query";
  patientList: {
    __typename?: "PatientResultPage";
    totalElements: any;
    content?: Array<{
      __typename?: "Patient";
      birthDate?: any | null;
      firstName: string;
      homeAddress?: string | null;
      id?: string | null;
      lastName: string;
      subDistrict?: {
        __typename?: "SubDistrict";
        id?: string | null;
        name?: string | null;
      } | null;
    } | null> | null;
  };
  subDistrictList?: Array<{
    __typename?: "SubDistrict";
    id?: string | null;
    name?: string | null;
  } | null> | null;
};

export type PatientListQueryVariables = Exact<{
  filter?: InputMaybe<PatientFilterInput>;
  page?: InputMaybe<OffsetPageInput>;
  sort?: InputMaybe<
    Array<InputMaybe<PatientOrderByInput>> | InputMaybe<PatientOrderByInput>
  >;
}>;

export type PatientListQuery = {
  __typename?: "Query";
  patientList: {
    __typename?: "PatientResultPage";
    totalElements: any;
    content?: Array<{
      __typename?: "Patient";
      birthDate?: any | null;
      firstName: string;
      homeAddress?: string | null;
      id?: string | null;
      lastName: string;
      subDistrict?: {
        __typename?: "SubDistrict";
        id?: string | null;
        name?: string | null;
      } | null;
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

export type UpdateSubDistrictMutationVariables = Exact<{
  input: SubDistrictInput;
}>;

export type UpdateSubDistrictMutation = {
  __typename?: "Mutation";
  updateSubDistrict: {
    __typename?: "SubDistrict";
    centerLon?: number | null;
    postcode?: string | null;
    name?: string | null;
    id?: string | null;
    centerLat?: number | null;
  };
};

export type SubDistrictQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type SubDistrictQuery = {
  __typename?: "Query";
  subDistrict: {
    __typename?: "SubDistrict";
    centerLon?: number | null;
    postcode?: string | null;
    name?: string | null;
    id?: string | null;
    centerLat?: number | null;
  };
};

export type SubDistrictList_SubDistrictListQueryVariables = Exact<{
  filter?: InputMaybe<SubDistrictFilterInput>;
}>;

export type SubDistrictList_SubDistrictListQuery = {
  __typename?: "Query";
  subDistrictList?: Array<{
    __typename?: "SubDistrict";
    centerLat?: number | null;
    centerLon?: number | null;
    id?: string | null;
    name?: string | null;
    postcode?: string | null;
  } | null> | null;
};

export type SubDistrictListQueryVariables = Exact<{
  filter?: InputMaybe<SubDistrictFilterInput>;
  sort?: InputMaybe<
    | Array<InputMaybe<SubDistrictOrderByInput>>
    | InputMaybe<SubDistrictOrderByInput>
  >;
}>;

export type SubDistrictListQuery = {
  __typename?: "Query";
  subDistrictList?: Array<{
    __typename?: "SubDistrict";
    centerLon?: number | null;
    postcode?: string | null;
    name?: string | null;
    id?: string | null;
    centerLat?: number | null;
  } | null> | null;
};

export type DeleteSubDistrictMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteSubDistrictMutation = {
  __typename?: "Mutation";
  deleteSubDistrict?: any | null;
};

export const AppointmentList_AppointmentListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AppointmentList_AppointmentList" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "filter" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "AppointmentFilterInput" },
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
            name: { kind: "Name", value: "appointmentList" },
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
                        name: { kind: "Name", value: "doctor" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "firstName" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "lastName" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "specialty" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "durationMinutes" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "endTime" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "patient" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "birthDate" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "firstName" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "homeAddress" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "lastName" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "status" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "time" } },
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
} as unknown as DocumentNode<
  AppointmentList_AppointmentListQuery,
  AppointmentList_AppointmentListQueryVariables
>;
export const UpdateDoctorDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateDoctor" },
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
              name: { kind: "Name", value: "DoctorInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateDoctor" },
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
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateDoctorMutation,
  UpdateDoctorMutationVariables
>;
export const DoctorDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Doctor" },
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
            name: { kind: "Name", value: "doctor" },
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
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DoctorQuery, DoctorQueryVariables>;
export const AppointmentList_DoctorEditDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AppointmentList_DoctorEdit" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "doctorId" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Long" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "appointmentList" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "doctorId" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "doctorId" },
                      },
                    },
                  ],
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
                        name: { kind: "Name", value: "durationMinutes" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "endTime" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "patient" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "firstName" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "lastName" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "status" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "time" } },
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
} as unknown as DocumentNode<
  AppointmentList_DoctorEditQuery,
  AppointmentList_DoctorEditQueryVariables
>;
export const DoctorListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "DoctorList" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "filter" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DoctorFilterInput" },
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
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "sort" } },
          type: {
            kind: "ListType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "DoctorOrderByInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "doctorList" },
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
                name: { kind: "Name", value: "page" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "page" },
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
                        name: { kind: "Name", value: "lastName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "firstName" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
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
} as unknown as DocumentNode<DoctorListQuery, DoctorListQueryVariables>;
export const DeleteDoctorDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteDoctor" },
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
            name: { kind: "Name", value: "deleteDoctor" },
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
  DeleteDoctorMutation,
  DeleteDoctorMutationVariables
>;
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
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "subDistrict" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "birthDate" } },
                { kind: "Field", name: { kind: "Name", value: "homeAddress" } },
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
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "subDistrict" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "birthDate" } },
                { kind: "Field", name: { kind: "Name", value: "homeAddress" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PatientQuery, PatientQueryVariables>;
export const PatientList_PatientListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PatientList_PatientList" },
      variableDefinitions: [
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
                        name: { kind: "Name", value: "birthDate" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "firstName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "homeAddress" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "subDistrict" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
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
          {
            kind: "Field",
            name: { kind: "Name", value: "subDistrictList" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  PatientList_PatientListQuery,
  PatientList_PatientListQueryVariables
>;
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
          variable: { kind: "Variable", name: { kind: "Name", value: "page" } },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "OffsetPageInput" },
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
                name: { kind: "Name", value: "page" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "page" },
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
                        name: { kind: "Name", value: "birthDate" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "firstName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "homeAddress" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "subDistrict" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
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
export const UpdateSubDistrictDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateSubDistrict" },
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
              name: { kind: "Name", value: "SubDistrictInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateSubDistrict" },
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
                { kind: "Field", name: { kind: "Name", value: "centerLon" } },
                { kind: "Field", name: { kind: "Name", value: "postcode" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "centerLat" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateSubDistrictMutation,
  UpdateSubDistrictMutationVariables
>;
export const SubDistrictDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "SubDistrict" },
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
            name: { kind: "Name", value: "subDistrict" },
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
                { kind: "Field", name: { kind: "Name", value: "centerLon" } },
                { kind: "Field", name: { kind: "Name", value: "postcode" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "centerLat" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SubDistrictQuery, SubDistrictQueryVariables>;
export const SubDistrictList_SubDistrictListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "SubDistrictList_SubDistrictList" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "filter" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "SubDistrictFilterInput" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "subDistrictList" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "filter" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "centerLat" } },
                { kind: "Field", name: { kind: "Name", value: "centerLon" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "postcode" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SubDistrictList_SubDistrictListQuery,
  SubDistrictList_SubDistrictListQueryVariables
>;
export const SubDistrictListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "SubDistrictList" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "filter" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "SubDistrictFilterInput" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "sort" } },
          type: {
            kind: "ListType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "SubDistrictOrderByInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "subDistrictList" },
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
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "centerLon" } },
                { kind: "Field", name: { kind: "Name", value: "postcode" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "centerLat" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SubDistrictListQuery,
  SubDistrictListQueryVariables
>;
export const DeleteSubDistrictDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteSubDistrict" },
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
            name: { kind: "Name", value: "deleteSubDistrict" },
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
  DeleteSubDistrictMutation,
  DeleteSubDistrictMutationVariables
>;
