package com.healthylife.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class HealthRecommendationDTO {
    private Long id;
    private Long userId;
    private String title;
    private String description;
    private String category;
    private String priority;
    private LocalDateTime createdAt;
    private LocalDateTime validUntil;
    private boolean isActive;
} 