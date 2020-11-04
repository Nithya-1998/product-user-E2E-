package com.hmproduct.registerservice.exception;

import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.ResponseStatus;

@SuppressWarnings("serial")
@ResponseStatus(value = HttpStatus.FOUND, reason = "User already exist")
public class UserExistException extends Exception{

	public UserExistException(String message) {
		super(message);
	}

}
