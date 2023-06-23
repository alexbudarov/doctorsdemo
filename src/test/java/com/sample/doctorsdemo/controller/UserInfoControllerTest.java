package com.sample.doctorsdemo.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureHttpGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.test.tester.HttpGraphQlTester;

@SpringBootTest
@AutoConfigureHttpGraphQlTester
public class UserInfoControllerTest {

    @Autowired
    private HttpGraphQlTester graphQlTester;

    @BeforeEach
    public void setup() {
        //Setup here
    }

    @Test
    public void testMethod() {

    }
}
