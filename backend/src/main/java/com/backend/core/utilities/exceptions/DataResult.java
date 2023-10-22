package com.backend.core.utilities.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class DataResult<T> extends Result{

    private T data;

    public DataResult(boolean success, String message, T data){
        super(success, message);
        this.data = data;
    }


}
