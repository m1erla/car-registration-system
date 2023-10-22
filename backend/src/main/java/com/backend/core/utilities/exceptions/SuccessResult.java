package com.backend.core.utilities.exceptions;

public class SuccessResult extends Result{
    public SuccessResult(String message) {
        super(true, message);
    }

}
