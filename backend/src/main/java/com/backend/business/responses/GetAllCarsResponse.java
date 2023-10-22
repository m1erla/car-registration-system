package com.backend.business.responses;

import com.backend.entities.concretes.Car;
import lombok.Data;

import java.util.Date;
import java.util.List;
@Data
public class GetAllCarsResponse {
    private int id;

    private int userId;
    private String userName;

    private String carName;

    private String brand;

    private String model;

    private String modelYear;

    private String licensePlate;
    private Date createdAt;
    private List<ImageResponse> carImages;

    public GetAllCarsResponse(Car entity, List<ImageResponse>images) {
        this.id = entity.getId();
        this.userId = entity.getUser().getId();
        this.userName = entity.getUser().getUserName();
        this.carName = entity.getCarName();
        this.brand = entity.getBrand();
        this.model = entity.getModel();
        this.modelYear = entity.getModelYear();
        this.licensePlate = entity.getLicensePlate();
        this.createdAt = entity.getCreatedAt();
        this.carImages=images;
    }
}
