import { Appointment } from "../../gql/graphql";

export function getAppointmentDisplayName(
  entityInstance?: Appointment | null
): string {
  if (entityInstance == null) {
    return "";
  }
  if (entityInstance.id != null) {
    return String(entityInstance.id);
  }
  return JSON.stringify(entityInstance);
}
