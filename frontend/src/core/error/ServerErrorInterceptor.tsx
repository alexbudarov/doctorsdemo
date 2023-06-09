import { ServerErrorEvents } from "./ServerErrorEvents";
import { ErrorHandler } from "@apollo/client/link/error";
import { useSecurity } from "../security/useSecurity";
import { useEffect } from "react";
import { notification } from "antd";
import { useIntl } from "react-intl";
import { EventEmitter } from "@amplicode/react";

export interface ServerErrorInterceptorProps {
  serverErrorEmitter: EventEmitter<ServerErrorEvents>;
  children: React.ReactNode;
}
export function ServerErrorInterceptor({
  serverErrorEmitter,
  children
}: ServerErrorInterceptorProps) {
  const intl = useIntl();
  const security = useSecurity();

  useEffect(() => {
    const graphQLErrorHandler: ErrorHandler = ({
      networkError,
      graphQLErrors
    }) => {
      // TODO code below assumes that GraphQL server returns
      // {"errors":[{"extensions":{"classification":"UNAUTHORIZED"}}], ...}
      // for not authenticated user
      // and
      // {"errors":[{"extensions":{"classification":"FORBIDDEN"}}], ...}
      // if user has not enough permissions for query.
      // If the server handles errors differently, or has a different response structure, code below should be modified.

      if (graphQLErrors != null && graphQLErrors.length > 0) {
        if (
          graphQLErrors.some(
            err => err.extensions?.classification === "UNAUTHORIZED"
          )
        ) {
          security.logout();
          return;
        }

        if (
          graphQLErrors.some(
            err => err.extensions?.classification === "FORBIDDEN"
          )
        ) {
          notification.error({
            message: intl.formatMessage({ id: "common.notAllowed" })
          });
          return;
        }
      }

      if (networkError == null || !("statusCode" in networkError)) {
        return;
      }
      if (networkError.statusCode === 401) {
        security.logout();
      }
    };

    const unauthorizedHandler = () => security.logout();

    serverErrorEmitter.on("graphQLError", graphQLErrorHandler);
    serverErrorEmitter.on("unauthorized", unauthorizedHandler);

    return () => {
      serverErrorEmitter.off("graphQLError", graphQLErrorHandler);
      serverErrorEmitter.off("unauthorized", unauthorizedHandler);
    };
  }, [serverErrorEmitter, intl, security]);

  return <>{children}</>;
}
