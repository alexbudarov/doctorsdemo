import { gql } from "@amplicode/gql";
import { Specialty } from "@amplicode/gql/graphql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { Datagrid, DeleteButton, EditButton, List, TextField, TextInput } from "react-admin";
import { EnumField } from "../../../core/fields/EnumField";

const DOCTOR_LIST = gql(`query DoctorList(
  $page: OffsetPageInput
  $sort: [DoctorOrderByInput]
  $filter: DoctorFilterInput
) {
  doctorList(
    page: $page
    sort: $sort
    filter: $filter
  ) {
    content {
      firstName
      id
      lastName
      specialty
    }
    totalElements
  }
}`);

const DELETE_DOCTOR = gql(`mutation DeleteDoctor($id: ID!) {
  deleteDoctor(id: $id) 
}`);

export const DoctorList = () => {
  const queryOptions = {
    meta: {
      query: DOCTOR_LIST,
      resultDataPath: "content",
      paginationQueryParam: "page",
    },
  };

  const filters = [
    <TextInput source="firstName" name="firstName" />,
    <TextInput source="lastName" name="lastName" />,
    <TextInput source="specialty" name="specialty" />,
  ];

  return (
    <List<ItemType> queryOptions={queryOptions} exporter={false} filters={filters}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="id" sortable={false} />

        <TextField source="firstName" sortable={false} />
        <TextField source="lastName" />
        <EnumField source="specialty" enumTypeName="Specialty" enum={Specialty} sortable={false} />

        <EditButton />
        <DeleteButton
          mutationMode="pessimistic"
          mutationOptions={{ meta: { mutation: DELETE_DOCTOR } }}
        />
      </Datagrid>
    </List>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof DOCTOR_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["doctorList"];
/**
 * Type of single item
 */
type ItemType = { id: string } & Exclude<
  Exclude<ItemListType, null | undefined>["content"],
  undefined
>;
