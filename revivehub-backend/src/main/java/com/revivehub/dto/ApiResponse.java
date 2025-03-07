package com.revivehub.dto;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ApiResponse<T> {
  private String status;
  private String message;
  private T data;
  
  public ApiResponse() {}
  
  public ApiResponse(String status, String message, T data) {
	this.status = status;
	this.message = message;
	this.data = data;
  }
}