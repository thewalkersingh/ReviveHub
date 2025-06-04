package com.revivehub.repository;
import com.revivehub.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long>, JpaSpecificationExecutor<Vehicle> {
   List<Vehicle> findByTypeIgnoreCase(String type);
   
   List<Vehicle> findByPriceBetween(Double minPrice, Double maxPrice);
}