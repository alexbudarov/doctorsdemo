/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "mutation UpdateDoctor($input : DoctorInput!) {\nupdateDoctor(input : $input) {\nlastName\nfirstName\nid\n}\n}":
    types.UpdateDoctorDocument,
  "query Doctor($id : ID!) {\ndoctor(id : $id) {\nlastName\nfirstName\nid\n}\n}":
    types.DoctorDocument,
  "query DoctorList($filter : DoctorFilterInput, $page : OffsetPageInput, $sort : [DoctorOrderByInput]) {\ndoctorList(filter : $filter, page : $page, sort : $sort) {\ncontent {\n\tlastName\n\tfirstName\n\tid\n}\ntotalElements\n}\n}":
    types.DoctorListDocument,
  "mutation DeleteDoctor($id : ID!) {\ndeleteDoctor(id : $id)\n}":
    types.DeleteDoctorDocument,
  "mutation UpdatePatient($input: PatientInput!) {\n  updatePatient(input: $input) {\n    firstName\n    id\n    lastName\n  }\n}":
    types.UpdatePatientDocument,
  "query Patient($id: ID!) {\n  patient(id: $id) {\n    firstName\n    id\n    lastName\n  }\n}":
    types.PatientDocument,
  "query PatientList(\n  $filter: PatientFilterInput\n  $sort: [PatientOrderByInput]\n  $page: OffsetPageInput\n) {\n  patientList(\n    filter: $filter\n    sort: $sort\n    page: $page\n  ) {\n    content {\n      firstName\n      id\n      lastName\n    }\n    totalElements\n  }\n}":
    types.PatientListDocument,
  "mutation DeletePatient($id: ID!) {\n  deletePatient(id: $id) \n}":
    types.DeletePatientDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation UpdateDoctor($input : DoctorInput!) {\nupdateDoctor(input : $input) {\nlastName\nfirstName\nid\n}\n}"
): (typeof documents)["mutation UpdateDoctor($input : DoctorInput!) {\nupdateDoctor(input : $input) {\nlastName\nfirstName\nid\n}\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query Doctor($id : ID!) {\ndoctor(id : $id) {\nlastName\nfirstName\nid\n}\n}"
): (typeof documents)["query Doctor($id : ID!) {\ndoctor(id : $id) {\nlastName\nfirstName\nid\n}\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query DoctorList($filter : DoctorFilterInput, $page : OffsetPageInput, $sort : [DoctorOrderByInput]) {\ndoctorList(filter : $filter, page : $page, sort : $sort) {\ncontent {\n\tlastName\n\tfirstName\n\tid\n}\ntotalElements\n}\n}"
): (typeof documents)["query DoctorList($filter : DoctorFilterInput, $page : OffsetPageInput, $sort : [DoctorOrderByInput]) {\ndoctorList(filter : $filter, page : $page, sort : $sort) {\ncontent {\n\tlastName\n\tfirstName\n\tid\n}\ntotalElements\n}\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation DeleteDoctor($id : ID!) {\ndeleteDoctor(id : $id)\n}"
): (typeof documents)["mutation DeleteDoctor($id : ID!) {\ndeleteDoctor(id : $id)\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation UpdatePatient($input: PatientInput!) {\n  updatePatient(input: $input) {\n    firstName\n    id\n    lastName\n  }\n}"
): (typeof documents)["mutation UpdatePatient($input: PatientInput!) {\n  updatePatient(input: $input) {\n    firstName\n    id\n    lastName\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query Patient($id: ID!) {\n  patient(id: $id) {\n    firstName\n    id\n    lastName\n  }\n}"
): (typeof documents)["query Patient($id: ID!) {\n  patient(id: $id) {\n    firstName\n    id\n    lastName\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query PatientList(\n  $filter: PatientFilterInput\n  $sort: [PatientOrderByInput]\n  $page: OffsetPageInput\n) {\n  patientList(\n    filter: $filter\n    sort: $sort\n    page: $page\n  ) {\n    content {\n      firstName\n      id\n      lastName\n    }\n    totalElements\n  }\n}"
): (typeof documents)["query PatientList(\n  $filter: PatientFilterInput\n  $sort: [PatientOrderByInput]\n  $page: OffsetPageInput\n) {\n  patientList(\n    filter: $filter\n    sort: $sort\n    page: $page\n  ) {\n    content {\n      firstName\n      id\n      lastName\n    }\n    totalElements\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation DeletePatient($id: ID!) {\n  deletePatient(id: $id) \n}"
): (typeof documents)["mutation DeletePatient($id: ID!) {\n  deletePatient(id: $id) \n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
