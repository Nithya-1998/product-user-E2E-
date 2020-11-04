package com.hmproduct.registerservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hmproduct.registerservice.bean.User;
import com.hmproduct.registerservice.repository.UserRepository;
import com.hmproduct.registerservice.security.AppUser;

@Service
public class AppUserDetailService implements UserDetailsService{
	@Autowired
	UserRepository userRepository;

	public AppUserDetailService(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {

		List<User> user = userRepository.findAll();
		boolean exist = false;
		for (User user1 : user) {
			if(user1.getEmailId().equals(userId)) {
				AppUser usr = new AppUser(user1);
				exist = true;
				return usr;
			}
		}
		if (exist) {
			throw new UsernameNotFoundException(userId);
		}
		return null; 

	}
}
