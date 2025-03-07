package com.revivehub.security;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {
  private final JwtUtils jwtUtils;
  private final UserDetailsService userDetailsService;
  
  public JwtAuthFilter(JwtUtils jwtUtils, UserDetailsService userDetailsService) {
	this.jwtUtils = jwtUtils;
	this.userDetailsService = userDetailsService;
  }
  
  @Override
  protected void doFilterInternal(
		  HttpServletRequest request,
		  HttpServletResponse response,
		  FilterChain filterChain
								 ) throws ServletException, IOException {
	String token = extractToken(request);
	if (token != null && jwtUtils.validateJwtToken(token)) {
	  String username = jwtUtils.getUsernameFromToken(token);
	  UserDetails userDetails = userDetailsService.loadUserByUsername(username);
	  
	  UsernamePasswordAuthenticationToken authToken =
			  new UsernamePasswordAuthenticationToken(
					  userDetails,
					  null,
					  userDetails.getAuthorities()
			  );
	  authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
	  SecurityContextHolder.getContext().setAuthentication(authToken);
	}
	filterChain.doFilter(request, response);
  }
  
  private String extractToken(HttpServletRequest request) {
	String header = request.getHeader("Authorization");
	if (header != null && header.startsWith("Bearer ")) {
	  return header.substring(7);
	}
	return null;
  }
}