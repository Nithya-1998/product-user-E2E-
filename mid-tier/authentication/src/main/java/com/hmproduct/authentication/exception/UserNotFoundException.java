package com.hmproduct.authentication.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@SuppressWarnings("serial")
@ResponseStatus(value = HttpStatus.UNAUTHORIZED, reason = "User not allowed")
public class UserNotFoundException extends Exception{

}
