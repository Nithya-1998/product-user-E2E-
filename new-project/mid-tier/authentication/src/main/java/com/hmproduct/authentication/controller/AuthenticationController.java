package com.hmproduct.authentication.controller;

import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hmproduct.authentication.repository.UserRepository;
import com.hmproduct.authentication.security.AppUser;
import com.hmproduct.authentication.security.SecurityConfig;
import com.hmproduct.authentication.service.UserService;

import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

/**
 * @author 805924
 *
 */
@RestController
@RequestMapping("/authenticate")
public class AuthenticationController {
	public static final Logger LOGGER = LoggerFactory.getLogger(SecurityConfig.class);
	@Autowired
	UserRepository userRepository;

	@Autowired
	UserService appUserDetailsService;

	@GetMapping
	public Map<String, String> authenticate(@RequestHeader("Authorization") String authHeader) {
//		User userId = userRepository.findById();
		Map<String, String> tokens = new HashMap<String, String>();
		LOGGER.info("Start");
		LOGGER.debug(authHeader);
		LOGGER.info("End");
		String user = getUser(authHeader);
		String token = generateJwt(user);
		String role = SecurityContextHolder.getContext().getAuthentication().getAuthorities().toArray()[0].toString();
		tokens.put("token", token);
		tokens.put("role", role);
		tokens.put("user", user);
		AppUser appUser = (AppUser) appUserDetailsService.loadUserByUsername(user);
		tokens.put("id", String.valueOf(appUser.getUser().getId()));
//		tokens.put("userId", Integer.toString(user.g));
		return tokens;
	}

	private String getUser(String authHeader) {
		LOGGER.info("START FROM GET USER METHOD");
		String encodedCredentials = authHeader.split(" ")[1];
		byte[] credentials = Base64.getDecoder().decode(encodedCredentials);
		String user = new String(credentials).split(":")[0];
		LOGGER.debug("USER -> " + user);
		LOGGER.info("END FROM GET USER METHOD");
		return user;
	}

	private String generateJwt(String user) {

		JwtBuilder builder = Jwts.builder();
		builder.setSubject(user);

		// Set the token issue time as current time
		builder.setIssuedAt(new Date());

		// Set the token expiry as 20 minutes from now
		builder.setExpiration(new Date((new Date()).getTime() + 1200000));
		builder.signWith(SignatureAlgorithm.HS256, "secretkey");

		String token = builder.compact();

		return token;
	}
}
