import {gql} from "@amplicode/gql";
import {ResultOf} from "@graphql-typed-document-node/core";
import {useCallback, useEffect, useMemo, useState} from "react";
import {
  Button,
  CreateButton, Datagrid,
  Edit, EditButton, ExportButton, FilterButton, FilterForm, FunctionField, ListContextProvider, RaRecord, ShowButton,
  SimpleForm, SimpleShowLayout, TextField,
  TextInput, TopToolbar,
  useGetRecordId, useList, UseListValue,
  useNotify,
  useRecordContext,
  useRedirect,
  useUpdate
} from "react-admin";
import {FieldValues, SubmitHandler} from "react-hook-form";
import {checkServerValidationErrors} from "../../../../core/error/checkServerValidationError";
import {Grid, Paper, Stack, Typography} from "@mui/material";
import {useQuery} from "@apollo/client";
import {Appointment, AppointmentStatus} from "@amplicode/gql/graphql";
import {apolloClient} from "../../../../dataProvider/graphqlDataProvider";
import {getPatientRecordRepresentation} from "../../../../core/record-representation/getPatientRecordRepresentation";

const DOCTOR = gql(`query Doctor($id : ID!) {
doctor(id : $id) {
lastName
firstName
id
}
}`);
const UPDATE_DOCTOR = gql(`mutation UpdateDoctor($input : DoctorInput!) {
updateDoctor(input : $input) {
lastName
firstName
id
}
}`);

const APPOINTMENT_LIST_DOCTOR_EDIT = gql(`
query AppointmentList_DoctorEdit($doctorId: Long) {
    appointmentList(filter: {
        doctorId: $doctorId
    }) {
        content {
            durationMinutes
            endTime
            id
            patient {
                firstName
                id
                lastName
            }
            status
            time
        }
        totalElements
    }
}
`);

export const DoctorEdit = () => {
  const queryOptions = {
    meta: {
      query: DOCTOR,
      resultDataPath: null,
    },
  };

  const redirect = useRedirect();
  const notify = useNotify();
  const [update] = useUpdate();

  const save: SubmitHandler<FieldValues> = useCallback(
    async (data: FieldValues) => {
      try {
        const params = {data, meta: {mutation: UPDATE_DOCTOR}};
        const options = {returnPromise: true};

        await update("Doctor", params, options);

        notify("ra.notification.updated", {messageArgs: {smart_count: 1}});
        redirect("list", "Doctor");
      } catch (response: any) {
        console.log("update failed with error", response);
        return checkServerValidationErrors(response, notify);
      }
    },
    [update, notify, redirect]
  );


  const recordId = useGetRecordId();

  const {
    loading: appointmentListLoading,
    error: appointmentListError,
    data: appointmentListData
  } = useQuery(APPOINTMENT_LIST_DOCTOR_EDIT, {
    client: apolloClient,
    variables: {
      doctorId: recordId
    }
  });

  const appointmentList = useMemo(
    () => appointmentListData?.appointmentList?.content,
    [appointmentListData?.appointmentList?.content]
  )

  const listContext: UseListValue = useList({
    data: appointmentList as Array<RaRecord>,
  });

  return (
    <Edit<ItemType> mutationMode="pessimistic" queryOptions={queryOptions}>
      <SimpleForm onSubmit={save}>
        <TextInput source="lastName" name="lastName"/>
        <TextInput source="firstName" name="firstName"/>
        <Typography variant="h6">Appointments</Typography>
        <ListContextProvider value={listContext}>
          <Paper>
            <Datagrid sx={{
              '& .RaDatagrid-rowOdd': {
                backgroundColor: '#EFEFEF',
              },
            }}
                      size="medium"
            >
              <FunctionField
                source="patient"
                render={(record: Appointment) => getPatientRecordRepresentation(record.patient)}
              />
              <TextField source="time"/>
              <TextField source="durationMinutes"/>
              <TextField source="status"/>
            </Datagrid>
          </Paper>
        </ListContextProvider>
      </SimpleForm>
    </Edit>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof DOCTOR>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = { id: string } & Exclude<QueryResultType["doctor"], undefined>;
