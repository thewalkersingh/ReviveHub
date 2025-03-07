package com.revivehub.repository;
import com.revivehub.model.VehicleRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleRequestRepository extends JpaRepository<VehicleRequest, Long> {
}