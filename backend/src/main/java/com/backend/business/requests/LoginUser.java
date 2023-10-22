package com.backend.business.requests;

import lombok.Data;

@Data
public class LoginUser {
    private String userName;
    private String password;
}
