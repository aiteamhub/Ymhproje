package com.healthylife.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "health_metrics")
@Data
public class HealthMetrics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private Double weight;
    
    @Column(name = "blood_pressure_systolic")
    private Integer bloodPressureSystolic;
    
    @Column(name = "blood_pressure_diastolic")
    private Integer bloodPressureDiastolic;
    
    @Column(name = "heart_rate")
    private Integer heartRate;
    
    private Integer steps;
    
    @Column(name = "recorded_at")
    private LocalDateTime recordedAt;
    
    private String notes;
} 