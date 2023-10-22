package com.backend.dataAccess.abstracts;

import com.backend.entities.concretes.Car;
import com.backend.entities.concretes.ImageCar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ImageRepository extends JpaRepository<ImageCar, Integer> {
    List<ImageCar> findByCarId(Integer carId);
}
