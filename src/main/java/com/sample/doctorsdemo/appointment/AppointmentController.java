package com.sample.doctorsdemo.appointment;

import com.amplicode.core.graphql.annotation.GraphQLId;
import com.amplicode.core.graphql.paging.OffsetPageInput;
import com.amplicode.core.graphql.paging.ResultPage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.Predicate;
import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Controller
public class AppointmentController {
    private final AppointmentRepository crudRepository;

    public AppointmentController(AppointmentRepository crudRepository) {
        this.crudRepository = crudRepository;
    }

    @NonNull
    @QueryMapping(name = "appointmentList")
    public ResultPage<Appointment> findAll(@Argument OffsetPageInput page, @Argument List<AppointmentOrderByInput> sort, @Argument AppointmentFilter filter) {
        Pageable pageable = Optional.ofNullable(page)
                .map(p -> PageRequest.of(p.getNumber(), p.getSize()).withSort(createSort(sort)))
                .orElseGet(() -> PageRequest.ofSize(20).withSort(createSort(sort)));
        Page<Appointment> result = crudRepository.findAll(createFilter(filter), pageable);
        return ResultPage.page(result.getContent(), result.getTotalElements());
    }

    @QueryMapping(name = "appointment")
    @Transactional(readOnly = true)
    @NonNull
    public Appointment findById(@GraphQLId @Argument @NonNull Long id) {
        return crudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));
    }

    protected Sort createSort(List<AppointmentOrderByInput> sortInput) {
        if (sortInput == null || sortInput.isEmpty()) {
            return Sort.unsorted();
        }
        List<Sort.Order> orders = sortInput.stream()
                .map(item -> {
                    Sort.Direction direction;
                    if (item.getDirection() == SortDirection.ASC) {
                        direction = Sort.Direction.ASC;
                    } else {
                        direction = Sort.Direction.DESC;
                    }
                    switch (item.getProperty()) {
                        case TIME:
                            return Sort.Order.by("time").with(direction);
                        case PATIENT_FIRST_NAME:
                            return Sort.Order.by("patient.firstName").with(direction);
                        case DOCTOR_FIRST_NAME:
                            return Sort.Order.by("doctor.firstName").with(direction);
                        default:
                            return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        return Sort.by(orders);
    }

    static class AppointmentOrderByInput {

        private AppointmentOrderByProperty property;
        private SortDirection direction;

        public AppointmentOrderByProperty getProperty() {
            return property;
        }

        public void setProperty(AppointmentOrderByProperty property) {
            this.property = property;
        }

        public SortDirection getDirection() {
            return direction;
        }

        public void setDirection(SortDirection direction) {
            this.direction = direction;
        }
    }

    public enum SortDirection {ASC, DESC}

    public enum AppointmentOrderByProperty {TIME, PATIENT_FIRST_NAME, DOCTOR_FIRST_NAME}

    protected Specification<Appointment> createFilter(AppointmentFilter filter) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (filter != null) {
                if (filter.patientLastName != null) {
                    predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("patient").get("lastName")), "%" + filter.patientLastName.toLowerCase() + "%"));
                }
                if (filter.doctorLastName != null) {
                    predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("doctor").get("lastName")), "%" + filter.doctorLastName.toLowerCase() + "%"));
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
        private String patientLastName;
        private String doctorLastName;
        private LocalDateTime timeMin;
        private LocalDateTime timeMax;

        public String getPatientLastName() {
            return patientLastName;
        }

        public void setPatientLastName(String patientLastName) {
            this.patientLastName = patientLastName;
        }

        public String getDoctorLastName() {
            return doctorLastName;
        }

        public void setDoctorLastName(String doctorLastName) {
            this.doctorLastName = doctorLastName;
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