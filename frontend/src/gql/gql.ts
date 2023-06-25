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
  "query AppointmentList_AppointmentList(\n  $filter: AppointmentFilterInput\n  $page: OffsetPageInput\n) {\n  appointmentList(\n    filter: $filter\n    page: $page\n  ) {\n    content {\n      doctor {\n        firstName\n        id\n        lastName\n        specialty\n      }\n      durationMinutes\n      endTime\n      id\n      patient {\n        birthDate\n        firstName\n        homeAddress\n        id\n        lastName\n      }\n      status\n      time\n    }\n    totalElements\n  }\n}":
    types.AppointmentList_AppointmentListDocument,
  "mutation UpdateDoctor($input : DoctorInput!) {\nupdateDoctor(input : $input) {\nlastName\nfirstName\nid\n}\n}":
    types.UpdateDoctorDocument,
  "query Doctor($id : ID!) {\ndoctor(id : $id) {\nlastName\nfirstName\nid\n}\n}":
    types.DoctorDocument,
  "\nquery AppointmentList_DoctorEdit($doctorId: Long) {\n    appointmentList(filter: {\n        doctorId: $doctorId\n    }) {\n        content {\n            durationMinutes\n            endTime\n            id\n            patient {\n                firstName\n                id\n                lastName\n            }\n            status\n            time\n        }\n        totalElements\n    }\n}\n":
    types.AppointmentList_DoctorEditDocument,
  "query DoctorList($filter : DoctorFilterInput, $page : OffsetPageInput, $sort : [DoctorOrderByInput]) {\ndoctorList(filter : $filter, page : $page, sort : $sort) {\ncontent {\n\tlastName\n\tfirstName\n\tid\n}\ntotalElements\n}\n}":
    types.DoctorListDocument,
  "mutation DeleteDoctor($id : ID!) {\ndeleteDoctor(id : $id)\n}":
    types.DeleteDoctorDocument,
  "mutation UpdatePatient($input : PatientInput!) {\nupdatePatient(input : $input) {\nlastName\nfirstName\nid\nsubDistrict {\n\tid\n}\nbirthDate\nhomeAddress\n}\n}":
    types.UpdatePatientDocument,
  "query Patient($id : ID!) {\npatient(id : $id) {\nlastName\nfirstName\nid\nsubDistrict {\n\tid\n}\nbirthDate\nhomeAddress\n}\n}":
    types.PatientDocument,
  "\nquery PatientList_PatientList($page: OffsetPageInput) {\n    patientList(page: $page) {\n        content {\n            birthDate\n            firstName\n            homeAddress\n            id\n            lastName\n            subDistrict {\n                id\n                name\n            }\n        }\n        totalElements\n    }\n    subDistrictList {\n        id\n        name\n    }\n}\n":
    types.PatientList_PatientListDocument,
  "query PatientList(\n    $filter: PatientFilterInput,\n    $page: OffsetPageInput,\n    $sort: [PatientOrderByInput]\n) {\n    patientList(\n        filter: $filter,\n        page: $page,\n        sort: $sort\n) {\n        content {\n            birthDate\n            firstName\n            homeAddress\n            id\n            lastName\n            subDistrict {\n                id\n                name\n            }\n        }\n        totalElements\n    }\n}":
    types.PatientListDocument,
  "mutation DeletePatient($id : ID!) {\ndeletePatient(id : $id)\n}":
    types.DeletePatientDocument,
  "mutation UpdateSubDistrict($input : SubDistrictInput!) {\nupdateSubDistrict(input : $input) {\ncenterLon\npostcode\nname\nid\ncenterLat\n}\n}":
    types.UpdateSubDistrictDocument,
  "query SubDistrict($id : ID!) {\nsubDistrict(id : $id) {\ncenterLon\npostcode\nname\nid\ncenterLat\n}\n}":
    types.SubDistrictDocument,
  "\nquery SubDistrictList_SubDistrictList($filter: SubDistrictFilterInput) {\n    subDistrictList(filter: $filter) {\n        centerLat\n        centerLon\n        id\n        name\n        postcode\n    }\n}\n":
    types.SubDistrictList_SubDistrictListDocument,
  "query SubDistrictList($filter : SubDistrictFilterInput, $sort : [SubDistrictOrderByInput]) {\nsubDistrictList(filter : $filter, sort : $sort) {\ncenterLon\npostcode\nname\nid\ncenterLat\n}\n}":
    types.SubDistrictListDocument,
  "mutation DeleteSubDistrict($id : ID!) {\ndeleteSubDistrict(id : $id)\n}":
    types.DeleteSubDistrictDocument,
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
  source: "query AppointmentList_AppointmentList(\n  $filter: AppointmentFilterInput\n  $page: OffsetPageInput\n) {\n  appointmentList(\n    filter: $filter\n    page: $page\n  ) {\n    content {\n      doctor {\n        firstName\n        id\n        lastName\n        specialty\n      }\n      durationMinutes\n      endTime\n      id\n      patient {\n        birthDate\n        firstName\n        homeAddress\n        id\n        lastName\n      }\n      status\n      time\n    }\n    totalElements\n  }\n}"
): (typeof documents)["query AppointmentList_AppointmentList(\n  $filter: AppointmentFilterInput\n  $page: OffsetPageInput\n) {\n  appointmentList(\n    filter: $filter\n    page: $page\n  ) {\n    content {\n      doctor {\n        firstName\n        id\n        lastName\n        specialty\n      }\n      durationMinutes\n      endTime\n      id\n      patient {\n        birthDate\n        firstName\n        homeAddress\n        id\n        lastName\n      }\n      status\n      time\n    }\n    totalElements\n  }\n}"];
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
  source: "\nquery AppointmentList_DoctorEdit($doctorId: Long) {\n    appointmentList(filter: {\n        doctorId: $doctorId\n    }) {\n        content {\n            durationMinutes\n            endTime\n            id\n            patient {\n                firstName\n                id\n                lastName\n            }\n            status\n            time\n        }\n        totalElements\n    }\n}\n"
): (typeof documents)["\nquery AppointmentList_DoctorEdit($doctorId: Long) {\n    appointmentList(filter: {\n        doctorId: $doctorId\n    }) {\n        content {\n            durationMinutes\n            endTime\n            id\n            patient {\n                firstName\n                id\n                lastName\n            }\n            status\n            time\n        }\n        totalElements\n    }\n}\n"];
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
  source: "mutation UpdatePatient($input : PatientInput!) {\nupdatePatient(input : $input) {\nlastName\nfirstName\nid\nsubDistrict {\n\tid\n}\nbirthDate\nhomeAddress\n}\n}"
): (typeof documents)["mutation UpdatePatient($input : PatientInput!) {\nupdatePatient(input : $input) {\nlastName\nfirstName\nid\nsubDistrict {\n\tid\n}\nbirthDate\nhomeAddress\n}\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query Patient($id : ID!) {\npatient(id : $id) {\nlastName\nfirstName\nid\nsubDistrict {\n\tid\n}\nbirthDate\nhomeAddress\n}\n}"
): (typeof documents)["query Patient($id : ID!) {\npatient(id : $id) {\nlastName\nfirstName\nid\nsubDistrict {\n\tid\n}\nbirthDate\nhomeAddress\n}\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nquery PatientList_PatientList($page: OffsetPageInput) {\n    patientList(page: $page) {\n        content {\n            birthDate\n            firstName\n            homeAddress\n            id\n            lastName\n            subDistrict {\n                id\n                name\n            }\n        }\n        totalElements\n    }\n    subDistrictList {\n        id\n        name\n    }\n}\n"
): (typeof documents)["\nquery PatientList_PatientList($page: OffsetPageInput) {\n    patientList(page: $page) {\n        content {\n            birthDate\n            firstName\n            homeAddress\n            id\n            lastName\n            subDistrict {\n                id\n                name\n            }\n        }\n        totalElements\n    }\n    subDistrictList {\n        id\n        name\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query PatientList(\n    $filter: PatientFilterInput,\n    $page: OffsetPageInput,\n    $sort: [PatientOrderByInput]\n) {\n    patientList(\n        filter: $filter,\n        page: $page,\n        sort: $sort\n) {\n        content {\n            birthDate\n            firstName\n            homeAddress\n            id\n            lastName\n            subDistrict {\n                id\n                name\n            }\n        }\n        totalElements\n    }\n}"
): (typeof documents)["query PatientList(\n    $filter: PatientFilterInput,\n    $page: OffsetPageInput,\n    $sort: [PatientOrderByInput]\n) {\n    patientList(\n        filter: $filter,\n        page: $page,\n        sort: $sort\n) {\n        content {\n            birthDate\n            firstName\n            homeAddress\n            id\n            lastName\n            subDistrict {\n                id\n                name\n            }\n        }\n        totalElements\n    }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation DeletePatient($id : ID!) {\ndeletePatient(id : $id)\n}"
): (typeof documents)["mutation DeletePatient($id : ID!) {\ndeletePatient(id : $id)\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation UpdateSubDistrict($input : SubDistrictInput!) {\nupdateSubDistrict(input : $input) {\ncenterLon\npostcode\nname\nid\ncenterLat\n}\n}"
): (typeof documents)["mutation UpdateSubDistrict($input : SubDistrictInput!) {\nupdateSubDistrict(input : $input) {\ncenterLon\npostcode\nname\nid\ncenterLat\n}\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query SubDistrict($id : ID!) {\nsubDistrict(id : $id) {\ncenterLon\npostcode\nname\nid\ncenterLat\n}\n}"
): (typeof documents)["query SubDistrict($id : ID!) {\nsubDistrict(id : $id) {\ncenterLon\npostcode\nname\nid\ncenterLat\n}\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nquery SubDistrictList_SubDistrictList($filter: SubDistrictFilterInput) {\n    subDistrictList(filter: $filter) {\n        centerLat\n        centerLon\n        id\n        name\n        postcode\n    }\n}\n"
): (typeof documents)["\nquery SubDistrictList_SubDistrictList($filter: SubDistrictFilterInput) {\n    subDistrictList(filter: $filter) {\n        centerLat\n        centerLon\n        id\n        name\n        postcode\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query SubDistrictList($filter : SubDistrictFilterInput, $sort : [SubDistrictOrderByInput]) {\nsubDistrictList(filter : $filter, sort : $sort) {\ncenterLon\npostcode\nname\nid\ncenterLat\n}\n}"
): (typeof documents)["query SubDistrictList($filter : SubDistrictFilterInput, $sort : [SubDistrictOrderByInput]) {\nsubDistrictList(filter : $filter, sort : $sort) {\ncenterLon\npostcode\nname\nid\ncenterLat\n}\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation DeleteSubDistrict($id : ID!) {\ndeleteSubDistrict(id : $id)\n}"
): (typeof documents)["mutation DeleteSubDistrict($id : ID!) {\ndeleteSubDistrict(id : $id)\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
