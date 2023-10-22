package com.backend.business.requests;

import lombok.Data;

@Data
public class ImageAddRequest {

    private String url;
    private int carId;
}
