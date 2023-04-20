package com.sample.doctorsdemo.appointment;

import javax.validation.constraints.NotNull;

public class AppointmentRequestResult {
    @NotNull
    private Boolean reserved;

    private Appointment appointment;

    public AppointmentRequestResult() {
    }

    public AppointmentRequestResult(Boolean reserved) {
        this.reserved = reserved;
    }

    public Appointment getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }

    public Boolean getReserved() {
        return reserved;
    }

    public void setReserved(Boolean reserved) {
        this.reserved = reserved;
    }
}