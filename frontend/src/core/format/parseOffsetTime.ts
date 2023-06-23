import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

/**
 * The parse prop accepts a callback taking the value from the input (which is a string),
 * and returning the value to put in the form state.
 * https://marmelab.com/react-admin/Inputs.html#parse
 */
export function parseOffsetTime(value: string | null): string {
  return value == null || value === "" ? "" : dayjs(value, "HH:mm").format("HH:mm:ss+HH:mm");
}
