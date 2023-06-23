package com.sample.doctorsdemo.graphql;

import com.amplicode.core.graphql.annotation.GraphQLId;
import com.amplicode.core.graphql.paging.OffsetPageInput;
import com.amplicode.core.graphql.paging.ResultPage;
import com.sample.doctorsdemo.patient.Patient;
import com.sample.doctorsdemo.patient.PatientRepository;
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
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Controller
public class PatientController {
    private final PatientRepository crudRepository;

    public PatientController(PatientRepository crudRepository) {
        this.crudRepository = crudRepository;
    }

    @QueryMapping(name = "patientList")
    @Transactional(readOnly = true)
    @NonNull
    public ResultPage<Patient> findAll(@Argument PatientFilter filter, @Argument("sort") List<PatientOrderByInput> sortInput, @Argument("page") OffsetPageInput pageInput) {
        Specification<Patient> specification = createFilter(filter);
        Pageable page = Optional.ofNullable(pageInput)
                .map(p -> PageRequest.of(p.getNumber(), p.getSize()).withSort(createSort(sortInput)))
                .orElseGet(() -> PageRequest.ofSize(20).withSort(createSort(sortInput)));
        Page<Patient> pageData = crudRepository.findAll(specification, page);
        return ResultPage.page(pageData.getContent(), pageData.getTotalElements());
    }

    @MutationMapping(name = "updatePatient")
    @Transactional
    @NonNull
    public Patient update(@Argument @NonNull @Valid Patient input) {
        if (input.getId() != null) {
            if (!crudRepository.existsById(input.getId())) {
                throw new RuntimeException(
                        String.format("Unable to find entity by id: %s ", input.getId()));
            }
        }
        return crudRepository.save(input);
    }

    @QueryMapping(name = "patient")
    @Transactional(readOnly = true)
    @NonNull
    public Patient findById(@GraphQLId @Argument @NonNull Long id) {
        return crudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));
    }

    @MutationMapping(name = "deletePatient")
    @Transactional
    public void delete(@GraphQLId @Argument @NonNull Long id) {
        Patient entity = crudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));

        crudRepository.delete(entity);
    }

    protected Sort createSort(List<PatientOrderByInput> sortInput) {
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
                        case BIRTH_DATE:
                            return Sort.Order.by("birthDate").with(direction);
                        case HOME_ADDRESS:
                            return Sort.Order.by("homeAddress").with(direction);
                        default:
                            return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        return Sort.by(orders);
    }

    static class PatientOrderByInput {

        private PatientOrderByProperty property;
        private SortDirection direction;

        public PatientOrderByProperty getProperty() {
            return property;
        }

        public void setProperty(PatientOrderByProperty property) {
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

    public enum PatientOrderByProperty {FIRST_NAME, LAST_NAME, BIRTH_DATE, HOME_ADDRESS}

    protected Specification<Patient> createFilter(PatientFilter filter) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (filter != null) {
                if (filter.firstName != null) {
                    predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("firstName")), "%" + filter.firstName.toLowerCase() + "%"));
                }
                if (filter.lastName != null) {
                    predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("lastName")), "%" + filter.lastName.toLowerCase() + "%"));
                }
                if (filter.birthDateMin != null) {
                    predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("birthDate"), filter.birthDateMin));
                }
                if (filter.birthDateMax != null) {
                    predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("birthDate"), filter.birthDateMax));
                }
                if (filter.homeAddress != null) {
                    predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("homeAddress")), "%" + filter.homeAddress.toLowerCase() + "%"));
                }
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    static class PatientFilter {

        private String firstName;
        private String lastName;
        private LocalDate birthDateMin;
        private LocalDate birthDateMax;
        private String homeAddress;

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

        public LocalDate getBirthDateMin() {
            return birthDateMin;
        }

        public void setBirthDateMin(LocalDate birthDateMin) {
            this.birthDateMin = birthDateMin;
        }

        public LocalDate getBirthDateMax() {
            return birthDateMax;
        }

        public void setBirthDateMax(LocalDate birthDateMax) {
            this.birthDateMax = birthDateMax;
        }

        public String getHomeAddress() {
            return homeAddress;
        }

        public void setHomeAddress(String homeAddress) {
            this.homeAddress = homeAddress;
        }
    }
}