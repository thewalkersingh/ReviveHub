package com.revivehub.service;

import com.revivehub.model.Garage;
import com.revivehub.repository.GarageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GarageService {
  
  private final GarageRepository garageRepository;
  
  public GarageService(GarageRepository garageRepository) {
	this.garageRepository = garageRepository;
  }
  
  public Garage saveGarage(Garage garage) {
	return garageRepository.save(garage);
  }
  
  public List<Garage> getAllGarages() {
	return garageRepository.findAll();
  }
  
  public List<Garage> getGaragesByVehicleType(String vehicleType) {
	return garageRepository.findByVehicleType(vehicleType);
  }
}