package com.sample.doctorsdemo.graphql;

import com.amplicode.core.graphql.paging.ResultPage;
import com.amplicode.core.graphql.paging.ResultPageImpl;
import com.sample.doctorsdemo.doctor.Doctor;
import com.sample.doctorsdemo.doctor.DoctorRepository;
import graphql.ErrorType;
import liquibase.pro.packaged.D;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureHttpGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.test.tester.HttpGraphQlTester;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@AutoConfigureHttpGraphQlTester
public class DoctorControllerTest {

    @Autowired
    private HttpGraphQlTester graphQlTester;

    @Autowired
    private DoctorRepository doctorRepository;

    private Doctor doctor;

    @BeforeEach
    public void setup() {
        doctor = new Doctor();
        doctor.setFirstName("Ivan");
        doctor.setLastName("Pavlov");
        doctor = doctorRepository.save(doctor);
    }

    @AfterEach
    public void after() {
        doctorRepository.deleteById(doctor.getId());
    }

    @Test
    public void testFindByIdSuccessful() {
        //given: initial data
        Long id = doctor.getId();

        //when: send a GraphQL query
        //then: check response
        graphQlTester.documentName("doctor")
                .variable("id", id)
                .execute()
                .path("doctor")
                .entity(Doctor.class)
                .satisfies(returnedValue -> {
                    assertEquals("Ivan", returnedValue.getFirstName());
                });
    }

    @Test
    public void testFindByIdNotFound() {
        //when: send a GraphQL query
        //then: check response
        graphQlTester.documentName("doctorWithNonExistingId")
                .execute()
                .errors()
                .satisfy(responseErrors -> {
                    assertEquals(1, responseErrors.size());
                    assertEquals("INTERNAL_ERROR", responseErrors.get(0).getErrorType().toString());
                });
    }

    @Test
    public void testFindAllDoctors() {
        DoctorController.DoctorFilter filter = new DoctorController.DoctorFilter();
        filter.setLastName("Pavlov");
        graphQlTester.documentName("doctorList")
                .variable("filter", filter)
                .execute()
                .path("doctorList")
                .entity(ResultPageImpl.class)
                .satisfies(returnedValue -> {
                    assertEquals(1, returnedValue.getTotalElements());
                });
    }
}
