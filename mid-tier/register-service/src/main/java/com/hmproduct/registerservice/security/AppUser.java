package com.hmproduct.registerservice.security;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.hmproduct.registerservice.bean.Role;
import com.hmproduct.registerservice.bean.User;


@SuppressWarnings("serial")
public class AppUser implements UserDetails {

	private User user; // entity reference
	private Role role;
	private Collection<? extends GrantedAuthority> authorities; // to store role details

	public AppUser(User user) {
		super();
		this.user = user;
		this.authorities = user.getRoleList().stream().map(role -> new SimpleGrantedAuthority(role.getRoleName()))
				.collect(Collectors.toList());
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		System.out.println("Authority Credential " + authorities);
		return authorities;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
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
