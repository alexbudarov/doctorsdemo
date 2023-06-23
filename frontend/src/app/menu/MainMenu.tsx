import { Menu } from "react-admin";

export const MainMenu = () => {
  return (
    <Menu>
      <Menu.DashboardItem />
      <Menu.ResourceItem name="Appointment" />
      <Menu.ResourceItem name="SubDistrict" />
      <Menu.ResourceItem name="Patient" />
      <Menu.ResourceItem name="Doctor" />
    </Menu>
  );
};
