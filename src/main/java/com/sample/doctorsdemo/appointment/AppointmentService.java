package com.sample.doctorsdemo.appointment;

import com.sample.doctorsdemo.doctor.DoctorRepository;
import com.sample.doctorsdemo.patient.PatientRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.Set;

@Service
public class AppointmentService {
    private static final Set<AppointmentStatus> VALID_STATUSES = Set.of(
            AppointmentStatus.PENDING,
            AppointmentStatus.MISSED,
            AppointmentStatus.IN_PROGRESS,
            AppointmentStatus.FINISHED
    );
    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public AppointmentService(AppointmentRepository appointmentRepository,
                              PatientRepository patientRepository,
                              DoctorRepository doctorRepository) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }

    @Transactional
    public AppointmentRequestResult requestAppointment(AppointmentRequestInput request) {
        boolean existsForPatient = isAppointmentExistsForPatient(request);
        if (existsForPatient) {
            return new AppointmentRequestResult(false);
        }
        boolean existsForDoctor = isAppointmentExistsForDoctor(request);
        if (existsForDoctor) {
            return new AppointmentRequestResult(false);
        }
        Appointment appointment = createAppointment(request);
        AppointmentRequestResult result = new AppointmentRequestResult(true);
        result.setAppointment(appointment);
        return result;
    }

    private Appointment createAppointment(AppointmentRequestInput request) {
        Appointment appointment = new Appointment();
        appointment.setPatient(patientRepository.getReferenceById(request.getPatientId()));
        appointment.setDoctor(doctorRepository.getReferenceById(request.getDoctorId()));
        appointment.setTime(request.getTime());
        appointment.setDurationMinutes(request.getDurationMinutes());
        appointment.setStatus(AppointmentStatus.PENDING);

        return appointmentRepository.save(appointment);
    }

    private boolean isAppointmentExistsForDoctor(AppointmentRequestInput request) {
        LocalDateTime requestEndTime = request.getTime().plusMinutes(request.getDurationMinutes());
        long count = appointmentRepository.countByDoctorAndPeriod(request.getDoctorId(), request.getTime(), requestEndTime, VALID_STATUSES);
        return count > 0;
    }

    private boolean isAppointmentExistsForPatient(AppointmentRequestInput request) {
        LocalDateTime requestEndTime = request.getTime().plusMinutes(request.getDurationMinutes());
        long count = appointmentRepository.countByPatientAndPeriod(request.getPatientId(), request.getTime(), requestEndTime, VALID_STATUSES);
        return count > 0;
    }

    @Transactional
    public void cancelAppointment(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(EntityNotFoundException::new);

        if (appointment.getStatus() != AppointmentStatus.PENDING) {
            throw new IllegalStateException("Wrong status for appointment " + appointmentId);
        }
        appointment.setStatus(AppointmentStatus.CANCELLED);
        appointmentRepository.save(appointment);
    }
}
