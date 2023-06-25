import { gql } from "@apollo/client";
import { OperationVariables } from "@apollo/client/core/types";
import { camelCase, constantCase, pascalCase } from "change-case";
import * as gqlBuilder from "gql-query-builder";
import Fields from "gql-query-builder/build/Fields";
import { GraphQLSchema, print } from "graphql";
import { GraphQLFieldMap, GraphQLInputFieldMap } from "graphql/type";
import { singular } from "pluralize";
import { DataProvider } from "ra-core";
import {
  CreateResult,
  DeleteManyResult,
  DeleteResult,
  GetListParams,
  GetListResult,
  GetManyReferenceResult,
  GetManyResult,
  GetOneResult,
  Identifier,
  PaginationPayload,
  SortPayload,
  UpdateManyResult,
  UpdateResult,
} from "react-admin";
import { createClient } from "../core/apollo/client";
import { getGraphQLSchema } from "../core/schema/util/getGraphQLSchema";
import { getTypeFields } from "../core/schema/util/getTypeFields";
import { filterPropsWithNullId } from "./filterPropsWithNullId";
import { stripTypename } from "./stripTypename";

export const apolloClient = createClient();

export const dataProvider: DataProvider = {
  getList: async (resource, params): Promise<GetListResult> => {
    const { meta, sort, filter, pagination }: GetListParams = params;
    let query = meta?.query;
    const resultDataPath =
      typeof meta?.resultDataPath === "string" && meta.resultDataPath.length > 0
        ? meta.resultDataPath
        : null;

    // call user defined query from screen
    if (query != null) {
      // add sort variable, if passed to params,
      // TODO - do not sort by ID (RA do it by default), this should be implemented in screens later
      const variables: OperationVariables = {};
      if (sort != null && sort.field?.toLowerCase() !== "id") {
        const { field, order }: SortPayload = sort;
        variables.sort = {
          property: constantCase(field),
          direction: order,
        };
      }

      // add filter, if passed to params
      if (filter != null && Object.keys(filter).length > 0) {
        variables.filter = filter;
      }

      // pagination
      if (
        meta.paginationQueryParam != null &&
        meta.paginationQueryParam.trim().length > 0 &&
        pagination != null
      ) {
        const { perPage, page }: PaginationPayload = pagination;
        variables[meta.paginationQueryParam] = {
          number: page - 1,
          size: perPage,
        };
      }

      const selectionSetName = getSelectionSetName(query);
      console.log(
        "perform 'getList' GraphQL operation (query passed from screen): ",
        print(query),
        JSON.stringify(variables)
      );

      const result = await apolloClient.query({ query, variables });
      const data =
        resultDataPath != null
          ? result.data[selectionSetName][resultDataPath]
          : result.data[selectionSetName];

      const total = Number(result.data[selectionSetName].totalElements);
      return { data, total };
    }

    const operation = getListOperationName(resource);
    const fields: Fields = getEntityFields(resource);

    query = gqlBuilder.query({
      operation,
      fields,
    });

    console.log("perform 'getList' GraphQL operation: ", query);
    const result = await apolloClient.query({ query: gql(query.query) });
    return {
      data: result.data[operation],
      total: result.data[operation].length,
    };
  },

  getOne: async (resource, { id, meta }): Promise<GetOneResult> => {
    let query = meta?.query;
    const operation = getGetOneOperationName(resource);
    const fields: Fields = getEntityFields(resource);

    // call user defined query from screen
    if (query != null) {
      const selectionSetName = getSelectionSetName(query);
      const variables = { id };
      console.log(
        "perform 'getOne' GraphQL operation (query passed from screen): ",
        print(query),
        variables
      );

      const result = await apolloClient.query({ query, variables });
      return { data: result.data[selectionSetName] };
    }

    query = gqlBuilder.query({
      operation,
      variables: { id: { value: id, type: "ID", required: true } },
      fields,
    });

    console.log("perform 'getOne' GraphQL operation: ", query, { id });
    const result = await apolloClient.query({
      query: gql(query.query),
      variables: query.variables,
    });
    return {
      data: result.data[operation],
    };
  },

  getMany: (_resource, _params): Promise<GetManyResult> => {
    // TODO
    const result: GetManyResult = { data: [] };
    return Promise.resolve(result);
  },

  getManyReference: (_resource): Promise<GetManyReferenceResult> => {
    // TODO
    const result: GetManyReferenceResult = { data: [], pageInfo: {}, total: 0 };
    return Promise.resolve(result);
  },

  create: async (resource, { data, meta }): Promise<CreateResult> => {
    const createData: { __typename?: string } = stripTypename({ ...data });
    // update and create mutations are the same
    const createInputType = getUpdateInputType(resource);

    if (meta?.mutation != null) {
      const mutation = meta!.mutation;
      const variables: OperationVariables = {
        input: createData,
      };
      const selectionSetName = getSelectionSetName(mutation);
      console.log(
        "perform 'create' GraphQL operation (mutation passed from screen): ",
        print(mutation),
        variables
      );

      const result = await apolloClient.mutate({ mutation, variables });
      return { data: result.data[selectionSetName] };
    }

    // update and create operation names are equals
    const operation = getUpdateOperationName(resource);
    const fields: Fields = getEntityFields(resource);

    const mutation = gqlBuilder.mutation({
      operation,
      variables: {
        input: { value: createData, type: createInputType, required: true },
      },
      fields,
    });

    console.log("perform 'create' GraphQL operation: ", mutation);
    const result = await apolloClient.mutate({
      mutation: gql(mutation.query),
      variables: mutation.variables,
    });
    return { data: result.data[operation] };
  },

  update: async (resource, { id, data, meta }): Promise<UpdateResult> => {
    const operation = getUpdateOperationName(resource);
    const fields: Fields = getEntityFields(resource);
    const updateInputType = getUpdateInputType(resource);

    // before save updated data we need to remove `__typename` property
    // and relations, which are reset or empty (has `id: null`)
    const updateData: { id: Identifier; __typename?: string } = filterPropsWithNullId(
      stripTypename({ id, ...data })
    );

    if (meta?.mutation != null) {
      const mutation = meta!.mutation;
      const variables: OperationVariables = {
        input: updateData,
      };
      const selectionSetName = getSelectionSetName(mutation);
      console.log(
        "perform 'update' GraphQL operation (mutation passed from screen): ",
        print(mutation),
        variables
      );

      const result = await apolloClient.mutate({ mutation, variables });
      return { data: result.data[selectionSetName] };
    }

    const mutation = gqlBuilder.mutation({
      operation,
      variables: {
        input: { value: updateData, type: updateInputType, required: true },
      },
      fields,
    });

    console.log("perform 'update' GraphQL operation: ", mutation);
    const result = await apolloClient.mutate({
      mutation: gql(mutation.query),
      variables: mutation.variables,
    });
    return { data: result.data[operation] };
  },

  updateMany: (_resource, _params): Promise<UpdateManyResult> => {
    // TODO
    let result: UpdateManyResult = {};
    return Promise.resolve(result);
  },

  delete: async (resource, { id, meta }): Promise<DeleteResult> => {
    const operation = getDeleteOperationName(resource);

    if (meta?.mutation != null) {
      const mutation = meta!.mutation;
      const variables: OperationVariables = { id };
      console.log(
        "perform 'delete' GraphQL operation (mutation passed from screen): ",
        print(mutation),
        variables
      );

      await apolloClient.mutate({ mutation, variables });
      return { data: { id } };
    }

    const mutation = gqlBuilder.mutation({
      operation,
      variables: { id: { value: id, type: "ID", required: true } },
    });

    console.log("perform 'delete' GraphQL operation: ", mutation);
    await apolloClient.mutate({
      mutation: gql(mutation.query),
      variables: mutation.variables,
    });
    return { data: { id } };
  },

  deleteMany: (_resource, _params): Promise<DeleteManyResult> => {
    // TODO
    const result: DeleteManyResult = {};
    return Promise.resolve(result);
  },
};

const getSelectionSetName = (query: Record<string, any>) => {
  return query.definitions[0].selectionSet.selections[0].name.value;
};

export const getUpdateInputType = (resource: string) => {
  if (resource.endsWith("DTO")) {
    return `${pascalCase(resource.replace("DTO", ""))}InputDTO`;
  }
  return pascalCase(`${resource}Input`);
};

export const getUpdateOperationName = (resource: string, meta?: { operation: string }) => {
  return meta?.operation ?? `update${pascalCase(singular(resource.replace("DTO", "")))}`;
};
export const getGetOneOperationName = (resource: string, meta?: { operation: string }) => {
  return meta?.operation ?? `${camelCase(singular(resource.replace("DTO", "")))}`;
};
export const getDeleteOperationName = (resource: string, meta?: { operation: string }) => {
  return meta?.operation ?? `delete${pascalCase(singular(resource.replace("DTO", "")))}`;
};

export const getListOperationName = (resource: string, meta?: { operation: string }) => {
  return meta?.operation ?? `${camelCase(singular(resource.replace("DTO", "")))}List`;
};

export const getEntityFields = (resource: string): String[] => {
  const SUPPORTED_TYPES = [
    "ID",
    "String",
    "BigDecimal",
    "BigInteger",
    "Boolean",
    "Int",
    "Timestamp",
    "Float",
    "Date",
    "LocalDateTime",
    "LocalTime",
    "Long",
    "DateTime",
    "Time",
    "Url",
  ];

  const schema: GraphQLSchema = getGraphQLSchema();
  const typeFields: GraphQLInputFieldMap | GraphQLFieldMap<any, any> = getTypeFields(
    resource,
    schema
  );

  return Object.keys(typeFields).filter((key: string | number) => {
    let type = typeFields[key].type;

    if ("ofType" in type) {
      type = (type as any).ofType;
    }

    if (!("name" in type)) {
      return false;
    }

    const typeName: string = (type as any).name;
    return SUPPORTED_TYPES.includes(typeName);
  });
};