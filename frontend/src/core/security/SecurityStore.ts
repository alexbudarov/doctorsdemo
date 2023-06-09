import { action, makeObservable, observable } from "mobx";
import axios from "axios";
import qs from "qs";
import { LOGOUT_URI, LOGIN_URI } from "../../config";
import { ApolloClient, gql } from "@apollo/client";

export class SecurityStore {
  @observable isLoggedIn: boolean = true;
  @observable userName: string | null = null;

  constructor(private client: ApolloClient<unknown>) {
    makeObservable(this);
  }

  @action
  login = async (username: string, password: string) => {
    const response = await axios(LOGIN_URI, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify({
        username,
        password
      })
    });

    if (response.status === 200) {
      this.isLoggedIn = true;
    }

    return response;
  };

  @action
  logout = async () => {
    this.isLoggedIn = false;

    const response = await axios(LOGOUT_URI, {
      method: "POST"
    });

    return response;
  };

  @action
  initialize = (): Promise<void> => {
    return this.client
      .query({
        query: gql`
          query {
            userInfo {
              username
            }
          }
        `
      })
      .then(
        action(resp => {
          const {
            userInfo: { username }
          } = resp.data;
          this.userName = username;
          this.isLoggedIn = true;
        })
      )
      .catch(
        action(() => {
          this.isLoggedIn = false;
        })
      );
  };
}
