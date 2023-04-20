package com.sample.doctorsdemo.appointment;

import com.sample.doctorsdemo.doctor.Doctor;
import com.sample.doctorsdemo.patient.Patient;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

@Entity
@Table(name = "appointment")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(optional = false)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne(optional = false)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @NotNull
    @Column(name = "time", nullable = false)
    private LocalDateTime time;

    @Enumerated
    @Column(name = "status", nullable = false)
    private AppointmentStatus status;

    @Positive
    @Column(name = "duration_minutes", nullable = false)
    private int durationMinutes;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public int getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(int durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public AppointmentStatus getStatus() {
        return status;
    }

    public void setStatus(AppointmentStatus status) {
        this.status = status;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @PrePersist
    public void prePersist() {
        recalculateEndTime();
    }

    @PreUpdate
    public void preUpdate() {
        recalculateEndTime();
    }

    private void recalculateEndTime() {
        if (time != null) {
            endTime = time.plusMinutes(durationMinutes);
        } else {
            endTime = null;
        }
    }
}