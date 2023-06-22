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
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Controller
public class SchedulingController {
    private final AppointmentService appointmentService;

    public SchedulingController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @MutationMapping(name = "requestAppointment")
    @NotNull
    public AppointmentRequestResult requestAppointment(@Argument @NotNull AppointmentRequestInput request) {
        return appointmentService.requestAppointment(request);
    }

    @MutationMapping(name = "cancelAppointment")
    public void cancelAppointment(@Argument @NotNull @GraphQLId Long id) {
        appointmentService.cancelAppointment(id);
    }
}