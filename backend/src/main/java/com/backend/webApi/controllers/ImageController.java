package com.backend.webApi.controllers;

import com.backend.business.abstracts.ImageService;
import com.backend.business.requests.ImageAddRequest;
import com.backend.business.responses.ImageResponse;
import com.backend.core.utilities.exceptions.DataResult;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/images")
@AllArgsConstructor
public class ImageController {

    private final ImageService imageService;

    @GetMapping
    public DataResult<List<ImageResponse>> getAllOrByCarId(@RequestParam Optional<Integer> carId){
        return imageService.getAllOrByCarId(carId);
    }


    @GetMapping("/{imageId}")
    public DataResult<ImageResponse> getImageById(@PathVariable int imageId){
        return imageService.getImageById(imageId);
    }

    @PostMapping
    public DataResult<ImageResponse> addOneImage(@RequestBody ImageAddRequest imageAddRequest){
        return imageService.addOneImage(imageAddRequest);
    }

    @DeleteMapping("/{imageId}")
    public DataResult<Integer> removeOneImage(@PathVariable int imageId){
        return imageService.removeOneImage(imageId);
    }


}
