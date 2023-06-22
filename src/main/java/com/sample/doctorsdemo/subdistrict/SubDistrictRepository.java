package com.sample.doctorsdemo.subdistrict;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface SubDistrictRepository extends JpaRepository<SubDistrict, Long>, JpaSpecificationExecutor<SubDistrict> {

}