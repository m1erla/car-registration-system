package com.backend.business.abstracts;

import com.backend.business.requests.CreateCarRequest;
import com.backend.business.requests.UpdateCarRequest;
import com.backend.business.responses.GetAllCarsResponse;
import com.backend.core.utilities.exceptions.DataResult;
import com.backend.entities.concretes.Car;

import java.util.List;
import java.util.Optional;

public interface CarService {
    DataResult<List<GetAllCarsResponse>> getAllCarsOrfindByUserIdOrBrandOrModel(Optional<Integer> userId, Optional<String> model, Optional<String> brand);

    DataResult<Car> getOneCarsByIdHelp(int carId);
    DataResult<GetAllCarsResponse> getOneCarsByIdApi(int carId);


    DataResult<Car> createOneCar(CreateCarRequest createCarRequest);

    DataResult<Car> updateOneCar(int carId, UpdateCarRequest updateCarRequest);

    DataResult<Integer> removeById(int carId);
}
