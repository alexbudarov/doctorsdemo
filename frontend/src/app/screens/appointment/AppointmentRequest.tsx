import {useForm} from "antd/es/form/Form";
import {DatePicker, Form, InputNumber, Select} from "antd/es";
import Button from "antd/es/button";
import {gql} from "@amplicode/gql";
import {deserialize} from "../../../core/transform/model/deserialize";
import React, {useMemo, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {getPatientDisplayName} from "../../../core/display-name/getPatientDisplayName";
import {getDoctorDisplayName} from "../../../core/display-name/getDoctorDisplayName";
import {AppointmentRequestInput} from "@amplicode/gql/graphql";
import {serializeLocalDateTime} from "../../../core/transform/model/LocalDateTime/serializeLocalDateTime";
import {Alert, notification} from "antd";
import {useNavigate} from "react-router-dom";
import {useIntl} from "react-intl";
import Link from "antd/es/typography/Link";

const PATIENT_LIST_APPOINTMENT_REQUEST = gql(`
query PatientList_AppointmentRequest {
    patientList(sort: [{
            direction: ASC,
            property: FIRST_NAME
        }]) {
        content {
            firstName
            id
            lastName
        }
    }
}
`);

const DOCTOR_LIST_APPOINTMENT_REQUEST = gql(`
query DoctorList_AppointmentRequest {
    doctorList(sort: [{
            direction: ASC,
            property: FIRST_NAME
        }]) {
        content {
            firstName
            id
            lastName
            specialty
        }
    }
}
`);

const REQUEST_APPOINTMENT_APPOINTMENT_REQUEST = gql(`
mutation RequestAppointment_AppointmentRequest($request: AppointmentRequestInput!) {
    requestAppointment(request: $request) {
        appointment {
            id
        }
        reserved
    }
}
`);

export function AppointmentRequest() {
  const [form] = useForm();

  const [createdAppointmentId, setCreatedAppointmentId] = useState<String | null>();
  const [appointmentNotPermitted, setAppointmentNotPermitted] = useState<boolean>(false);

  const {
    loading: patientListLoading,
    data: patientListData
  } = useQuery(PATIENT_LIST_APPOINTMENT_REQUEST);
  const patientList = useMemo(
    () => deserialize(patientListData?.patientList),
    [patientListData?.patientList]
  );
  const patientItems = patientList?.content || [];

  const {
    loading: doctorListLoading,
    data: doctorListData
  } = useQuery(DOCTOR_LIST_APPOINTMENT_REQUEST);
  const doctorList = useMemo(
    () => deserialize(doctorListData?.doctorList),
    [doctorListData?.doctorList]
  );
  const doctors = doctorList?.content || [];

  const [runRequestAppointment, {
    loading: requestAppointmentLoading
  }] = useMutation(REQUEST_APPOINTMENT_APPOINTMENT_REQUEST);

  const navigate = useNavigate();
  const intl = useIntl();

  const onFormFinish = (values: any) => {
    const request: AppointmentRequestInput = {
      doctorId: values.doctorId,
      patientId: values.patientId,
      time: serializeLocalDateTime(values.time),
      durationMinutes: values.durationMinutes
    };
    runRequestAppointment({variables: {
        request: request
      }}
    ).then(result => {
      const appointmentCreationResult = deserialize(result.data?.requestAppointment);

      setAppointmentNotPermitted(!appointmentCreationResult?.reserved || false);
      if (appointmentCreationResult?.reserved) {
        setCreatedAppointmentId(appointmentCreationResult?.appointment?.id || "");
        form.resetFields();
      } else {
        setCreatedAppointmentId(null);
      }
    });
  };

  const onFormCancelClick = () => {
    navigate("/");
  };

  return (
        <>
          <Form
            form={form}
            name="basic"
            labelCol={{span: 4}}
            wrapperCol={{span: 16}}
            layout="horizontal"
            initialValues={{durationMinutes: 5}}
            onFinish={onFormFinish}
          >
            <Form.Item name="patientId" label="Patient" rules={[
              {
                required: true
              }
            ]}>
              <Select loading={patientListLoading}>
                {patientItems.map((patientItem) => (
                  <Select.Option value={patientItem?.id} key={patientItem?.id}>
                    {getPatientDisplayName(patientItem)}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="doctorId" label="Doctor" rules={[
              {
                required: true
              }
            ]}>
              <Select loading={doctorListLoading}>
                {doctors.map((doctor) => (
                  <Select.Option value={doctor?.id} key={doctor?.id}>
                    {getDoctorDisplayName(doctor) + ' (' + doctor?.specialty + ')'}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Date and time" name="time" rules={[
              {
                type: "date",
                required: true
              }
            ]}>
              <DatePicker showTime={{format: "HH:mm"}} format="LLL" style={{width: "100%"}}/>
            </Form.Item>

            <Form.Item label="Duration, minutes" name="durationMinutes" rules={[
              {
                type: "integer",
                required: true
              }
            ]}>
              <InputNumber min={5} max={120} step={5} style={{width: "100%"}}/>
            </Form.Item>

            {createdAppointmentId && <Form.Item wrapperCol={{offset: 4, span: 16}}>
              <Alert
                message={intl.formatMessage({id: "appointment.success"}, {
                  id: createdAppointmentId
                })}
                type="success"
                showIcon
                action={
                  <Link href={"/appointment/" + createdAppointmentId} target="_blank">
                    Open
                  </Link>
                }
              />
            </Form.Item>}
            {appointmentNotPermitted && <Form.Item wrapperCol={{offset: 4, span: 16}}>
              <Alert message="Appointment time is occupied" type="warning" showIcon/>
            </Form.Item>}

            <Form.Item wrapperCol={{offset: 8, span: 16}}>
              <Button type="primary"
                      htmlType="submit"
                      loading={requestAppointmentLoading}
                      style={{marginRight: "1em"}}>
                Request
              </Button>
              <Button htmlType="button" onClick={onFormCancelClick}>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </>
    );
}