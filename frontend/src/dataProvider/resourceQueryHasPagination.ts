import { GraphQLSchema } from "graphql";
import { getGraphQLSchema } from "../core/schema/util/getGraphQLSchema";

export function resourceQueryHasPagination(operationName: string): boolean {
  const schema: GraphQLSchema = getGraphQLSchema();
  const operationType = schema.getQueryType()?.getFields()[operationName]?.type;

  if (operationType == null || !("getFields" in operationType)) {
    return false;
  }

  // define pagination by 'operationType': if 'operationType' wrapped with 'content',
  // and contains only 'content' and 'totalElements' fields - this is pagination query

  const resultFieldNames = Object.keys(operationType.getFields());
  return (
    resultFieldNames.length === 2 &&
    resultFieldNames.includes("content") &&
    resultFieldNames.includes("totalElements")
  );
}
