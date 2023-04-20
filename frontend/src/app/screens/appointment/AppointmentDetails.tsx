import { Card, Spin, Empty, Descriptions, Button } from "antd";
import { gql } from "@amplicode/gql";
import { useQuery } from "@apollo/client";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";
import { getAppointmentDisplayName } from "../../../core/display-name/getAppointmentDisplayName";
import { getDoctorDisplayName } from "../../../core/display-name/getDoctorDisplayName";
import { getPatientDisplayName } from "../../../core/display-name/getPatientDisplayName";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { deserialize } from "../../../core/transform/model/deserialize";
import { useBreadcrumbItem } from "../../../core/screen/useBreadcrumbItem";

const APPOINTMENT = gql(`
  query Appointment_AppointmentList($id: ID!) {
  appointment(id: $id) {
    doctor {
      firstName
      id
      lastName
      specialty
    }
    durationMinutes
    id
    patient {
      firstName
      id
      lastName
    }
    status
    time
  }
}
`);

export function AppointmentDetails() {
  const intl = useIntl();
  useBreadcrumbItem(intl.formatMessage({ id: "screen.AppointmentDetails" }));

  const { recordId } = useParams();
  const navigate = useNavigate();

  if (recordId == null) throw new Error("recordId must be defined");
  const { loading: queryLoading, error: queryError, data } = useQuery(
    APPOINTMENT,
    {
      variables: {
        id: recordId
      }
    }
  );

  const item = deserialize(data?.appointment);

  if (queryLoading) {
    return <Spin />;
  }

  if (queryError) {
    return <RequestFailedError />;
  }

  if (item == null) {
    return <Empty />;
  }

  return (
    <Card className="narrow-layout">
      <Descriptions
        layout="horizontal"
        title={getAppointmentDisplayName(item)}
        column={1}
      >
        <Descriptions.Item label={<strong>Doctor</strong>}>
          {getDoctorDisplayName(item.doctor ?? undefined)}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Duration Minutes</strong>}>
          {item.durationMinutes ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Patient</strong>}>
          {getPatientDisplayName(item.patient ?? undefined)}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Status</strong>}>
          {item.status ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Time</strong>}>
          {item.time?.format("LLL") ?? undefined}
        </Descriptions.Item>
      </Descriptions>
      <Button htmlType="button" onClick={() => navigate("..")}>
        <FormattedMessage id="common.close" />
      </Button>
    </Card>
  );
}
