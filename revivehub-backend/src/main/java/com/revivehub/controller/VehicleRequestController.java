package com.revivehub.controller;
import com.revivehub.model.VehicleRequest;
import com.revivehub.service.VehicleRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/services/")
public class VehicleRequestController {
  private final VehicleRequestService vehicleRequestService;
  
  public VehicleRequestController(VehicleRequestService vehicleRequestService) {
	this.vehicleRequestService = vehicleRequestService;
  }
  
  @PostMapping("/vehicle_request")
  public ResponseEntity<?> createVehicleRequest(@RequestBody VehicleRequest vehicleRequest) {
	vehicleRequestService.saveRequest(vehicleRequest);
	return ResponseEntity.ok("Request Submitted Successfully!");
  }
}