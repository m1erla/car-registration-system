package com.backend.business.requests;

import lombok.Data;

@Data
public class CreateCarRequest {

    private String carName;
    private String brand;
    private String model;
    private String year;
    private String plate;

    private int userId;
    private String url;

}
