package com.backend.business.concretes;

import com.backend.business.abstracts.CarService;
import com.backend.business.abstracts.ImageService;
import com.backend.business.requests.ImageAddRequest;
import com.backend.business.responses.ImageResponse;
import com.backend.core.utilities.exceptions.DataResult;
import com.backend.core.utilities.exceptions.ErrorDataResult;
import com.backend.core.utilities.exceptions.SuccessDataResult;
import com.backend.dataAccess.abstracts.ImageRepository;
import com.backend.entities.concretes.Car;
import com.backend.entities.concretes.ImageCar;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ImageManager implements ImageService {

    private final ImageRepository imageRepository;

    private final CarService carService;

    public ImageManager(ImageRepository imageCarRepository, CarService carService) {
        this.imageRepository = imageCarRepository;
        this.carService = carService;
    }
    @Override
    public DataResult<List<ImageResponse>> getAllOrByCarId(Optional<Integer> carId) {
        List<ImageCar> images;
        if (carId.isPresent()){
            images=imageRepository.findByCarId(carId.get());
            return new
                    SuccessDataResult<List<ImageResponse>>
                    ("Data getirildi",  images.stream().map(imageCar -> new ImageResponse(imageCar)).collect(Collectors.toList()));
        }
        images=imageRepository.findAll();
        return new SuccessDataResult<List<ImageResponse>>
                ("Data getirildi",images.stream().map(imageCar -> new ImageResponse(imageCar)).collect(Collectors.toList()));
    }

    @Override
    public DataResult<ImageResponse> getImageById(int imageId) {
        Optional<ImageCar> image=imageRepository.findById(imageId);
        if (image.isPresent()){
            return new SuccessDataResult<ImageResponse>("Data Getirildi",new ImageResponse(image.get()));
        }
        return new ErrorDataResult<ImageResponse>("Data Getirilemedi",null);
    }

    @Override
    public DataResult<ImageResponse> addOneImage(ImageAddRequest imageAddRequest) {
        Car isHaveCar=carService.getOneCarsByIdHelp(imageAddRequest.getCarId()).getData();
        if (isHaveCar!=null){
            ImageCar imageCar=new ImageCar();
            imageCar.setUrl(imageAddRequest.getUrl());
            imageCar.setCar(isHaveCar);
            imageRepository.save(imageCar);
            return new SuccessDataResult<ImageResponse>("Resim Eklendi",new ImageResponse(imageCar));
        }

        return new ErrorDataResult<ImageResponse>("Resim eklenemedi",null);
    }
    public DataResult<ImageCar> getImageByIdHelp(int imageId) {
        Optional<ImageCar> image=imageRepository.findById(imageId);
        if (image.isPresent()){
            return new SuccessDataResult<ImageCar>("Data Getirildi",image.get());
        }
        return new ErrorDataResult<ImageCar>("Data Getirilemedi",null);
    }
    @Override
    public DataResult<Integer> removeOneImage(int imageId) {
        ImageCar imageCar=getImageByIdHelp(imageId).getData();
        if (imageCar!=null){
            return new SuccessDataResult<>("Resim silindi...",imageId);
        }
        return new ErrorDataResult<>("Silinecek resim yok",null);
    }
}
