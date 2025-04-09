package com.healthylife.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "health_recommendations")
@Data
public class HealthRecommendation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private String category;
    
    private String priority;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "valid_until")
    private LocalDateTime validUntil;
    
    @Column(name = "is_active")
    private boolean isActive;
} 