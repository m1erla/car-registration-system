package com.backend.business.requests;

import lombok.Data;

@Data
public class ChangePasswordUserRequest {

    private String oldPassword;
    private String newPassword;
}
