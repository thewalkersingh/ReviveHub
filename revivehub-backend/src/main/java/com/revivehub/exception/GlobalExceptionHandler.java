package com.revivehub.exception;
import com.revivehub.dto.ApiErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {
  // Handle all uncaught exceptions
  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiErrorResponse> handleAllExceptions(Exception ex, WebRequest request) {
	ApiErrorResponse errorResponse = new ApiErrorResponse(
			"error",
			ex.getMessage(),
			Instant.now().toEpochMilli()
	);
	return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
  }
  
  // Handle specific exceptions (e.g., UsernameNotFoundException)
  @ExceptionHandler(RuntimeException.class)
  public ResponseEntity<Object> handleRuntimeExceptions(RuntimeException ex, WebRequest request) {
	Map<String, Object> body = new HashMap<>();
	body.put("timestamp", LocalDateTime.now());
	body.put("message", ex.getMessage());
	body.put("details", request.getDescription(false));
	
	return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
  }
}