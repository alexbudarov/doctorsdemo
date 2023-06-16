/**
 * The parse prop accepts a callback taking the value from the input (which is a string),
 * and returning the value to put in the form state.
 * https://marmelab.com/react-admin/Inputs.html#parse
 */
export function parseDate(value: string | null): string {
  return value == null || value === "" ? "" : String(new Date(value).getTime());
}
