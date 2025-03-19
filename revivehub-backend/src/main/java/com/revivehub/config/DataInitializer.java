package com.revivehub.config;
import com.revivehub.model.Role;
import com.revivehub.model.RoleType;
import com.revivehub.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
   private final RoleRepository roleRepository;
   
   public DataInitializer(RoleRepository roleRepository) {
	  this.roleRepository = roleRepository;
   }
   
   @Override public void run(String... args) throws Exception {
	  // Check and insert ROLE_USER
	  if (roleRepository.findByName(RoleType.ROLE_USER).isEmpty()) {
		 Role userRole = new Role();
		 userRole.setName(RoleType.ROLE_USER);
		 roleRepository.save(userRole);
		 System.out.println("ROLE_USER created.");
	  }
	  
	  // Check and insert ROLE_ADMIN
	  if (roleRepository.findByName(RoleType.ROLE_ADMIN).isEmpty()) {
		 Role adminRole = new Role();
		 adminRole.setName(RoleType.ROLE_ADMIN);
		 roleRepository.save(adminRole);
		 System.out.println("ROLE_ADMIN created.");
	  }
   }
}