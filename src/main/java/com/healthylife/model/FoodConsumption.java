package com.healthylife.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "food_consumptions")
public class FoodConsumption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String foodName;

    @Column(nullable = false)
    private Double quantity;

    private String unit;

    @Column(name = "consumption_time")
    private LocalDateTime consumptionTime;

    @Column(columnDefinition = "TEXT")
    private String analysis;

    @Column(name = "nutritional_info", columnDefinition = "TEXT")
    private String nutritionalInfo;

    @Column(name = "health_impact", columnDefinition = "TEXT")
    private String healthImpact;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
} 