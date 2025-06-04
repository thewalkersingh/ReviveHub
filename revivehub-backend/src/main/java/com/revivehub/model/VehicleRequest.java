package com.revivehub.model;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "vehicle_requests")
public class VehicleRequest {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @Column(nullable = false)
  private String name;
  
  @Column(nullable = false)
  private String email;
  
  @Column(nullable = false)
  private String phone;
  
  @Column(nullable = false)
  private String vehicleDetails;
  
  @Column(length = 1024)
  private String message;
  
  @Column(nullable = false)
  private LocalDateTime createdAt = LocalDateTime.now();
}