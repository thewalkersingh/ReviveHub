package com.revivehub.service;
import com.revivehub.model.VehicleRequest;
import com.revivehub.repository.VehicleRequestRepository;
import org.springframework.stereotype.Service;

@Service
public class VehicleRequestService {
  private final VehicleRequestRepository vehicleRequestRepository;
  
  public VehicleRequestService(VehicleRequestRepository vehicleRequestRepository) {
	this.vehicleRequestRepository = vehicleRequestRepository;
  }
  
  public VehicleRequest saveRequest(VehicleRequest request) {
	return vehicleRequestRepository.save(request);
  }
}