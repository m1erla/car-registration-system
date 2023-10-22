package com.backend.business.concretes;

import com.backend.business.abstracts.UserService;
import com.backend.business.requests.CreateUserRequest;
import com.backend.business.requests.ChangePasswordUserRequest;
import com.backend.business.responses.ChangePasswordResponse;
import com.backend.core.utilities.exceptions.*;
import com.backend.dataAccess.abstracts.UserRepository;
import com.backend.entities.concretes.User;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserManager implements UserService {
    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    public UserManager(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }
    @Override
    public DataResult<List<User>> getAllUser() {
        return new SuccessDataResult<List<User>>("All Users", userRepository.findAll());
    }

    @Override
    public DataResult<User> getById(int userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()){
            return new SuccessDataResult<User>("The User By Id", user.get());
        }
        return new ErrorDataResult<User>("There is no user that show off!", null);
    }

    @Override
    public DataResult<User> getByUserName(String userName) {
        User user = userRepository.findByUserName(userName);
        if (user!=null){
            return new SuccessDataResult<User>("The User From Username", user);
        }

        return new ErrorDataResult<User>("There is no user that username!", null);
    }

    @Override
    public DataResult<User> createUser(CreateUserRequest createUserRequest) {
        User haveIsUsername= userRepository.findByUserName(createUserRequest.getUserName());
        if(haveIsUsername==null){
            User toSaveUser=new User();
            toSaveUser.setUserName(createUserRequest.getUserName());
            toSaveUser.setPassword(createUserRequest.getPassword());
            userRepository.save(toSaveUser);
            return new SuccessDataResult<User>("The User Have Been Successfully Created.",toSaveUser);

        }
        return new ErrorDataResult<User>("The User already exists!",null);
    }

    @Override
    public ChangePasswordResponse updateUser(int userId, ChangePasswordUserRequest changePasswordUser) {
        ChangePasswordResponse message=new ChangePasswordResponse();
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        String oldPassword=getById(userId).getData().getPassword();
        User userToUpdate=getById(userId).getData();
        boolean  isPasswordMatch = passwordEncoder.matches(changePasswordUser.getOldPassword(), oldPassword);

        if(isPasswordMatch==true){
            User user=userToUpdate;
            user.setPassword(passwordEncoder.encode(changePasswordUser.getNewPassword()));
            userRepository.save(userToUpdate);
            message.setMessage("Password has been successfully changed!");

            return message;


        }else{
            message.setMessage("Current password is incorrect!");
            return message;

        }
    }

    @Override
    public Result deleteById(int userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()){
            userRepository.deleteById(userId);
            return new SuccessResult("The user has been successfully removed!");
        }
        return new ErrorResult("User not found!");
    }
}
