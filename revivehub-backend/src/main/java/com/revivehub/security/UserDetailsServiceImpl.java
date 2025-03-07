package com.revivehub.security;
import com.revivehub.model.User;
import com.revivehub.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
  private final UserRepository userRepository;
  
  public UserDetailsServiceImpl(UserRepository userRepository) {
	this.userRepository = userRepository;
  }
  
  @Override
  @Transactional
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	User user = userRepository.findByUsername(username)
							  .orElseThrow(() -> new UsernameNotFoundException(
									  "User not found with username: " + username));
	
	return new UserDetailsImpl(user);
  }
}