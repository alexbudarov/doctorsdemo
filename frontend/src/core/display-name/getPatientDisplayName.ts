import { Patient } from "../../gql/graphql";

export function getPatientDisplayName(entityInstance?: Patient | null): string {
  if (entityInstance == null) {
    return "";
  }
  if (entityInstance.firstName != null && entityInstance.lastName != null) {
    return String(`${entityInstance.firstName} ${entityInstance.lastName}`);
  }
  if (entityInstance.firstName != null) {
    return String(entityInstance.firstName);
  }
  if (entityInstance.lastName != null) {
    return String(entityInstance.lastName);
  }
  if (entityInstance.id != null) {
    return String(entityInstance.id);
  }
  return JSON.stringify(entityInstance);
}
