import { gql } from "@amplicode/gql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import { Create, SimpleForm, TextInput, useCreate, useNotify, useRedirect } from "react-admin";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { checkServerValidationErrors } from "../../../core/error/checkServerValidationError";

const UPDATE_DOCTOR = gql(`mutation UpdateDoctor($input : DoctorInput!) {
updateDoctor(input : $input) {
lastName
firstName
id
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
        <TextInput source="lastName" name="lastName" />
        <TextInput source="firstName" name="firstName" />
      </SimpleForm>
    </Create>
  );
};

const DOCTOR_TYPE = gql(`query Doctor($id : ID!) {
doctor(id : $id) {
lastName
firstName
id
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
