package com.backend.business.abstracts;

import com.backend.business.requests.ImageAddRequest;
import com.backend.business.responses.ImageResponse;
import com.backend.core.utilities.exceptions.DataResult;

import java.util.List;
import java.util.Optional;

public interface ImageService {
    DataResult<List<ImageResponse>> getAllOrByCarId(Optional<Integer> carId);

    DataResult<ImageResponse> getImageById(int imageId);

    DataResult<ImageResponse> addOneImage(ImageAddRequest imageAddRequest);

    DataResult<Integer> removeOneImage(int imageId);
}
