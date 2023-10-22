package com.backend.business.responses;

import com.backend.entities.concretes.ImageCar;
import lombok.Data;

@Data
public class ImageResponse {

    private int id;
    private String url;
    private int carId;
    private String carName;
    private String model;
    private String licensePlate;
    private String brand;
    private String modelYear;

    public ImageResponse(ImageCar entity){
        this.id= entity.getId();
        this.carName=entity.getCar().getCarName();
        this.brand=entity.getCar().getBrand();
        this.model=entity.getCar().getModel();
        this.modelYear=entity.getCar().getModelYear();
        this.licensePlate=entity.getCar().getLicensePlate();
        this.url = entity.getUrl();
        this.carId = entity.getCar().getId();
    }
}


