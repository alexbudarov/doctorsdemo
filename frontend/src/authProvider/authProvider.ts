import axios from "axios";
import { GraphQLError } from "graphql";
import qs from "qs";
import { AuthProvider } from "react-admin";

export const TOKEN_KEY = "refine-auth";
const LOGIN_URI = "/login";

export const authProvider: AuthProvider = {
  login: async ({ username, _email, password }) => {
    const response = await axios(LOGIN_URI, {
      method: "POST",
      data: qs.stringify({
        username,
        password,
      }),
    });

    if (response.status === 200) {
      localStorage.setItem(TOKEN_KEY, username);
      return Promise.resolve();
    }
    return Promise.reject(new Error("Incorrect username or password"));
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    return Promise.resolve();
  },
  checkError: async (error) => {
    // TODO code below assumes that GraphQL server returns
    // {"errors":[{"extensions":{"classification":"UNAUTHORIZED"}}], ...}
    // for not authenticated user
    // and
    // {"errors":[{"extensions":{"classification":"FORBIDDEN"}}], ...}
    // if user has not enough permissions for query.
    // If the server handles errors differently, or has a different response structure,
    // code below should be modified.

    const { graphQLErrors, networkError } = error;
    // redirect to login page if graphql returns UNAUTHORIZED error
    if (
      Array.isArray(graphQLErrors) &&
      graphQLErrors.some((err: GraphQLError) => err.extensions?.classification === "UNAUTHORIZED")
    ) {
      return Promise.reject();
    }

    // redirect to login page for network error with 401 status
    if (networkError?.statusCode === 401) {
      return Promise.reject();
    }

    // do not handle error in other cases
    return Promise.resolve();
  },
  checkAuth: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return Promise.resolve();
    }

    return Promise.reject();
  },
  getPermissions: () => Promise.resolve(),
  getUserIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return Promise.reject();
    }

    return Promise.resolve({
      id: 1,
    });
  },
};
