package com.backend.business.responses;

import lombok.Data;

@Data
public class AuthResponse {

    String message;
    int userId;
    String userName;
}
