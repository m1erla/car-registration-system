package com.backend.core.utilities.exceptions;

public class ErrorResult extends Result{

    public ErrorResult(String message){
        super(false, message);
    }
}
