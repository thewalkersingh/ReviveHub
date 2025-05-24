package com.revivehub.service;
import java.util.HashSet;
import java.util.Set;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.revivehub.model.Role;
import com.revivehub.model.RoleType;
import com.revivehub.model.User;
import com.revivehub.repository.RoleRepository;
import com.revivehub.repository.UserRepository;
import com.revivehub.security.JwtUtils;
import com.revivehub.security.UserDetailsImpl;

@Service
public class UserService {
   private static final Logger logger = LoggerFactory.getLogger(UserService.class);
   private final UserRepository userRepository;
   private final RoleRepository roleRepository;
   private final PasswordEncoder passwordEncoder;
   private final AuthenticationManager authenticationManager;
   private final JwtUtils jwtUtils;

   public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder,
	 AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
      this.userRepository = userRepository;
      this.roleRepository = roleRepository;
      this.passwordEncoder = passwordEncoder;
      this.authenticationManager = authenticationManager;
      this.jwtUtils = jwtUtils;
   }

   public String registerUser(String username, String password) {
      if (userRepository.existsByUsername(username)) {
	 logger.warn("Attempted registration with existing username: {}", username);
	 return "Error: Username is already taken!";
      }

      User user = new User();
      user.setUsername(username);
      user.setPassword(passwordEncoder.encode(password));

      // Assign ROLE_USER by default
      Set<Role> roles = new HashSet<>();
      Role userRole = roleRepository.findByName(RoleType.ROLE_USER)
	    .orElseThrow(() -> new RuntimeException("Role not found"));
      roles.add(userRole);

      user.setRoles(roles);
      userRepository.save(user);
      logger.info("User {} registered successfully", username);
      return "User registered successfully!";
   }

   public String authenticateUser(String username, String password) {
      Authentication authentication = authenticationManager
	    .authenticate(new UsernamePasswordAuthenticationToken(username, password));

      UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
      logger.info("User {} authenticated successfully", username);
      return jwtUtils.generateJwtToken(authentication);
   }
}