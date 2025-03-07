package com.revivehub.repository;

import com.revivehub.model.Garage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GarageRepository extends JpaRepository<Garage, Long> {
  // Find garages by the type of vehicle they service
  List<Garage> findByVehicleType(String vehicleType);
}