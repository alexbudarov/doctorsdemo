package com.sample.doctorsdemo.appointment;

import com.amplicode.core.graphql.annotation.GraphQLId;
import com.amplicode.core.graphql.paging.OffsetPageInput;
import com.amplicode.core.graphql.paging.ResultPage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.Valid;
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

    @MutationMapping(name = "deleteAppointment")
    @Transactional
    public void delete(@GraphQLId @Argument @NonNull Long id) {
        Appointment entity = crudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));

        crudRepository.delete(entity);
    }

    @QueryMapping(name = "appointmentList")
    @Transactional(readOnly = true)
    @NonNull
    public ResultPage<Appointment> findAll(@Argument("sort") List<AppointmentOrderByInput> sortInput, @Argument("page") OffsetPageInput pageInput) {
        Pageable page = Optional.ofNullable(pageInput)
                .map(p -> PageRequest.of(p.getNumber(), p.getSize()).withSort(createSort(sortInput)))
                .orElseGet(() -> PageRequest.ofSize(20).withSort(createSort(sortInput)));
        Page<Appointment> pageData = crudRepository.findAll(page);
        return ResultPage.page(pageData.getContent(), pageData.getTotalElements());
    }

    @QueryMapping(name = "appointment")
    @Transactional(readOnly = true)
    @NonNull
    public Appointment findById(@GraphQLId @Argument @NonNull Long id) {
        return crudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));
    }

    @MutationMapping(name = "updateAppointment")
    @Transactional
    @NonNull
    public Appointment update(@Argument @NonNull @Valid Appointment input) {
        if (input.getId() != null) {
            if (!crudRepository.existsById(input.getId())) {
                throw new RuntimeException(
                        String.format("Unable to find entity by id: %s ", input.getId()));
            }
        }
        return crudRepository.save(input);
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
                        case PATIENT_LAST_NAME:
                            return Sort.Order.by("patient.lastName").with(direction);
                        case DOCTOR_LAST_NAME:
                            return Sort.Order.by("doctor.lastName").with(direction);
                        case TIME:
                            return Sort.Order.by("time").with(direction);
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

    public enum AppointmentOrderByProperty {PATIENT_LAST_NAME, DOCTOR_LAST_NAME, TIME}
}