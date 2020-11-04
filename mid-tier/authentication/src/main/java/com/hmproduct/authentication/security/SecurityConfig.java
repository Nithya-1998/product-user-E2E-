package com.hmproduct.authentication.security;

import org.slf4j.Logger;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.hmproduct.authentication.service.UserService;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	public static final Logger LOGGER = LoggerFactory.getLogger(SecurityConfig.class);
	@Autowired
	UserService appUserDetailsService;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//		auth.inMemoryAuthentication().withUser("admin").password(passwordEncoder().encode("pwd")).roles("ADMIN").and()
//				.withUser("user").password(passwordEncoder().encode("pwd")).roles("USER");
		System.out.println("*** App User Detail service ***"+appUserDetailsService);
		System.out.println(auth.userDetailsService(appUserDetailsService).passwordEncoder(passwordEncoder()));
		auth.userDetailsService(appUserDetailsService).passwordEncoder(passwordEncoder());
//		auth.userDetailsService(inMemoryUserDetailsManager());
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		LOGGER.info("Start encoding");
		System.out.println(new BCryptPasswordEncoder());
		return new BCryptPasswordEncoder();
	}

//	@Bean
//	public InMemoryUserDetailsManager inMemoryUserDetailsManager() {
//		LOGGER.info("Start");
//		List<UserDetails> userDetailsList = new ArrayList<>();
//
//		userDetailsList.add(User.withUsername("user").password(passwordEncoder().encode("pwd")).roles("USER").build());
//
//		userDetailsList
//				.add(User.withUsername("admin").password(passwordEncoder().encode("pwd")).roles("ADMIN").build());
//
//		LOGGER.info("End");
//		return new InMemoryUserDetailsManager(userDetailsList);
//	}

	/*
	 * @Override protected void configure(HttpSecurity httpSecurity) throws
	 * Exception {
	 * httpSecurity.csrf().disable().httpBasic().and().authorizeRequests().
	 * antMatchers("/countries").hasRole("USER")
	 * .antMatchers("/authenticate").hasAnyRole("USER", "ADMIN"); }
	 */
	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		httpSecurity.cors();
		httpSecurity.csrf().disable().httpBasic().and().authorizeRequests()
//		.antMatchers("/menu-items").permitAll()
//				.antMatchers("/menu-items/{id}").permitAll().antMatchers("/carts").permitAll()
//				.antMatchers("/carts/{userId}").permitAll()
//				.antMatchers("/carts/{userId}/{menuItemId}").permitAll()
//		.antMatchers("/users").anonymous()
//		.antMatchers("/authenticate").hasAnyRole("USER", "ADMIN"); 
				.anyRequest().authenticated();
//				.and().addFilter(new JwtAuthorizationFilter(authenticationManager()));
	}
}
