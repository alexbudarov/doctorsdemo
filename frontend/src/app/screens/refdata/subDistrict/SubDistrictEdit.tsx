import { gql } from "@amplicode/gql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import {
  Edit,
  NumberInput,
  SimpleForm,
  TextInput,
  useNotify,
  useRedirect,
  useUpdate,
} from "react-admin";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { checkServerValidationErrors } from "../../../../core/error/checkServerValidationError";
import { FLOAT_FRACTION_DIGITS } from "../../../../core/format/constants";
import { formatNumber } from "../../../../core/format/formatNumber";
import { parseNumber } from "../../../../core/format/parseNumber";

const SUB_DISTRICT = gql(`query SubDistrict($id : ID!) {
subDistrict(id : $id) {
centerLon
postcode
name
id
centerLat
}
}`);
const UPDATE_SUB_DISTRICT = gql(`mutation UpdateSubDistrict($input : SubDistrictInput!) {
updateSubDistrict(input : $input) {
centerLon
postcode
name
id
centerLat
}
}`);

export const SubDistrictEdit = () => {
  const queryOptions = {
    meta: {
      query: SUB_DISTRICT,
      resultDataPath: null,
    },
  };

  const redirect = useRedirect();
  const notify = useNotify();
  const [update] = useUpdate();

  const save: SubmitHandler<FieldValues> = useCallback(
    async (data: FieldValues) => {
      try {
        const params = { data, meta: { mutation: UPDATE_SUB_DISTRICT } };
        const options = { returnPromise: true };

        await update("SubDistrict", params, options);

        notify("ra.notification.updated", { messageArgs: { smart_count: 1 } });
        redirect("list", "SubDistrict");
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
        <NumberInput
          source="centerLon"
          name="centerLon"
          format={formatNumber}
          parse={(value) => parseNumber(value, FLOAT_FRACTION_DIGITS)}
        />
        <TextInput source="postcode" name="postcode" />
        <TextInput source="name" name="name" />
        <NumberInput
          source="centerLat"
          name="centerLat"
          format={formatNumber}
          parse={(value) => parseNumber(value, FLOAT_FRACTION_DIGITS)}
        />
      </SimpleForm>
    </Edit>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof SUB_DISTRICT>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = { id: string } & Exclude<QueryResultType["subDistrict"], undefined>;
