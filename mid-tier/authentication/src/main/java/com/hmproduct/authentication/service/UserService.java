package com.hmproduct.authentication.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hmproduct.authentication.bean.User;
import com.hmproduct.authentication.repository.UserRepository;
import com.hmproduct.authentication.security.AppUser;

@Service
public class UserService implements UserDetailsService {
	@Autowired
	UserRepository userRepository;

	public UserService(UserRepository userRepository) {
		super();
		System.out.println("User Service");
		this.userRepository = userRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		List<User> users = userRepository.findAll();
		AppUser usr = null;
		boolean count=false;
		System.out.println("******* "+ users);
		System.out.println(username);
		for (User user : users) {
			System.out.println("User Name ** "+username);
			System.out.println("User Mail ** "+user.getEmailId());
			System.out.println("User ** "+user);
			if(user.getEmailId().equals(username)) {
				 usr = new AppUser(user);
				 System.out.println("Inside loadby username "+usr);
				 count = true;
				 break;
			} 
		}
		if(count) {
			return usr;
		}else {
			throw new UsernameNotFoundException(username);
		}
		
	}

}
