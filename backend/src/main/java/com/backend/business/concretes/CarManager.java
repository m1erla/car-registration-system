package com.backend.business.concretes;

import com.backend.business.abstracts.CarService;
import com.backend.business.abstracts.ImageService;
import com.backend.business.abstracts.UserService;
import com.backend.business.requests.CreateCarRequest;
import com.backend.business.requests.UpdateCarRequest;
import com.backend.business.responses.GetAllCarsResponse;
import com.backend.business.responses.ImageResponse;
import com.backend.core.utilities.exceptions.DataResult;
import com.backend.core.utilities.exceptions.ErrorDataResult;
import com.backend.core.utilities.exceptions.SuccessDataResult;
import com.backend.dataAccess.abstracts.CarRepository;
import com.backend.entities.concretes.Car;
import com.backend.entities.concretes.User;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CarManager implements CarService {
    private final CarRepository carRepository;
    private final UserService userService;
    private final ImageService imageService;


    @Lazy
    public CarManager(CarRepository carRepository, UserService userService, ImageService imageService) {
        this.carRepository = carRepository;
        this.userService = userService;
        this.imageService = imageService;
    }
    @Override
    public DataResult<List<GetAllCarsResponse>> getAllCarsOrfindByUserIdOrBrandOrModel(Optional<Integer> userId, Optional<String> model, Optional<String> brand) {
        List<Car> car;
        if (userId.isPresent()){
            car=carRepository.findByUserId(userId);

            return new SuccessDataResult<List<GetAllCarsResponse>>
                    ("User's Cars have been brought",
                            car.stream().map(car1 -> {
                                List<ImageResponse> images= imageService.getAllOrByCarId(Optional.of(car1.getId())).getData();
                                return new GetAllCarsResponse(car1,images);
                            }).collect(Collectors.toList()));
        } else if (model.isPresent()) {
            car=carRepository.findByModel(model);
            return new
                    SuccessDataResult<List<GetAllCarsResponse>>
                    (model.get()+" Model type cars were brought",car.stream().map(car1 -> {
                        List<ImageResponse> images= imageService.getAllOrByCarId(Optional.of(car1.getId())).getData();
                        return new GetAllCarsResponse(car1, images);
                    }).collect(Collectors.toList()));

        } else if (brand.isPresent()) {
            car=carRepository.findByBrand(brand);
            return new
                    SuccessDataResult<List<GetAllCarsResponse>>
                    (brand.get()+" Brand cars were brought...",car.stream().map(car1 -> {
                        List<ImageResponse> images= imageService.getAllOrByCarId(Optional.of(car1.getId())).getData();
                        return new GetAllCarsResponse(car1, images);
                    }).collect(Collectors.toList()));

        }
        else if(brand.isPresent()&&model.isPresent()){
            car=carRepository.findByBrandAndModel(brand, model);
            return new
                    SuccessDataResult<List<GetAllCarsResponse>>
                    (brand.get()+" Brand car and "+model.get()+" model type cars were brought",car.stream().map(car1 -> {
                        List<ImageResponse> images= imageService.getAllOrByCarId(Optional.of(car1.getId())).getData();
                        return new GetAllCarsResponse(car1,images);
                    }).collect(Collectors.toList()));
        }
        car=carRepository.findAll();
        return new
                SuccessDataResult<List<GetAllCarsResponse>>("All cars brought",car.stream().map(car1 -> {
            List<ImageResponse> images= imageService.getAllOrByCarId(Optional.of(car1.getId())).getData();
            return new GetAllCarsResponse(car1, images);
        }).collect(Collectors.toList()));
    }

    @Override
    public DataResult<Car> getOneCarsByIdHelp(int carId) {
        Optional<Car> haveIsCar=carRepository.findById(carId);
        if (haveIsCar.isPresent()){
            return new SuccessDataResult<Car>("Car brought",haveIsCar.get());
        }
        return new ErrorDataResult<Car>("Car not found! ",null);
    }

    @Override
    public DataResult<GetAllCarsResponse> getOneCarsByIdApi(int carId) {
        Optional<Car> haveIsCar=carRepository.findById(carId);
        List<ImageResponse> images= imageService.getAllOrByCarId(Optional.of(haveIsCar.get().getId())).getData();
        if (haveIsCar.isPresent()){
            return new SuccessDataResult<GetAllCarsResponse>("Car brought",new GetAllCarsResponse(haveIsCar.get(),images));
        }
        return new ErrorDataResult<GetAllCarsResponse>("Car not found ",null);
    }

    @Override
    public DataResult<Car> createOneCar(CreateCarRequest createCarRequest) {
        User haveIsUser= userService.getById(createCarRequest.getUserId()).getData();
        if (haveIsUser==null){
            return new ErrorDataResult<Car>("Failed to add car!",null);
        }

        Car toSaveCar=new Car();
        toSaveCar.setCarName(createCarRequest.getCarName());
        toSaveCar.setLicensePlate(turkishToEnglishConverter(createCarRequest.getLicensePlate()).toUpperCase());
        toSaveCar.setModelYear(createCarRequest.getModelYear());
        toSaveCar.setBrand(createCarRequest.getBrand());
        toSaveCar.setModel(createCarRequest.getModel());
        toSaveCar.setUser(haveIsUser);
        toSaveCar.setCreatedAt(new Date());
        carRepository.save(toSaveCar);

        return new SuccessDataResult<Car>("Car added",toSaveCar);
    }

    @Override
    public DataResult<Car> updateOneCar(int carId, UpdateCarRequest updateCarRequest) {
        Optional<Car> haveIsCar=carRepository.findById(carId);
        if (haveIsCar.isPresent()){
            Car toUpdateCar=haveIsCar.get();
            toUpdateCar.setCarName(updateCarRequest.getCarName());
            toUpdateCar.setBrand(updateCarRequest.getBrand());
            toUpdateCar.setLicensePlate(turkishToEnglishConverter(updateCarRequest.getLicensePlate()).toUpperCase());
            toUpdateCar.setModel(updateCarRequest.getModel());
            toUpdateCar.setModelYear(updateCarRequest.getModelYear());
            carRepository.save(toUpdateCar);
            return new SuccessDataResult<Car>("Car updated",toUpdateCar);
        }
        return new ErrorDataResult<Car>("Car not found...",null);
    }

    @Override
    public DataResult<Integer> removeById(int carId) {
        Optional<Car> haveIsCar=carRepository.findById(carId);
        if (haveIsCar.isPresent()){
            carRepository.deleteById(carId);
            return new SuccessDataResult<Integer>("Car deleted!",carId);
        }
        return new ErrorDataResult<Integer>("Car not found...",null);
    }

    public  String turkishToEnglishConverter(String text)
    {
        char[] turkishChars = {'ı', 'ğ', 'İ', 'Ğ', 'ç', 'Ç', 'ş', 'Ş', 'ö', 'Ö', 'ü', 'Ü'};
        char[] englishChars = {'i', 'g', 'I', 'G', 'c', 'C', 's', 'S', 'o', 'O', 'u', 'U'};

        // Match chars
        for (int i = 0; i < turkishChars.length; i++)
            text = text.replace(turkishChars[i], englishChars[i]);
        return text;
    }
}
