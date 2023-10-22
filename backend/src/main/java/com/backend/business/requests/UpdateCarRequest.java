package com.backend.business.requests;

import lombok.Data;

@Data
public class UpdateCarRequest {

    private String carName;
    private String brand;

    private String model;

    private String modelYear;

    private String licensePlate;
}
