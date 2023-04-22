import React from "react";
import { AppointmentNew } from "../app/screens/appointment/AppointmentNew";
import { AppointmentList } from "../app/screens/appointment/AppointmentList";
import { AppointmentDetails } from "../app/screens/appointment/AppointmentDetails";
import { PatientLookup } from "../app/screens/patient/PatientLookup";
import { DoctorLookup } from "../app/screens/doctor/DoctorLookup";
import { DoctorList } from "../app/screens/doctor/DoctorList";
import { DoctorDetails } from "../app/screens/doctor/DoctorDetails";
import { PatientList } from "../app/screens/patient/PatientList";
import { PatientDetails } from "../app/screens/patient/PatientDetails";
import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";
import { PaletteTree } from "./palette";
import { AppointmentRequest } from "../app/screens/appointment/AppointmentRequest";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/PatientDetails">
        <PatientDetails />
      </ComponentPreview>
      <ComponentPreview path="/PatientList">
        <PatientList />
      </ComponentPreview>
      <ComponentPreview path="/DoctorDetails">
        <DoctorDetails />
      </ComponentPreview>
      <ComponentPreview path="/DoctorList">
        <DoctorList />
      </ComponentPreview>
      <ComponentPreview path="/DoctorLookup">
        <DoctorLookup />
      </ComponentPreview>
      <ComponentPreview path="/PatientLookup">
        <PatientLookup />
      </ComponentPreview>
      <ComponentPreview path="/AppointmentDetails">
        <AppointmentDetails />
      </ComponentPreview>
      <ComponentPreview path="/AppointmentList">
        <AppointmentList />
      </ComponentPreview>
      <ComponentPreview path="/AppointmentRequest">
        <AppointmentRequest />
      </ComponentPreview>
      <ComponentPreview path="/AppointmentNew">
        <AppointmentNew />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
