package com.backend.dataAccess.abstracts;

import com.backend.entities.concretes.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarRepository extends JpaRepository<Car, Integer> {

    List<Car> findByUserId(Optional<Integer> userId);

    List<Car> findByModel(Optional<String> model);

    List<Car> findByBrand(Optional<String> brand);

    List<Car> findByBrandAndModel(Optional<String> brand, Optional<String> model);
}
