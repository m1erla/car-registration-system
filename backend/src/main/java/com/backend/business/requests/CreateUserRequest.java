package com.backend.business.requests;

import lombok.Data;

@Data
public class CreateUserRequest {
    private String userName;
    private String password;
}
