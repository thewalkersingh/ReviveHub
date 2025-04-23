package com.revivehub.config;
import com.revivehub.security.JwtAuthFilter;
import com.revivehub.security.JwtUtils;
import com.revivehub.security.UserDetailsServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
   private final JwtUtils jwtUtils;
   private final UserDetailsServiceImpl userDetailsService;
   
   public SecurityConfig(
		   JwtUtils jwtUtils,
		   UserDetailsServiceImpl userDetailsService) {
	  this.jwtUtils = jwtUtils;
	  this.userDetailsService = userDetailsService;
   }
   
   @Bean
   public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	  http
			  .csrf(AbstractHttpConfigurer::disable)
			  .cors(cors -> cors.configurationSource(corsConfigurationSource()))
			  .authorizeHttpRequests(auth -> auth
					  .requestMatchers("/api/auth/**").permitAll()
					  .requestMatchers(HttpMethod.GET, "/api/vehicles/**").permitAll()
					  .requestMatchers("/api/services/**").permitAll()
					  .anyRequest().authenticated())
			  .sessionManagement(session -> session
					  .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
			  .addFilterBefore(
					  new JwtAuthFilter(jwtUtils, userDetailsService),
					  UsernamePasswordAuthenticationFilter.class);
	  
	  return http.build();
   }
   
   @Bean
   public CorsConfigurationSource corsConfigurationSource() {
	  CorsConfiguration configuration = new CorsConfiguration();
	  // Use allowedOriginPatterns instead of allowedOrigins for flexibility
	  configuration.setAllowedOriginPatterns(List.of(
			  "http://localhost:[*]", // All ports from localhost
			  "https://*.revivehubauto.com", // All subdomains
			  "https://revivehubauto.com" // Production domain
													));
	  configuration.setAllowedMethods(List.of(
			  "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
	  configuration.setAllowedHeaders(List.of(
			  "Authorization",
			  "Cache-Control",
			  "Content-Type",
			  "X-Requested-With",
			  "Accept",
			  "Origin"));
	  configuration.setExposedHeaders(List.of(
			  "Content-Disposition", // For file downloads
			  "X-Total-Count")); // Custom headers
	  
	  configuration.setAllowCredentials(true);
	  configuration.setMaxAge(3600L); // 1 hour preflight cache
	  
	  UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	  source.registerCorsConfiguration("/**", configuration);
	  return source;
   }
   
   @Bean
   public PasswordEncoder passwordEncoder() {
	  return new BCryptPasswordEncoder();
   }
   
   @Bean
   public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
	  return authConfig.getAuthenticationManager();
   }
}