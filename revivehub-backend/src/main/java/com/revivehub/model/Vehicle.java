package com.revivehub.model;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "vehicle")
public class Vehicle {
   @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
   
   @Column(nullable = false) private String manufacturer;
   
   @Column(nullable = false) private String name;
   
   @Column private String color;
   
   @Column private int manufactureYear;
   
   @Column private int registration;
   
   @Column private int registrationYear;
   
   @Column private int registrationMonth;
   
   @Column private double engine; // engine capacity
   
   @Column private String fuelType; // electric, petrol, cng, diesel
   
   @Column(nullable = false) private String type;  // e.g., Bike, Scooter, Car, Moped
   
   @Column(nullable = false) private double price;
   
   @Column(length = 1024) private String description;
   
   @ElementCollection
   @CollectionTable(name = "vehicle_images", joinColumns = @JoinColumn(name = "vehicle_id"))
   @Column(name = "image_url")
   private List<String> images;
}