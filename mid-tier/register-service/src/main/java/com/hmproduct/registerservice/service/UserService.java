package com.hmproduct.registerservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.hmproduct.registerservice.bean.User;
import com.hmproduct.registerservice.exception.UserExistException;
import com.hmproduct.registerservice.exception.UserNotFoundException;
import com.hmproduct.registerservice.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	UserRepository userRepository;

	public UserService(UserRepository userRepository) {
		super();
		System.out.println("User Service");
		this.userRepository = userRepository;
	}

	@Transactional
	public List<User> getAllUser() {
		return userRepository.findAll();
	}

	@Transactional
	public User getUser(String id) {
		return userRepository.findById(id).get();
	}

	@Transactional
	public void updateUser(User user) throws UserNotFoundException, Exception {
		System.out.println(user);
		List<User> usr = userRepository.findAll();
		boolean exist = false;
		for (User user1 : usr) {
			if (user1.getEmailId().equals(user.getEmailId())) {
				String id = user1.getId();
				String password = user.getPassword();
				user.setPassword(passwordEncoder().encode(password));
				user.setId(id);
				userRepository.save(user);
				exist = true;
				break;
			}
		}
		if (!exist) {
			throw new UserNotFoundException("User Not Found");
		}
	}

	@Transactional
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Transactional
	public void insertUser(User user) throws UserExistException, Exception {
		List<User> usr = userRepository.findAll();
		boolean exist = false;
		for (User user1 : usr) {
			if (user1.getEmailId().equals(user.getEmailId())) {
				exist = true;
				throw new UserExistException("User Already Exist");
			}
		}
		if (!exist) {
			String password = user.getPassword();
			user.setPassword(passwordEncoder().encode(password));
			userRepository.save(user);
		}
	}

}
