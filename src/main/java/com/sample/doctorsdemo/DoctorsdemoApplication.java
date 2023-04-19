package com.sample.doctorsdemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class DoctorsdemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DoctorsdemoApplication.class, args);
    }
}
