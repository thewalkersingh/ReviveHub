package com.revivehub.controller;
import com.revivehub.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@CrossOrigin(origins = "http://localhost:5173")
public class TestController {
  @GetMapping("/api/test")
  public ResponseEntity<ApiResponse<String>> testEndpoint() {
	// This endpoint is protected; if JWT is valid, you should see this message.
	ApiResponse<String> response = new ApiResponse<>("success", "Access granted to protected endpoint!", null);
	return ResponseEntity.ok(response);
  }
}