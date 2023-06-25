import { gql } from "@amplicode/gql";
import { Patient } from "@amplicode/gql/graphql";
import { ResultOf } from "@graphql-typed-document-node/core";
import {
  Datagrid,
  DateInput,
  DeleteButton,
  EditButton,
  FunctionField,
  List,
  TextField,
  TextInput,
} from "react-admin";
import { renderDate } from "../../../../core/format/renderDate";
import { getSubDistrictRecordRepresentation } from "../../../../core/record-representation/getSubDistrictRecordRepresentation";

const PATIENT_LIST =
  gql(`query PatientList(
    $filter: PatientFilterInput,
    $page: OffsetPageInput,
    $sort: [PatientOrderByInput]
) {
    patientList(
        filter: $filter,
        page: $page,
        sort: $sort
) {
        content {
            birthDate
            firstName
            homeAddress
            id
            lastName
            subDistrict {
                id
                name
            }
        }
        totalElements
    }
}`);

const DELETE_PATIENT = gql(`mutation DeletePatient($id : ID!) {
deletePatient(id : $id)
}`);

export const PatientListBackup = () => {
  const queryOptions = {
    meta: {
      query: PATIENT_LIST,
      resultDataPath: "content",
      paginationQueryParam: "page",
    },
  };

  const filters = [
    <TextInput source="lastName" name="lastName" />,
    <TextInput source="firstName" name="firstName" />,
    <DateInput source="birthDateMax" name="birthDateMax" />,
    <DateInput source="birthDateMin" name="birthDateMin" />,
    <TextInput source="homeAddress" name="homeAddress" />,
  ];

  return (
    <List<ItemType> queryOptions={queryOptions} exporter={false} filters={filters}>
      <Datagrid rowClick="show">
        <TextField source="id" sortable={false} />

        <TextField source="lastName" sortable={false} />
        <TextField source="firstName" sortable={false} />
        <FunctionField
          label="Sub District"
          render={(record: Patient) => getSubDistrictRecordRepresentation(record.subDistrict)}
          sortable={false}
        />
        <FunctionField
          source="birthDate"
          render={(record: Patient) => renderDate(record.birthDate)}
        />
        <TextField source="homeAddress" sortable={false} />

        <EditButton />
        <DeleteButton
          mutationMode="pessimistic"
          mutationOptions={{ meta: { mutation: DELETE_PATIENT } }}
        />
      </Datagrid>
    </List>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof PATIENT_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["patientList"];
/**
 * Type of single item
 */
type ItemType = { id: string } & Exclude<
  Exclude<ItemListType, null | undefined>["content"],
  undefined
>;
