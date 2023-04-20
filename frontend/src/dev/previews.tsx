import React from "react";
import { PatientLookup } from "../app/screens/patient/PatientLookup";
import { DoctorLookup } from "../app/screens/doctor/DoctorLookup";
import { AppointmentList } from "../app/screens/appointment/AppointmentList";
import { AppointmentDetails } from "../app/screens/appointment/AppointmentDetails";
import { DoctorList } from "../app/screens/doctor/DoctorList";
import { DoctorDetails } from "../app/screens/doctor/DoctorDetails";
import { PatientList } from "../app/screens/patient/PatientList";
import { PatientDetails } from "../app/screens/patient/PatientDetails";
import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";
import { PaletteTree } from "./palette";

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
      <ComponentPreview path="/AppointmentDetails">
        <AppointmentDetails />
      </ComponentPreview>
      <ComponentPreview path="/AppointmentList">
        <AppointmentList />
      </ComponentPreview>
      <ComponentPreview path="/DoctorLookup">
        <DoctorLookup />
      </ComponentPreview>
      <ComponentPreview path="/PatientLookup">
        <PatientLookup />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
