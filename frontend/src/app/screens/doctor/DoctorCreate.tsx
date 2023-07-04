import { gql } from "@amplicode/gql";
import { Specialty } from "@amplicode/gql/graphql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import { Create, SimpleForm, TextInput, useCreate, useNotify, useRedirect } from "react-admin";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { checkServerValidationErrors } from "../../../core/error/checkServerValidationError";
import { EnumInput } from "../../../core/inputs/EnumInput";

const UPDATE_DOCTOR = gql(`mutation UpdateDoctor($input: DoctorInput!) {
  updateDoctor(input: $input) {
    firstName
    id
    lastName
    specialty
  }
}`);

export const DoctorCreate = () => {
  const redirect = useRedirect();
  const notify = useNotify();
  const [create] = useCreate();

  const save: SubmitHandler<FieldValues> = useCallback(
    async (data: FieldValues) => {
      try {
        const params = { data, meta: { mutation: UPDATE_DOCTOR } };
        const options = { returnPromise: true };

        await create("Doctor", params, options);

        notify("ra.notification.created", { messageArgs: { smart_count: 1 } });
        redirect("list", "Doctor");
      } catch (response: any) {
        console.log("create failed with error", response);
        return checkServerValidationErrors(response, notify);
      }
    },
    [create, notify, redirect]
  );

  return (
    <Create<ItemType> redirect="list">
      <SimpleForm onSubmit={save}>
        <TextInput source="firstName" name="firstName" />
        <TextInput source="lastName" name="lastName" />
        <EnumInput name="specialty" source="specialty" enumTypeName="Specialty" enum={Specialty} />
      </SimpleForm>
    </Create>
  );
};

const DOCTOR_TYPE = gql(`query Doctor($id: ID!) {
  doctor(id: $id) {
    firstName
    id
    lastName
    specialty
  }
}`);

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof DOCTOR_TYPE>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = { id: string } & Exclude<QueryResultType["doctor"], undefined>;
