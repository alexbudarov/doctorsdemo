import { NotificationType } from "react-admin";

type NotifyFunction = (
  message: string,
  options?: NotificationOptions & { type?: NotificationType }
) => void;

export const checkServerValidationErrors = (response: any, notify: NotifyFunction) => {
  if (response?.graphQLErrors?.length && response?.graphQLErrors?.length > 0) {
    const errors = response.graphQLErrors as any[];

    if (errors[0]?.extensions?.path?.length && errors[0]?.extensions?.path?.length > 0) {
      const message = errors[0].message;
      const path = errors[0].extensions.path[0];

      if (path.length > 0) {
        return { [path]: message };
      } else {
        notify(message, { type: "error" });
      }
    }
  }
};
