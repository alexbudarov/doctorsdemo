import { DevSupport } from "@react-buddy/ide-toolbox";
import { AdminContext, AdminUI, Loading, Resource } from "react-admin";
import { useAuthProvider } from "../authProvider/useAuthProvider";
import { getDoctorRecordRepresentation } from "../core/record-representation/getDoctorRecordRepresentation";
import { getPatientRecordRepresentation } from "../core/record-representation/getPatientRecordRepresentation";
import { dataProvider } from "../dataProvider/graphqlDataProvider";
import { ComponentPreviews, useInitial } from "../dev";
import { i18nProvider } from "../i18nProvider";
import { AdminLayout } from "./AdminLayout";
import { DoctorCreate } from "./screens/doctor/DoctorCreate";
import { DoctorEdit } from "./screens/doctor/DoctorEdit";
import { DoctorList } from "./screens/doctor/DoctorList";
import { PatientCreate } from "./screens/patient/PatientCreate";
import { PatientEdit } from "./screens/patient/PatientEdit";
import { PatientList } from "./screens/patient/PatientList";

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
        </AdminUI>
      </DevSupport>
    </AdminContext>
  );
};
