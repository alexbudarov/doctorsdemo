import { gql } from "@amplicode/gql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { Datagrid, DeleteButton, EditButton, List, NumberField, TextField } from "react-admin";

const SUB_DISTRICT_LIST =
  gql(`query SubDistrictList($filter : SubDistrictFilterInput, $sort : [SubDistrictOrderByInput]) {
subDistrictList(filter : $filter, sort : $sort) {
centerLon
postcode
name
id
centerLat
}
}`);

const DELETE_SUB_DISTRICT = gql(`mutation DeleteSubDistrict($id : ID!) {
deleteSubDistrict(id : $id)
}`);

export const SubDistrictListBackup = () => {
  const queryOptions = {
    meta: {
      query: SUB_DISTRICT_LIST,
      resultDataPath: "",
    },
  };

  return (
    <List<ItemType> queryOptions={queryOptions} exporter={false} pagination={false}>
      <Datagrid rowClick="show">
        <TextField source="id" sortable={false} />

        <NumberField source="centerLon" sortable={false} />
        <TextField source="postcode" sortable={false} />
        <TextField source="name" sortable={false} />
        <NumberField source="centerLat" sortable={false} />

        <EditButton />
        <DeleteButton
          mutationMode="pessimistic"
          mutationOptions={{ meta: { mutation: DELETE_SUB_DISTRICT } }}
        />
      </Datagrid>
    </List>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof SUB_DISTRICT_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["subDistrictList"];
/**
 * Type of single item
 */
type ItemType = { id: string } & Exclude<Exclude<ItemListType, null | undefined>[0], undefined>;
