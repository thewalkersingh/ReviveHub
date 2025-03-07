package com.revivehub.controller;
import com.revivehub.dto.ApiResponse;
import com.revivehub.dto.UserRequest;
import com.revivehub.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
//@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
  private final UserService userService;
  
  public UserController(UserService userService) {
	this.userService = userService;
  }
  
  @PostMapping("/signup")
  public ResponseEntity<ApiResponse<String>> registerUser(@RequestBody UserRequest userRequest) {
	String responseMessage = userService.registerUser(userRequest.getUsername(), userRequest.getPassword());
	ApiResponse<String> response = new ApiResponse<>("success", responseMessage, null);
	return ResponseEntity.ok(response);
  }
  
  @PostMapping("/login")
  public ResponseEntity<ApiResponse<String>> authenticateUser(@RequestBody UserRequest userRequest) {
	String token = userService.authenticateUser(userRequest.getUsername(), userRequest.getPassword());
	ApiResponse<String> response = new ApiResponse<>("success", "Authentication successful", token);
	return ResponseEntity.ok(response);
  }
}