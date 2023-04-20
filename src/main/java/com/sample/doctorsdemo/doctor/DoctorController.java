package com.sample.doctorsdemo.doctor;

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
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Controller
public class DoctorController {
    private final DoctorRepository crudRepository;

    public DoctorController(DoctorRepository crudRepository) {
        this.crudRepository = crudRepository;
    }

    @MutationMapping(name = "deleteDoctor")
    @Transactional
    public void delete(@GraphQLId @Argument @NonNull Long id) {
        Doctor entity = crudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));

        crudRepository.delete(entity);
    }

    @NonNull
    @QueryMapping(name = "doctorFullList")
    public List<Doctor> findAllNoPaging() {
        return crudRepository.findAll();
    }

    @QueryMapping(name = "doctorList")
    @Transactional(readOnly = true)
    @NonNull
    public ResultPage<Doctor> findAll(@Argument DoctorFilter filter, @Argument("sort") List<DoctorOrderByInput> sortInput, @Argument("page") OffsetPageInput pageInput) {
        Specification<Doctor> specification = createFilter(filter);
        Pageable page = Optional.ofNullable(pageInput)
                .map(p -> PageRequest.of(p.getNumber(), p.getSize()).withSort(createSort(sortInput)))
                .orElseGet(() -> PageRequest.ofSize(20).withSort(createSort(sortInput)));
        Page<Doctor> pageData = crudRepository.findAll(specification, page);
        return ResultPage.page(pageData.getContent(), pageData.getTotalElements());
    }

    @QueryMapping(name = "doctor")
    @Transactional(readOnly = true)
    @NonNull
    public Doctor findById(@GraphQLId @Argument @NonNull Long id) {
        return crudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));
    }

    @MutationMapping(name = "updateDoctor")
    @Transactional
    @NonNull
    public Doctor update(@Argument @NonNull @Valid Doctor input) {
        if (input.getId() != null) {
            if (!crudRepository.existsById(input.getId())) {
                throw new RuntimeException(
                        String.format("Unable to find entity by id: %s ", input.getId()));
            }
        }
        return crudRepository.save(input);
    }

    protected Sort createSort(List<DoctorOrderByInput> sortInput) {
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
                        case FIRST_NAME:
                            return Sort.Order.by("firstName").with(direction);
                        case LAST_NAME:
                            return Sort.Order.by("lastName").with(direction);
                        default:
                            return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        return Sort.by(orders);
    }

    static class DoctorOrderByInput {

        private DoctorOrderByProperty property;
        private SortDirection direction;

        public DoctorOrderByProperty getProperty() {
            return property;
        }

        public void setProperty(DoctorOrderByProperty property) {
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

    public enum DoctorOrderByProperty {FIRST_NAME, LAST_NAME}

    protected Specification<Doctor> createFilter(DoctorFilter filter) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (filter != null) {
                if (filter.firstName != null) {
                    predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("firstName")), "%" + filter.firstName.toLowerCase() + "%"));
                }
                if (filter.lastName != null) {
                    predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("lastName")), "%" + filter.lastName.toLowerCase() + "%"));
                }
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    static class DoctorFilter {

        private String firstName;
        private String lastName;

        public String getFirstName() {
            return firstName;
        }

        public void setFirstName(String firstName) {
            this.firstName = firstName;
        }

        public String getLastName() {
            return lastName;
        }

        public void setLastName(String lastName) {
            this.lastName = lastName;
        }
    }
}