package com.backend.core.utilities.exceptions;

import lombok.AllArgsConstructor;


public class ErrorDataResult<T> extends DataResult<T>{

    public ErrorDataResult(String message, T data) {
        super(false, message, data);
    }
}
