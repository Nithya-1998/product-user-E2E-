package com.hmproduct.registerservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hmproduct.registerservice.bean.User;
import com.hmproduct.registerservice.exception.UserExistException;
import com.hmproduct.registerservice.exception.UserNotFoundException;
import com.hmproduct.registerservice.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	UserService userService;

	@GetMapping
	public List<User> getAllUser() {
		System.out.println("Inside USer Controller " + userService.getAllUser());
		return userService.getAllUser();
	}

	@GetMapping("/{id}")
	public User getUser(@PathVariable String id) {
		System.out.println(userService.getUser(id));
		return userService.getUser(id);
	}

	@PostMapping
	public void insertUser(@RequestBody User user) throws UserExistException, Exception {
		System.out.println(user);
		userService.insertUser(user);
	}

	@PutMapping
	public void updatetUser(@RequestBody User user) throws UserNotFoundException, Exception {
		System.out.println(user);
		userService.updateUser(user);
	}

}
