import { GraphQLError } from "graphql/index";
import { AuthProvider } from "react-admin";
import { AuthContextProps } from "react-oidc-context";
import { ID_TOKEN_STORAGE_KEY } from "../core/security/oidcConfig";

export const oidcKeycloakAuthProvider = (auth: AuthContextProps): AuthProvider => ({
  login: () => {
    return auth.signinRedirect();
  },
  logout: async () => {
    const post_logout_redirect_uri = window.location.href;
    await localStorage.removeItem(ID_TOKEN_STORAGE_KEY);
    await auth.signoutRedirect({ post_logout_redirect_uri });
  },
  checkError: async (error) => {
    const { graphQLErrors, networkError } = error;
    if (graphQLErrors !== null && graphQLErrors.length > 0) {
      if (
        graphQLErrors.some((err: GraphQLError) => err.extensions?.classification === "UNAUTHORIZED")
      ) {
        await localStorage.removeItem(ID_TOKEN_STORAGE_KEY);
        await auth.signinRedirect();
      }
    }

    if (networkError !== null && "statusCode" in networkError) {
      if (networkError.statusCode === 401) {
        await localStorage.removeItem(ID_TOKEN_STORAGE_KEY);
        await auth.signinRedirect();
      }
    }
  },
  checkAuth: async () => {
    const token = localStorage.getItem(ID_TOKEN_STORAGE_KEY);
    if (token !== null) {
      return Promise.resolve();
    }

    await localStorage.removeItem(ID_TOKEN_STORAGE_KEY);
    await auth.signinRedirect();
  },
  getPermissions: () => {
    const token = localStorage.getItem(ID_TOKEN_STORAGE_KEY);

    if (!token) {
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getUserIdentity: () => {
    const token = localStorage.getItem(ID_TOKEN_STORAGE_KEY);

    if (token !== null) {
      return Promise.resolve({ id: 1 });
    }
    return Promise.reject("Failed to get identity.");
  },
});
