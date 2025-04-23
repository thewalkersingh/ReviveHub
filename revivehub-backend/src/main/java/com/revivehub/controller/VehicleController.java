package com.revivehub.controller;
import com.revivehub.model.Vehicle;
import com.revivehub.service.VehicleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
//@CrossOrigin(origins = "http://localhost:5173")
public class VehicleController {
   private final VehicleService vehicleService;
   
   public VehicleController(VehicleService vehicleService) {
	  this.vehicleService = vehicleService;
   }
   
   //  @GetMapping
   //  public ResponseEntity<List<Vehicle>> getAllVehicles() {
   //	List<Vehicle> vehicles = vehicleService.getAllVehicles();
   //	return ResponseEntity.ok(vehicles);
   //  }
   @GetMapping("/all")
   public ResponseEntity<List<Vehicle>> getAllVehicles(
		   @RequestParam(required = false) String type,
		   @RequestParam(required = false) String fuelType,
		   @RequestParam(required = false) String manufacturer,
		   @RequestParam(required = false) Integer manufactureYear,
		   @RequestParam(required = false) Double minPrice,
		   @RequestParam(required = false) Double maxPrice
													  ) {
	  List<Vehicle> vehicles = vehicleService.getVehiclesByFilters(
			  type, fuelType, manufacturer,
			  manufactureYear, minPrice, maxPrice);
	  return ResponseEntity.ok(vehicles);
   }
   
   @GetMapping("/type/{type}")
   public ResponseEntity<List<Vehicle>> getVehiclesByType(@PathVariable String type) {
	  return ResponseEntity.ok(vehicleService.getVehiclesByType(type));
   }
   
   @GetMapping("/price-range")
   public ResponseEntity<List<Vehicle>> getVehiclesByPriceRange(
		   @RequestParam Double min,
		   @RequestParam Double max
															   ) {
	  return ResponseEntity.ok(vehicleService.getVehiclesByPriceRange(min, max));
   }
   
   @GetMapping("/{id}")
   public ResponseEntity<Vehicle> getVehicle(@PathVariable Long id) {
	  Vehicle vehicle = vehicleService.getVehicleById(id)
									  .orElseThrow(() -> new RuntimeException("Vehicle not found"));
	  return ResponseEntity.ok(vehicle);
   }
   
   // All admin methods
   @PostMapping
   public ResponseEntity<Vehicle> createVehicle(@RequestBody Vehicle vehicle) {
	  Vehicle createdVehicle = vehicleService.saveVehicle(vehicle);
	  return ResponseEntity.ok(createdVehicle);
   }
   
   @PutMapping("/{id}")
   public ResponseEntity<Vehicle> updateVehicle(@PathVariable Long id, @RequestBody Vehicle updatedVehicle) {
	  return vehicleService.updateVehicle(id, updatedVehicle)
						   .map(ResponseEntity::ok)
						   .orElse(ResponseEntity.notFound().build());
   }
   
   @DeleteMapping("/{id}")
   public ResponseEntity<?> deleteVehicle(@PathVariable Long id) {
	  vehicleService.deleteVehicle(id);
	  return ResponseEntity.ok("Vehicle deleted successfully");
   }
   
   // New endpoint for uploading images to a vehicle
   @PostMapping("/{id}/upload-images")
   public ResponseEntity<?> uploadImages(@PathVariable Long id, @RequestParam("files") MultipartFile[] files) {
	  Vehicle vehicle = vehicleService.getVehicleById(id)
									  .orElseThrow(() -> new RuntimeException("Vehicle not found"));
	  List<String> imageUrls = new ArrayList<>();
	  
	  for (MultipartFile file : files) {
		 String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
		 try {
			Path uploadPath = Paths.get("uploads");
			if (!Files.exists(uploadPath)) {
			   Files.createDirectories(uploadPath);
			}
			Path filePath = uploadPath.resolve(fileName);
			Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
			// Construct URL (adjust if needed; this assumes the 'uploads' folder is served statically)
			imageUrls.add("http://localhost:8080/uploads/" + fileName);
		 } catch (IOException ex) {
			return ResponseEntity.status(500).body("Failed to upload files");
		 }
	  }
	  // Merge with existing images if any
	  List<String> existingImages = vehicle.getImages() != null ? vehicle.getImages() : new ArrayList<>();
	  existingImages.addAll(imageUrls);
	  vehicle.setImages(existingImages);
	  vehicleService.saveVehicle(vehicle);
	  
	  return ResponseEntity.ok(vehicle);
   }
}