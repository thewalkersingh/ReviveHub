package com.revivehub.service;
import com.revivehub.model.Vehicle;
import com.revivehub.repository.VehicleRepository;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {
  private final VehicleRepository vehicleRepository;
  
  public VehicleService(VehicleRepository vehicleRepository) {
	this.vehicleRepository = vehicleRepository;
  }
  
  public Vehicle saveVehicle(Vehicle vehicle) {
	return vehicleRepository.save(vehicle);
  }
   
   public List<Vehicle> getAllVehicles() {
	  return vehicleRepository.findAll();
   }
  
  public Optional<Vehicle> getVehicleById(Long id) {
	return vehicleRepository.findById(id);
  }
  
  public Optional<Vehicle> updateVehicle(Long id, Vehicle updatedVehicle) {
	return vehicleRepository.findById(id).map(existingVehicle -> {
	  existingVehicle.setManufacturer(updatedVehicle.getManufacturer());
	  existingVehicle.setName(updatedVehicle.getName());
	  existingVehicle.setColor(updatedVehicle.getColor());
	  existingVehicle.setManufactureYear(updatedVehicle.getManufactureYear());
	  existingVehicle.setRegistration(updatedVehicle.getRegistration());
	  existingVehicle.setRegistrationYear(updatedVehicle.getRegistrationYear());
	  existingVehicle.setRegistrationMonth(updatedVehicle.getRegistrationMonth());
	  existingVehicle.setEngine(updatedVehicle.getEngine());
	  existingVehicle.setFuelType(updatedVehicle.getFuelType());
	  existingVehicle.setType(updatedVehicle.getType());
	  existingVehicle.setPrice(updatedVehicle.getPrice());
	  existingVehicle.setDescription(updatedVehicle.getDescription());
	  return vehicleRepository.save(existingVehicle);
	});
  }
  
  public void deleteVehicle(Long id) {
	vehicleRepository.deleteById(id);
  }
  
  public List<Vehicle> getVehiclesByType(String type) {
	return vehicleRepository.findByTypeIgnoreCase(type);
  }
  
  public List<Vehicle> getVehiclesByPriceRange(Double min, Double max) {
	return vehicleRepository.findByPriceBetween(min, max);
  }
  
  public List<Vehicle> getVehiclesByFilters(
		  String type, String fuelType, String manufacturer,
		  Integer manufactureYear, Double minPrice, Double maxPrice) {
	Specification<Vehicle> spec = Specification.where(null);
	
	if (type != null) {
	  spec = spec.and((root, query, cb) ->
			  cb.equal(root.get("type"), type));
	}
	if (fuelType != null) {
	  spec = spec.and((root, query, cb) ->
			  cb.equal(root.get("fuelType"), fuelType));
	}
	if (manufacturer != null) {
	  spec = spec.and((root, query, cb) ->
			  cb.equal(root.get("manufacturer"), manufacturer));
	}
	if (manufactureYear != null) {
	  spec = spec.and((root, query, cb) ->
			  cb.equal(root.get("manufactureYear"), manufactureYear));
	}
	if (minPrice != null && maxPrice != null) {
	  spec = spec.and((root, query, cb) ->
			  cb.between(root.get("price"), minPrice, maxPrice));
	}
	
	return vehicleRepository.findAll(spec);
  }
}