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
    private String plate;
    private String brand;
    private String year;

    public ImageResponse(ImageCar entity){
        this.id= entity.getId();
        this.carName=entity.getCar().getCarName();
        this.brand=entity.getCar().getBrand();
        this.model=entity.getCar().getModel();
        this.year=entity.getCar().getYear();
        this.plate=entity.getCar().getPlate();
        this.url = entity.getUrl();
        this.carId = entity.getCar().getId();
    }
}


