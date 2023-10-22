package com.backend.business.abstracts;

import com.backend.business.requests.CreateUserRequest;
import com.backend.business.requests.ChangePasswordUserRequest;
import com.backend.business.responses.ChangePasswordResponse;
import com.backend.core.utilities.exceptions.DataResult;
import com.backend.core.utilities.exceptions.Result;
import com.backend.entities.concretes.User;

import java.util.List;

public interface UserService {

    DataResult<List<User>> getAllUser();

    DataResult<User> getById(int userId);

    DataResult<User> getByUserName(String userName);

    DataResult<User> createUser(CreateUserRequest createUserRequest);

    ChangePasswordResponse updateUser(int userId, ChangePasswordUserRequest changePasswordUser);

    Result deleteById(int userId);
}
