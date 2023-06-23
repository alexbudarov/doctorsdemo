package com.sample.doctorsdemo.graphql;

import com.amplicode.core.graphql.annotation.GraphQLId;
import com.amplicode.core.graphql.paging.OffsetPageInput;
import com.amplicode.core.graphql.paging.ResultPage;
import com.sample.doctorsdemo.appointment.Appointment;
import com.sample.doctorsdemo.appointment.AppointmentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.Predicate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Controller
public class AppointmentController {
    private final AppointmentRepository crudRepository;

    public AppointmentController(AppointmentRepository crudRepository) {
        this.crudRepository = crudRepository;
    }

    @QueryMapping(name = "appointmentList")
    @Transactional(readOnly = true)
    @NonNull
    public ResultPage<Appointment> findAll(@Argument AppointmentFilter filter, @Argument("page") OffsetPageInput pageInput) {
        Specification<Appointment> specification = createFilter(filter);
        Pageable page = Optional.ofNullable(pageInput)
                .map(p -> PageRequest.of(p.getNumber(), p.getSize()))
                .orElseGet(() -> PageRequest.ofSize(20));
        Page<Appointment> pageData = crudRepository.findAll(specification, page);
        return ResultPage.page(pageData.getContent(), pageData.getTotalElements());
    }

    @QueryMapping(name = "appointment")
    @Transactional(readOnly = true)
    @NonNull
    public Appointment findById(@GraphQLId @Argument @NonNull Long id) {
        return crudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));
    }

    protected Specification<Appointment> createFilter(AppointmentFilter filter) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (filter != null) {
                if (filter.doctorId != null) {
                    predicates.add(criteriaBuilder.equal(root.get("doctor").get("id"), filter.doctorId));
                }
                if (filter.doctorLastName != null) {
                    predicates.add(criteriaBuilder.equal(root.get("doctor").get("lastName"), filter.doctorLastName));
                }
                if (filter.patientLastName != null) {
                    predicates.add(criteriaBuilder.equal(root.get("patient").get("lastName"), filter.patientLastName));
                }
                if (filter.timeMin != null) {
                    predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("time"), filter.timeMin));
                }
                if (filter.timeMax != null) {
                    predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("time"), filter.timeMax));
                }
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    static class AppointmentFilter {

        private Long doctorId;
        private String doctorLastName;
        private String patientLastName;
        private LocalDateTime timeMin;
        private LocalDateTime timeMax;

        public Long getDoctorId() {
            return doctorId;
        }

        public void setDoctorId(Long doctorId) {
            this.doctorId = doctorId;
        }

        public String getDoctorLastName() {
            return doctorLastName;
        }

        public void setDoctorLastName(String doctorLastName) {
            this.doctorLastName = doctorLastName;
        }

        public String getPatientLastName() {
            return patientLastName;
        }

        public void setPatientLastName(String patientLastName) {
            this.patientLastName = patientLastName;
        }

        public LocalDateTime getTimeMin() {
            return timeMin;
        }

        public void setTimeMin(LocalDateTime timeMin) {
            this.timeMin = timeMin;
        }

        public LocalDateTime getTimeMax() {
            return timeMax;
        }

        public void setTimeMax(LocalDateTime timeMax) {
            this.timeMax = timeMax;
        }
    }
}