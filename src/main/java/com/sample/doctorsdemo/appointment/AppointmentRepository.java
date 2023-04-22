package com.sample.doctorsdemo.appointment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.Set;

public interface AppointmentRepository extends JpaRepository<Appointment, Long>, JpaSpecificationExecutor<Appointment> {
    @Query("select count(a) from Appointment a " +
            "where a.doctor.id = ?1 and a.endTime >= ?2 and a.time < ?3 and a.status in ?4")
    long countByDoctorAndPeriod(Long doctorId, LocalDateTime startTime, LocalDateTime endTime, Set<AppointmentStatus> statuses);

    @Query("select count(a) from Appointment a " +
            "where a.patient.id = ?1 and a.endTime >= ?2 and a.time < ?3 and a.status in ?4")
    long countByPatientAndPeriod(Long patientId, LocalDateTime startTime, LocalDateTime endTime, Set<AppointmentStatus> statuses);
}