import { DevSupport } from "@react-buddy/ide-toolbox";
import { AdminContext, AdminUI, Loading, Resource } from "react-admin";
import { useAuthProvider } from "../authProvider/useAuthProvider";
import { getAppointmentRecordRepresentation } from "../core/record-representation/getAppointmentRecordRepresentation";
import { getDoctorRecordRepresentation } from "../core/record-representation/getDoctorRecordRepresentation";
import { getPatientRecordRepresentation } from "../core/record-representation/getPatientRecordRepresentation";
import { getSubDistrictRecordRepresentation } from "../core/record-representation/getSubDistrictRecordRepresentation";
import { dataProvider } from "../dataProvider/graphqlDataProvider";
import { ComponentPreviews, useInitial } from "../dev";
import { i18nProvider } from "../i18nProvider";
import { AdminLayout } from "./AdminLayout";
import { AppointmentList } from "./screens/appointment/AppointmentList";
import { DoctorCreate } from "./screens/refdata/doctor/DoctorCreate";
import { DoctorEdit } from "./screens/refdata/doctor/DoctorEdit";
import { DoctorList } from "./screens/refdata/doctor/DoctorList";
import { PatientCreate } from "./screens/refdata/patient/PatientCreate";
import { PatientEdit } from "./screens/refdata/patient/PatientEdit";
import { PatientList } from "./screens/refdata/patient/PatientList";
import { SubDistrictCreate } from "./screens/refdata/subDistrict/SubDistrictCreate";
import { SubDistrictEdit } from "./screens/refdata/subDistrict/SubDistrictEdit";
import { SubDistrictList } from "./screens/refdata/subDistrict/SubDistrictList";

export const App = () => {
  const { authProvider, loading } = useAuthProvider();

  if (loading) {
    return (
      <Loading
        loadingPrimary="Loading"
        loadingSecondary="The page is loading, just a moment please"
      />
    );
  }

  return (
    <AdminContext
      dataProvider={dataProvider}
      authProvider={authProvider}
      i18nProvider={i18nProvider}
    >
      <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
        <AdminUI layout={AdminLayout}>
          <Resource
            name="Appointment"
            options={{ label: "Appointment" }}
            list={AppointmentList}
            recordRepresentation={getAppointmentRecordRepresentation}
          />
          <Resource
            name="Patient"
            options={{ label: "Patient" }}
            list={PatientList}
            recordRepresentation={getPatientRecordRepresentation}
            create={PatientCreate}
            edit={PatientEdit}
          />
          <Resource
            name="Doctor"
            options={{ label: "Doctor" }}
            list={DoctorList}
            recordRepresentation={getDoctorRecordRepresentation}
            create={DoctorCreate}
            edit={DoctorEdit}
          />
          <Resource
            name="SubDistrict"
            options={{ label: "Sub District" }}
            list={SubDistrictList}
            recordRepresentation={getSubDistrictRecordRepresentation}
            create={SubDistrictCreate}
            edit={SubDistrictEdit}
          />
        </AdminUI>
      </DevSupport>
    </AdminContext>
  );
};
