import { Layout } from "react-admin";
import { MainMenu } from "./menu/MainMenu";

export const AdminLayout = (props: any) => {
  return <Layout {...props} menu={MainMenu} />;
};
