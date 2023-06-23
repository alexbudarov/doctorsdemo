import { gql } from "@amplicode/gql";
import { ResultOf } from "@graphql-typed-document-node/core";
import {
  Button,
  CreateButton,
  Datagrid,
  DeleteButton,
  EditButton, ExportButton, FilterButton, FilterForm,
  List,
  ListContextProvider,
  NumberField, Pagination, RaRecord, ShowButton, SortButton,
  TextField, TextInput, TopToolbar,
  useList,
  UseListValue
} from "react-admin";
import {useQuery} from "@apollo/client";
import {useEffect, useMemo, useState} from "react";
import {SubDistrict, SubDistrictFilterInput} from "@amplicode/gql/graphql";
import {Card, CardActions, CardContent, Grid, Stack, Typography} from "@mui/material";
import {apolloClient} from "../../../../dataProvider/graphqlDataProvider";

const SUB_DISTRICT_LIST_SUB_DISTRICT_LIST = gql(`
query SubDistrictList_SubDistrictList($filter: SubDistrictFilterInput) {
    subDistrictList(filter: $filter) {
        centerLat
        centerLon
        id
        name
        postcode
    }
}
`);

export const SubDistrictList = () => {

  const [filterValue, setFilterValue] = useState<SubDistrictFilterInput>();

  const {
    data: subDistrictListData
  } = useQuery(SUB_DISTRICT_LIST_SUB_DISTRICT_LIST, {
    client: apolloClient,
    variables: {
      filter: filterValue
    }
  });
  const items = subDistrictListData?.subDistrictList as SubDistrict[];

  const listContext: UseListValue = useList({
    data: items as Array<RaRecord>,
  });

  useEffect(() => {
    setFilterValue(listContext.filterValues)
    console.log(listContext.filterValues);
  }, [listContext.filterValues]);

  return (
    <>
      <ListContextProvider value={listContext}>
        <TopToolbar>
          <FilterForm filters={[
            <TextInput source="name" name="name"/>,
            <TextInput source="postcode" name="postcode"/>,
          ]}
          />
          <Stack direction="row">
            <SortButton
              fields={
                [
                  'name',]
              }
            />
            <FilterButton filters={[
              <TextInput source="name" name="name"/>,
              <TextInput source="postcode" name="postcode"/>,
            ]}
            />
            <CreateButton label="Create"/>
          </Stack>
        </TopToolbar>
        <Grid container spacing="12">
          {(items || []).map((item =>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography component="div" variant="h5">
                      {item.name}
                    </Typography>
                    <Typography component="div">
                      Postcode: {item.postcode}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <EditButton label="Edit" record={item}/>
                  </CardActions>
                </Card>
              </Grid>
          ))}
        </Grid>
      </ListContextProvider>
    </>
  );
};
