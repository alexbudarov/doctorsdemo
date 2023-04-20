import { useMemo, useCallback, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { ResultOf } from "@graphql-typed-document-node/core";
import {
  Button,
  Card,
  Form,
  FormInstance,
  Input,
  Select,
  message,
  Space,
  Spin
} from "antd";
import { useForm } from "antd/es/form/Form";
import { gql } from "@amplicode/gql";
import { useNavigate, useParams } from "react-router-dom";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { useSubmitEditor } from "../../../core/crud/useSubmitEditor";
import { ErrorMessages } from "../../../core/crud/ErrorMessages";
import { FormattedMessage, useIntl } from "react-intl";
import { RefetchQueries } from "../../../core/type-aliases/RefetchQueries";
import { deserialize } from "../../../core/transform/model/deserialize";
import { useBreadcrumbItem } from "../../../core/screen/useBreadcrumbItem";

const DOCTOR = gql(`
  query Doctor_DoctorList($id: ID!) {
  doctor(id: $id) {
    firstName
    id
    lastName
    specialty
  }
}
`);

const UPDATE_DOCTOR = gql(`
  mutation UpdateDoctor_DoctorList($input: DoctorInput!) {
  updateDoctor(input: $input) {
    firstName
    id
    lastName
    specialty
  }
}
`);

export interface DoctorDetailsProps<TData = any> {
  /**
   * A list of queries that needs to be refetched once the editor has been submitted.
   * For example, you might need to refresh entity list after editing an entity instance.
   * In simple cases this would be just an array of query names, e.g. ["Get_Pet_List"],
   * or an array of `DocumentNode`s, e.g. [PET_LIST].
   * For more info, check Apollo Client documentation.
   */
  refetchQueries?: RefetchQueries<TData>;
}

export function DoctorDetails({
  refetchQueries
}: DoctorDetailsProps<QueryResultType>) {
  const intl = useIntl();
  useBreadcrumbItem(intl.formatMessage({ id: "screen.DoctorDetails" }));

  const { recordId } = useParams();

  if (recordId == null) throw new Error("recordId must be defined");
  // Load the item if `id` is provided
  const { item, itemLoading, itemError } = useLoadItem(recordId);

  if (itemLoading) {
    return <Spin />;
  }

  if (itemError) {
    return <RequestFailedError />;
  }

  return (
    <EditorForm item={item} id={recordId} refetchQueries={refetchQueries} />
  );
}

interface EditorFormProps<TData> {
  /**
   * Loaded entity instance (if editing).
   */
  item?: ItemType;
  /**
   *
   */
  id?: string;
  /**
   *
   */
  refetchQueries?: RefetchQueries<TData>;
}

function EditorForm<TData>({
  item,
  refetchQueries,
  id
}: EditorFormProps<TData>) {
  const [form] = useForm();

  // Global error message, i.e. error message not related to a particular form field.
  // Examples: cross-validation, network errors.
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const { handleSubmit, submitting } = useSubmitEditor(
    UPDATE_DOCTOR,
    setFormErrors,
    form.setFields,
    refetchQueries,
    "DoctorInput",
    id
  );
  const handleClientValidationFailed = useClientValidationFailed();

  // Put the item into the form.
  // Item becomes form field values, which will then be used inside `handleSubmit`.
  useFormData(form, item);

  return (
    <Card className="narrow-layout">
      <Form
        onFinish={handleSubmit}
        onFinishFailed={handleClientValidationFailed}
        layout="vertical"
        form={form}
      >
        <FormFields />
        <ErrorMessages errorMessages={formErrors} />
        <FormButtons submitting={submitting} />
      </Form>
    </Card>
  );
}

function FormFields() {
  return (
    <>
      <Form.Item
        name="firstName"
        label="First Name"
        rules={[
          {
            required: true
          }
        ]}
      >
        <Input autoFocus />
      </Form.Item>

      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[
          {
            required: true
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="specialty" label="Specialty">
        <Select>
          <Select.Option value="ALLERGY_AND_IMMUNOLOGY">
            Allergy and immunology
          </Select.Option>
          <Select.Option value="DERMATOLOGY">Dermatology</Select.Option>
          <Select.Option value="GP">Gp</Select.Option>
          <Select.Option value="NEUROLOGY">Neurology</Select.Option>
          <Select.Option value="OPHTHALMOLOGY">Ophthalmology</Select.Option>
          <Select.Option value="PSYCHIATRY">Psychiatry</Select.Option>
        </Select>
      </Form.Item>
    </>
  );
}

/**
 * Buttons below the form.
 *
 * @param submitting flag indicating whether submit is in progress
 */
function FormButtons({ submitting }: { submitting?: boolean }) {
  const navigate = useNavigate();

  return (
    <Form.Item className="form-buttons">
      <Space>
        <Button htmlType="button" onClick={() => navigate("..")}>
          <FormattedMessage id="common.cancel" />
        </Button>
        <Button type="primary" htmlType="submit" loading={submitting}>
          <FormattedMessage id={"common.submit"} />
        </Button>
      </Space>
    </Form.Item>
  );
}

/**
 * Loads the item if `id` is provided
 *
 * @param id
 */
function useLoadItem(id: string) {
  // Get the function that will load item from server,
  // also get variables that will contain loading/error state and response data
  // once the response is received
  const [loadItem, { loading, error, data }] = useLazyQuery(DOCTOR, {
    variables: {
      id
    }
  });

  // Load item if `id` has been provided in props
  useEffect(() => {
    if (id !== "new") {
      loadItem();
    }
  }, [loadItem, id]);

  const item = useMemo(() => deserialize(data?.doctor), [data?.doctor]);

  return {
    item,
    itemLoading: loading,
    itemError: error
  };
}

/**
 * Puts the `item` inside the `form`
 *
 * @param form
 * @param item
 */
function useFormData(form: FormInstance, item?: ItemType) {
  useEffect(() => {
    if (item != null) {
      form.setFieldsValue(item);
    }
  }, [item, form]);
}

/**
 * Returns a callback that is executed when client-side validation of a form has failed
 */
function useClientValidationFailed() {
  const intl = useIntl();

  return useCallback(() => {
    return message.error(
      intl.formatMessage({ id: "EntityDetailsScreen.validationError" })
    );
  }, [intl]);
}

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof DOCTOR>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = QueryResultType["doctor"];
