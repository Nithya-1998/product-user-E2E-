package com.hmproduct.authentication.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.hmproduct.authentication.bean.User;


/**
 * @author 805924
 *
 */
public class AppUser implements UserDetails {

	private User user; // entity reference
	private Collection<? extends GrantedAuthority> authorities; // to store role details

	public AppUser(User user) {
		super();
		this.user = user;
//		this.authorities = user.getRoleList().stream().map(role -> new SimpleGrantedAuthority(role.getName()))
//				.collect(Collectors.toList());
	
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getPassword() {
		return user.getPassword();
	}

	public User getUser() {
		return user;
	}

	@Override
	public String getUsername() {
		return user.getEmailId();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}
