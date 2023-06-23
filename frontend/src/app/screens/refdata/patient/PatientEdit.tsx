import { gql } from "@amplicode/gql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import {
  AutocompleteInput,
  DateInput,
  Edit,
  ReferenceInput,
  SimpleForm,
  TextInput,
  useNotify,
  useRedirect,
  useUpdate,
} from "react-admin";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { checkServerValidationErrors } from "../../../../core/error/checkServerValidationError";
import { getSubDistrictRecordRepresentation } from "../../../../core/record-representation/getSubDistrictRecordRepresentation";

const PATIENT = gql(`query Patient($id : ID!) {
patient(id : $id) {
lastName
firstName
id
subDistrict {
	id
}
birthDate
homeAddress
}
}`);
const UPDATE_PATIENT = gql(`mutation UpdatePatient($input : PatientInput!) {
updatePatient(input : $input) {
lastName
firstName
id
subDistrict {
	id
}
birthDate
homeAddress
}
}`);

export const PatientEdit = () => {
  const queryOptions = {
    meta: {
      query: PATIENT,
      resultDataPath: null,
    },
  };

  const redirect = useRedirect();
  const notify = useNotify();
  const [update] = useUpdate();

  const save: SubmitHandler<FieldValues> = useCallback(
    async (data: FieldValues) => {
      try {
        const params = { data, meta: { mutation: UPDATE_PATIENT } };
        const options = { returnPromise: true };

        await update("Patient", params, options);

        notify("ra.notification.updated", { messageArgs: { smart_count: 1 } });
        redirect("list", "Patient");
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
        <TextInput source="lastName" name="lastName" />
        <TextInput source="firstName" name="firstName" />
        <ReferenceInput source="subDistrict.id" name="subDistrict" reference="SubDistrict">
          <AutocompleteInput label="Sub District" optionText={getSubDistrictRecordRepresentation} />
        </ReferenceInput>
        <DateInput source="birthDate" name="birthDate" />
        <TextInput source="homeAddress" name="homeAddress" />
      </SimpleForm>
    </Edit>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof PATIENT>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = { id: string } & Exclude<QueryResultType["patient"], undefined>;
