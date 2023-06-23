import dayjs from "dayjs";

/**
 * The parse prop accepts a callback taking the value from the input (which is a string),
 * and returning the value to put in the form state.
 * https://marmelab.com/react-admin/Inputs.html#parse
 */
export function parseLocalDateTime(value: string | null): string {
  return value == null || value === ""
    ? ""
    : dayjs(value, "YYYY-MM-DDTHH:mm").format("YYYY-MM-DDTHH:mm:ss");
}
