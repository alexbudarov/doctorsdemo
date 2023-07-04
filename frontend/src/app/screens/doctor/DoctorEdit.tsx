import { gql } from "@amplicode/gql";
import { Specialty } from "@amplicode/gql/graphql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import { Edit, SimpleForm, TextInput, useNotify, useRedirect, useUpdate } from "react-admin";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { checkServerValidationErrors } from "../../../core/error/checkServerValidationError";
import { EnumInput } from "../../../core/inputs/EnumInput";

const DOCTOR = gql(`query Doctor($id: ID!) {
  doctor(id: $id) {
    firstName
    id
    lastName
    specialty
  }
}`);
const UPDATE_DOCTOR = gql(`mutation UpdateDoctor($input: DoctorInput!) {
  updateDoctor(input: $input) {
    firstName
    id
    lastName
    specialty
  }
}`);

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
        const params = { data, meta: { mutation: UPDATE_DOCTOR } };
        const options = { returnPromise: true };

        await update("Doctor", params, options);

        notify("ra.notification.updated", { messageArgs: { smart_count: 1 } });
        redirect("list", "Doctor");
      } catch (response: any) {
        console.log("update failed with error", response);
        return checkServerValidationErrors(response, notify);
      }
    },
    [update, notify, redirect]
  );

  return (
    <Edit<ItemType> mutationMode="pessimistic" queryOptions={queryOptions}>
      <SimpleForm onSubmit={save}>
        <TextInput source="firstName" name="firstName" />
        <TextInput source="lastName" name="lastName" />
        <EnumInput name="specialty" source="specialty" enumTypeName="Specialty" enum={Specialty} />
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
