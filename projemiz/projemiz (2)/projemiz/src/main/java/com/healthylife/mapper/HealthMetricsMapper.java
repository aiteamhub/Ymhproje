package com.healthylife.mapper;

import com.healthylife.dto.HealthMetricsDTO;
import com.healthylife.model.HealthMetrics;
import org.springframework.stereotype.Component;

@Component
public class HealthMetricsMapper {
    
    public HealthMetricsDTO toDTO(HealthMetrics entity) {
        if (entity == null) {
            return null;
        }
        
        HealthMetricsDTO dto = new HealthMetricsDTO();
        dto.setId(entity.getId());
        dto.setUserId(entity.getUser().getId());
        dto.setWeight(entity.getWeight());
        dto.setBloodPressureSystolic(entity.getBloodPressureSystolic());
        dto.setBloodPressureDiastolic(entity.getBloodPressureDiastolic());
        dto.setHeartRate(entity.getHeartRate());
        dto.setSteps(entity.getSteps());
        dto.setRecordedAt(entity.getRecordedAt());
        dto.setNotes(entity.getNotes());
        
        return dto;
    }
    
    public HealthMetrics toEntity(HealthMetricsDTO dto) {
        if (dto == null) {
            return null;
        }
        
        HealthMetrics entity = new HealthMetrics();
        entity.setId(dto.getId());
        entity.setWeight(dto.getWeight());
        entity.setBloodPressureSystolic(dto.getBloodPressureSystolic());
        entity.setBloodPressureDiastolic(dto.getBloodPressureDiastolic());
        entity.setHeartRate(dto.getHeartRate());
        entity.setSteps(dto.getSteps());
        entity.setRecordedAt(dto.getRecordedAt());
        entity.setNotes(dto.getNotes());
        
        return entity;
    }
    
    public void updateEntityFromDTO(HealthMetricsDTO dto, HealthMetrics entity) {
        if (dto == null || entity == null) {
            return;
        }
        
        entity.setWeight(dto.getWeight());
        entity.setBloodPressureSystolic(dto.getBloodPressureSystolic());
        entity.setBloodPressureDiastolic(dto.getBloodPressureDiastolic());
        entity.setHeartRate(dto.getHeartRate());
        entity.setSteps(dto.getSteps());
        entity.setRecordedAt(dto.getRecordedAt());
        entity.setNotes(dto.getNotes());
    }
} 