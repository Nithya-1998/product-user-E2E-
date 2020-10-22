package com.hmproduct.authentication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hmproduct.authentication.bean.User;
import com.hmproduct.authentication.repository.UserRepository;
import com.hmproduct.authentication.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	UserRepository userRepository;

	@GetMapping
	public List<User> getAllUser() {
		return userRepository.findAll();
	}

	@GetMapping("/{id}")
	public User getUser(@PathVariable int id) {
		System.out.println(userRepository.findById(id).get());
		return userRepository.findById(id).get();
	}

}
