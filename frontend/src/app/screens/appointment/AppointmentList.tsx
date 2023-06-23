import { gql } from "@amplicode/gql";
import { Appointment } from "@amplicode/gql/graphql";
import { ResultOf } from "@graphql-typed-document-node/core";
import {
  Datagrid,
  DateTimeInput,
  EditButton,
  FunctionField,
  List,
  NumberField,
  NumberInput,
  TextField,
  TextInput,
} from "react-admin";
import { parseLocalDateTime } from "../../../core/format/parseLocalDateTime";
import { renderDateTime } from "../../../core/format/renderDateTime";
import { getDoctorRecordRepresentation } from "../../../core/record-representation/getDoctorRecordRepresentation";
import { getPatientRecordRepresentation } from "../../../core/record-representation/getPatientRecordRepresentation";

const APPOINTMENT_LIST = gql(`query AppointmentList_AppointmentList(
  $filter: AppointmentFilterInput
  $page: OffsetPageInput
) {
  appointmentList(
    filter: $filter
    page: $page
  ) {
    content {
      doctor {
        firstName
        id
        lastName
        specialty
      }
      durationMinutes
      endTime
      id
      patient {
        birthDate
        firstName
        homeAddress
        id
        lastName
      }
      status
      time
    }
    totalElements
  }
}`);

export const AppointmentList = () => {
  const queryOptions = {
    meta: {
      query: APPOINTMENT_LIST,
      resultDataPath: "content",
      paginationQueryParam: "page",
    },
  };

  const filters = [
    <TextInput source="doctorLastName" name="doctorLastName" />,
    <NumberInput source="doctorId" name="doctorId" />,
    <DateTimeInput source="timeMax" name="timeMax" parse={parseLocalDateTime} />,
    <DateTimeInput source="timeMin" name="timeMin" parse={parseLocalDateTime} />,
    <TextInput source="patientLastName" name="patientLastName" />,
  ];

  return (
    <List<ItemType> queryOptions={queryOptions} exporter={false} filters={filters}>
      <Datagrid rowClick="show">
        <TextField source="id" sortable={false} />

        <FunctionField
          label="Doctor"
          render={(record: Appointment) => getDoctorRecordRepresentation(record.doctor)}
          sortable={false}
        />
        <NumberField source="durationMinutes" sortable={false} />
        <FunctionField
          source="endTime"
          render={(record: Appointment) => renderDateTime(record.endTime)}
        />
        <FunctionField
          label="Patient"
          render={(record: Appointment) => getPatientRecordRepresentation(record.patient)}
          sortable={false}
        />
        <TextField source="status" sortable={false} />
        <FunctionField
          source="time"
          render={(record: Appointment) => renderDateTime(record.time)}
        />

        <EditButton />
      </Datagrid>
    </List>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof APPOINTMENT_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["appointmentList"];
/**
 * Type of single item
 */
type ItemType = { id: string } & Exclude<
  Exclude<ItemListType, null | undefined>["content"],
  undefined
>;
