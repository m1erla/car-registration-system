package com.backend.webApi.controllers;

import com.backend.business.abstracts.UserService;
import com.backend.business.requests.CreateUserRequest;
import com.backend.business.requests.LoginUser;
import com.backend.business.responses.AuthResponse;
import com.backend.entities.concretes.User;
import com.backend.security.JwtTokenProvider;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;

    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public AuthController(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginUser loginRequest){
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(loginRequest.getUserName(), loginRequest.getPassword());
        Authentication auth = authenticationManager.authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(auth);
        String jwtToken = jwtTokenProvider.generateJwtToken(auth);
        User user=userService.getByUserName(loginRequest.getUserName()).getData();
        AuthResponse authResponse=new AuthResponse();
        authResponse.setMessage("Bearer "+jwtToken);
        authResponse.setUserId(user.getId());
        authResponse.setUserName(user.getUserName());
        return authResponse;
    }


    @PostMapping("/register")
    public AuthResponse register(@RequestBody CreateUserRequest registerRequest){
        AuthResponse authResponse=new AuthResponse();
        if(userService.getByUserName(registerRequest.getUserName()).getData() != null) {
            authResponse.setMessage("Such a user already exists");
            return authResponse;
        }
        CreateUserRequest user = new CreateUserRequest();
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setUserName(registerRequest.getUserName());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        userService.createUser(user);
        User getUser=userService.getByUserName(user.getUserName()).getData();
        authResponse.setMessage("User Created Successfully");
        authResponse.setUserName(getUser.getUserName());
        authResponse.setUserId(getUser.getId());

        return authResponse;
    }

}
