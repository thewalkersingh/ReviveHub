package com.revivehub.security;
import com.revivehub.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class UserDetailsImpl implements UserDetails {
  private final String username;
  private final String password;
  
  public UserDetailsImpl(User user) {
	this.username = user.getUsername();
	this.password = user.getPassword();
  }
  
  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
	return List.of(); // No roles for now, add later if needed
  }
  
  @Override
  public String getPassword() {
	return password;
  }
  
  @Override
  public String getUsername() {
	return username;
  }
  
  @Override
  public boolean isAccountNonExpired() {
	return true;
  }
  
  @Override
  public boolean isAccountNonLocked() {
	return true;
  }
  
  @Override
  public boolean isCredentialsNonExpired() {
	return true;
  }
  
  @Override
  public boolean isEnabled() {
	return true;
  }
}