package com.hmproduct.authentication.security;

import java.io.IOException;

import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {
	public JwtAuthorizationFilter(AuthenticationManager authenticationManager) {
		super(authenticationManager);
		System.out.println("*** Inside Authentication Manager");
	}

	@Override
	protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
			throws IOException, ServletException {
		System.out.println("*** Inside do filter internal method");
		String header = req.getHeader("Authorization");
		System.out.println("*** Header " + header);
		if (header == null || !header.startsWith("Bearer ")) {
			System.out.println("*** No header");
			chain.doFilter(req, res);
			return;
		}
		UsernamePasswordAuthenticationToken authentication = getAuthentication(req);

		SecurityContextHolder.getContext().setAuthentication(authentication);
		chain.doFilter(req, res);
	}

	private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
		String token = request.getHeader("Authorization");
		System.out.println("*** token " + token);
		if (token != null) {
			// parse the token.
			Jws<Claims> jws;
			try {
				jws = Jwts.parser().setSigningKey("secretkey").parseClaimsJws(token.replace("Bearer ", ""));
				String user = jws.getBody().getSubject();
				System.out.println("*** user " + user);
				if (user != null) {
					return new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
				}
			} catch (JwtException ex) {
				return null;
			}
			return null;
		}
		return null;
	}

}
