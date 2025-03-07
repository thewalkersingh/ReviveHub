package com.revivehub.dto;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ApiErrorResponse {
  private String status;
  private String message;
  private long timestamp;
  
  public ApiErrorResponse() {}
  
  public ApiErrorResponse(String status, String message, long timestamp) {
	this.status = status;
	this.message = message;
	this.timestamp = timestamp;
  }
}