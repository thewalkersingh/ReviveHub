package com.revivehub.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "garages")
public class Garage {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  // Name of the garage
  @Column(nullable = false)
  private String name;
  
  // Location or address of the garage
  @Column(nullable = false)
  private String location;
  
  // Type of vehicle the garage services (e.g., "Bike", "Car", "Both")
  @Column(nullable = false)
  private String vehicleType;
  
  // Additional details such as contact info, hours, etc.
  @Column(length = 1024)
  private String details;
}