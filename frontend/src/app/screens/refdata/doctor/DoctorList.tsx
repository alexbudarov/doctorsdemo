import { gql } from "@amplicode/gql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { Datagrid, DeleteButton, EditButton, List, TextField, TextInput } from "react-admin";

const DOCTOR_LIST =
  gql(`query DoctorList($filter : DoctorFilterInput, $page : OffsetPageInput, $sort : [DoctorOrderByInput]) {
doctorList(filter : $filter, page : $page, sort : $sort) {
content {
	lastName
	firstName
	id
}
totalElements
}
}`);

const DELETE_DOCTOR = gql(`mutation DeleteDoctor($id : ID!) {
deleteDoctor(id : $id)
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
    <TextInput source="lastName" name="lastName" />,
    <TextInput source="firstName" name="firstName" />,
    <TextInput source="specialty" name="specialty" />,
  ];

  return (
    <List<ItemType> queryOptions={queryOptions} exporter={false} filters={filters}>
      <Datagrid rowClick="show">
        <TextField source="id" sortable={false} />

        <TextField source="lastName" />
        <TextField source="firstName" />

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
