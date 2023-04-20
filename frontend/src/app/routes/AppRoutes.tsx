import { AppointmentListScreenLayout } from "../screens/appointment/AppointmentListScreenLayout";
import { DoctorListScreenLayout } from "../screens/doctor/DoctorListScreenLayout";
import { PatientListScreenLayout } from "../screens/patient/PatientListScreenLayout";
import { Routes, Route } from "react-router-dom";
import { Home } from "../screens/home/Home";
import React from "react";
import { Page404 } from "../../core/routing/Page404";
import { AuthRedirect } from "../../core/security/AuthRedirect";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="auth" element={<AuthRedirect />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Page404 />} />
      <Route path="patient-list">
        <Route index element={<PatientListScreenLayout />} />
        <Route path=":recordId" element={<PatientListScreenLayout />} />
      </Route>
      <Route path="doctor-list">
        <Route index element={<DoctorListScreenLayout />} />
        <Route path=":recordId" element={<DoctorListScreenLayout />} />
      </Route>
      <Route path="appointment">
        <Route index element={<AppointmentListScreenLayout />} />
        <Route path=":recordId" element={<AppointmentListScreenLayout />} />
      </Route>
    </Routes>
  );
}
