package com.sample.doctorsdemo.graphql;

import com.amplicode.core.graphql.annotation.GraphQLId;
import com.sample.doctorsdemo.subdistrict.SubDistrict;
import com.sample.doctorsdemo.subdistrict.SubDistrictRepository;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Controller
public class SubDistrictController {
    private final SubDistrictRepository crudRepository;

    public SubDistrictController(SubDistrictRepository crudRepository) {
        this.crudRepository = crudRepository;
    }

    @QueryMapping(name = "subDistrictList")
    @Transactional(readOnly = true)
    @NonNull
    public List<SubDistrict> findAll(@Argument SubDistrictFilter filter, @Argument("sort") List<SubDistrictOrderByInput> sortInput) {
        Specification<SubDistrict> specification = createFilter(filter);
        Sort sort = createSort(sortInput);
        return crudRepository.findAll(specification, sort);
    }

    @MutationMapping(name = "updateSubDistrict")
    @Transactional
    @NonNull
    public SubDistrict update(@Argument @NonNull SubDistrict input) {
        if (input.getId() != null) {
            if (!crudRepository.existsById(input.getId())) {
                throw new RuntimeException(
                        String.format("Unable to find entity by id: %s ", input.getId()));
            }
        }
        return crudRepository.save(input);
    }

    @QueryMapping(name = "subDistrict")
    @Transactional(readOnly = true)
    @NonNull
    public SubDistrict findById(@GraphQLId @Argument @NonNull Long id) {
        return crudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));
    }

    @MutationMapping(name = "deleteSubDistrict")
    @Transactional
    public void delete(@GraphQLId @Argument @NonNull Long id) {
        SubDistrict entity = crudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));

        crudRepository.delete(entity);
    }

    protected Sort createSort(List<SubDistrictOrderByInput> sortInput) {
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
                        case NAME:
                            return Sort.Order.by("name").with(direction);
                        case POSTCODE:
                            return Sort.Order.by("postcode").with(direction);
                        case CENTER_LAT:
                            return Sort.Order.by("centerLat").with(direction);
                        case CENTER_LON:
                            return Sort.Order.by("centerLon").with(direction);
                        default:
                            return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        return Sort.by(orders);
    }

    static class SubDistrictOrderByInput {

        private SubDistrictOrderByProperty property;
        private SortDirection direction;

        public SubDistrictOrderByProperty getProperty() {
            return property;
        }

        public void setProperty(SubDistrictOrderByProperty property) {
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

    public enum SubDistrictOrderByProperty {NAME, POSTCODE, CENTER_LAT, CENTER_LON}

    protected Specification<SubDistrict> createFilter(SubDistrictFilter filter) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (filter != null) {
                if (filter.name != null) {
                    predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + filter.name.toLowerCase() + "%"));
                }
                if (filter.postcode != null) {
                    predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("postcode")), "%" + filter.postcode.toLowerCase() + "%"));
                }
                if (filter.centerLatMin != null) {
                    predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("centerLat"), filter.centerLatMin));
                }
                if (filter.centerLatMax != null) {
                    predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("centerLat"), filter.centerLatMax));
                }
                if (filter.centerLonMin != null) {
                    predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("centerLon"), filter.centerLonMin));
                }
                if (filter.centerLonMax != null) {
                    predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("centerLon"), filter.centerLonMax));
                }
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    static class SubDistrictFilter {

        private String name;
        private String postcode;
        private Double centerLatMin;
        private Double centerLatMax;
        private Double centerLonMin;
        private Double centerLonMax;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getPostcode() {
            return postcode;
        }

        public void setPostcode(String postcode) {
            this.postcode = postcode;
        }

        public Double getCenterLatMin() {
            return centerLatMin;
        }

        public void setCenterLatMin(Double centerLatMin) {
            this.centerLatMin = centerLatMin;
        }

        public Double getCenterLatMax() {
            return centerLatMax;
        }

        public void setCenterLatMax(Double centerLatMax) {
            this.centerLatMax = centerLatMax;
        }

        public Double getCenterLonMin() {
            return centerLonMin;
        }

        public void setCenterLonMin(Double centerLonMin) {
            this.centerLonMin = centerLonMin;
        }

        public Double getCenterLonMax() {
            return centerLonMax;
        }

        public void setCenterLonMax(Double centerLonMax) {
            this.centerLonMax = centerLonMax;
        }
    }
}