package com.revivehub.dto;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserRequest {
  private String username;
  private String password;
  
  public UserRequest() {}
  
  public UserRequest(String username, String password) {
	this.username = username;
	this.password = password;
  }
}