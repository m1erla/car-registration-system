package com.backend.webApi.controllers;

import com.backend.business.abstracts.CarService;
import com.backend.business.requests.CreateCarRequest;
import com.backend.business.requests.UpdateCarRequest;
import com.backend.business.responses.GetAllCarsResponse;
import com.backend.core.utilities.exceptions.DataResult;
import com.backend.entities.concretes.Car;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cars")
public class CarController {

    private final CarService carService;
    public CarController(CarService carService) {
        this.carService = carService;
    }
    @GetMapping
    public DataResult<List<GetAllCarsResponse>> getAllCarsOrfindByUserIdOrBrandOrModel
            (@RequestParam Optional<Integer> userId, @RequestParam Optional<String> model, @RequestParam Optional<String> brand){
        return carService.getAllCarsOrfindByUserIdOrBrandOrModel(userId, model, brand);
    }


    @GetMapping("/{carId}")
    public DataResult<GetAllCarsResponse> getOneCarsById(@PathVariable String carId){
            return carService.getOneCarsByIdApi(Integer.parseInt(carId));
    }

    @PostMapping
    public DataResult<Car> createOneCar(@RequestBody CreateCarRequest createCarRequest){
        return carService.createOneCar(createCarRequest);
    }

    @PutMapping("/editCar/{carId}")
    public DataResult<Car> updateOneCar(@PathVariable int carId,@RequestBody UpdateCarRequest UpdateCarRequest){
        return carService.updateOneCar(carId,UpdateCarRequest);
    }

    @DeleteMapping("{carId}")
    public DataResult<Integer> removeById(@PathVariable int carId){
        return carService.removeById(carId);
    }
}
