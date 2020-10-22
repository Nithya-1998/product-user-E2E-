package com.hmproduct.authentication;

import org.springframework.context.annotation.Configuration;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author 805924
 *
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {
	@Override
	public void addCorsMappings(CorsRegistry registry) {
//		registry.addMapping("/**").allowedMethods("GET").allowedOrigins("http://localhost:4200");
		registry.addMapping("/**").allowedMethods("*").allowedOrigins("*");
	}
}
