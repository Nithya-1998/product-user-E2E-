package com.hmproduct.authentication.service;

import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hmproduct.authentication.bean.User;
import com.hmproduct.authentication.repository.UserRepository;
import com.hmproduct.authentication.security.AppUser;

@Service
//public class UserService {
//	@Autowired
//	UserRepository userRepository;
//	
//	@Transactional
//	public List<User> getAllUser(){
//		List<User> users = userRepository.findAll();
//		for (User u : users) {
//			System.out.println(u.toString());
//		}
//		return users;
//	}
//
//}
public class UserService implements UserDetailsService {
	@Autowired
	UserRepository userRepository;

	public UserService(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		List<User> users = userRepository.findAll();
		AppUser usr = null;
		System.out.println(users);
		System.out.println(username);
		for (User user : users) {
			if(user.getEmailId().equals(username)) {
				 usr = new AppUser(user);
				 System.out.println(usr);
				 break;
			} else {
				throw new UsernameNotFoundException(username);
			}
		}
		return usr;
//		if (user == null) {
//			throw new UsernameNotFoundException(username);
//		} else {
//			AppUser usr = new AppUser(user);
//			return usr;
//		}

	}

}
