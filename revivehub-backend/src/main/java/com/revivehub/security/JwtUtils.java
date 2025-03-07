package com.revivehub.security;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtUtils {
  private final Key key;
  private final int jwtExpirationMs;
  
  public JwtUtils(
		  @Value("${jwt.secret}") String jwtSecret,
		  @Value("${jwt.expiration-ms}") int jwtExpirationMs
				 ) {
	// Generate a secure key from the secret string
	this.key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
	this.jwtExpirationMs = jwtExpirationMs;
  }
  
  public String generateJwtToken(Authentication authentication) {
	UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
	// Extract roles as a list of strings from user authorities
	List<String> roles = userPrincipal.getAuthorities().stream()
									  .map(authority -> authority.getAuthority())
									  .collect(Collectors.toList());
	return Jwts.builder()
			   .subject(userPrincipal.getUsername())
			   .claim("roles", roles)  // Add roles claim
			   .issuedAt(new Date())
			   .expiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
			   .signWith(key)
			   .compact();
  }
  
  public boolean validateJwtToken(String token) {
	try {
	  Jwts.parser()
		  .verifyWith((SecretKey) key)
		  .build()
		  .parseSignedClaims(token);
	  return true;
	} catch (JwtException | IllegalArgumentException e) {
	  // Log error
	  System.err.println("JWT validation error: " + e.getMessage());
	  return false;
	}
  }
  
  public String getUsernameFromToken(String token) {
	return Jwts.parser()
			   .verifyWith((SecretKey) key)
			   .build()
			   .parseSignedClaims(token)
			   .getPayload()
			   .getSubject();
  }
}