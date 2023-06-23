import { createHttpLink } from "@apollo/client";
import { GRAPHQL_URI } from "../../../config";

export const httpLink = createHttpLink({
  uri: GRAPHQL_URI,
});
