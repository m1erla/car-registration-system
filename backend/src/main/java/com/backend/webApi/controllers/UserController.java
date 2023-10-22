package com.backend.webApi.controllers;

import com.backend.business.abstracts.UserService;
import com.backend.business.requests.ChangePasswordUserRequest;
import com.backend.business.requests.CreateUserRequest;
import com.backend.business.responses.ChangePasswordResponse;
import com.backend.core.utilities.exceptions.DataResult;
import com.backend.core.utilities.exceptions.Result;
import com.backend.entities.concretes.User;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping()
    public DataResult<List<User>> getAllUsers(){
        return userService.getAllUser();
    }

    @GetMapping("/{userId}")
    public DataResult<User> getById(@PathVariable int userId){
        return userService.getById(userId);

    }



    @PostMapping
    public DataResult<User> createOneUser(@RequestBody CreateUserRequest createUserRequest){
        return userService.createUser(createUserRequest);
    }

    @PutMapping("/{userId}")
    public ChangePasswordResponse updateOneUser(@PathVariable int userId, @RequestBody ChangePasswordUserRequest changePasswordUserRequest){
        return userService.updateUser(userId,changePasswordUserRequest);
    }

    @DeleteMapping("/{userId}")
    public Result removeById(@PathVariable int userId){
        return userService.deleteById(userId);
    }
}
