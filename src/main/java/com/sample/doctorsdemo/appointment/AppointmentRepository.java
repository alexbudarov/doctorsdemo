package com.sample.doctorsdemo.appointment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;

public interface AppointmentRepository extends JpaRepository<Appointment, Long>, JpaSpecificationExecutor<Appointment> {
    @Query("select count(a) from Appointment a " +
            "where a.doctor.id = ?1 and a.time >= ?2 and a.endTime < ?3")
    long countByDoctorAndPeriod(Long doctorId, LocalDateTime startTime, LocalDateTime endTime);

    @Query("select count(a) from Appointment a " +
            "where a.patient.id = ?1 and a.time >= ?2 and a.endTime < ?3")
    long countByPatientAndPeriod(Long patientId, LocalDateTime startTime, LocalDateTime endTime);
}