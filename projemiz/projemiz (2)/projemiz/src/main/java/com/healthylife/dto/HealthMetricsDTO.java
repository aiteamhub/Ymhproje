package com.healthylife.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class HealthMetricsDTO {
    private Long id;
    private Long userId;
    private Double weight;
    private Integer bloodPressureSystolic;
    private Integer bloodPressureDiastolic;
    private Integer heartRate;
    private Integer steps;
    private LocalDateTime recordedAt;
    private String notes;
} 