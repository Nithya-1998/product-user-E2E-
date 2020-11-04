package com.hmproduct.authentication.bean;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="user")
public class Role {

	private String id;
	private String roleName;
	
	public Role() {
		super();
		System.out.println("Inside Role bean");
	}
	
	public Role(String id, String roleName) {
		super();
		System.out.println("Inside Role bean");
		this.id = id;
		this.roleName = roleName;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	@Override
	public String toString() {
		System.out.println(this.id+" "+this.roleName);
		return "Role [id=" + id + ", roleName=" + roleName + "]";
	}

}
