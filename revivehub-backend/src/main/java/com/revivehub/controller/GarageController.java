package com.revivehub.controller;

import com.revivehub.model.Garage;
import com.revivehub.service.GarageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/garages")
@CrossOrigin(origins = "http://localhost:5173")  // Adjust as needed
public class GarageController {
  
  private final GarageService garageService;
  
  public GarageController(GarageService garageService) {
	this.garageService = garageService;
  }
  
  // Admin endpoint to add a new garage
  @PostMapping
  public ResponseEntity<?> addGarage(@RequestBody Garage garage) {
	Garage savedGarage = garageService.saveGarage(garage);
	return ResponseEntity.ok(savedGarage);
  }
  
  // Public endpoint to get garages; if vehicleType is provided, filter by that
  @GetMapping
  public ResponseEntity<List<Garage>> getGarages(
		  @RequestParam(value = "vehicleType", required = false) String vehicleType) {
	if (vehicleType != null && !vehicleType.isEmpty()) {
	  return ResponseEntity.ok(garageService.getGaragesByVehicleType(vehicleType));
	} else {
	  return ResponseEntity.ok(garageService.getAllGarages());
	}
  }
}