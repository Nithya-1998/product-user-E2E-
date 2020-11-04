package com.hmproduct.authentication.bean;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="user")
public class User {
	@Id
	private String id;
	private String emailId;
	private String password;
	private List<Role> role; 
	
	public List<Role> getRoleList() {
		return role;
	}

	public void setRoleList(List<Role> role) {
		this.role = role;
	}

	public User() {
		super();
		System.out.println("Inside User bean");
	}

	public User(String id, String emailId, String password,List<Role> role ) {
		super();
		System.out.println("Inside User bean");
		this.id = id;
		this.emailId = emailId;
		this.password = password;
		this.role = role;
		
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		if (emailId == null) {
			if (other.emailId != null)
				return false;
		} else if (!emailId.equals(other.emailId))
			return false;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", emailId=" + emailId + ", password=" + password + ", role=" + role 
				 + "]";
	}

}
