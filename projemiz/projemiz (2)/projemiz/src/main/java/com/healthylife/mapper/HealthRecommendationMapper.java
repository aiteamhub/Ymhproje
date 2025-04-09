package com.healthylife.mapper;

import com.healthylife.dto.HealthRecommendationDTO;
import com.healthylife.model.HealthRecommendation;
import org.springframework.stereotype.Component;

@Component
public class HealthRecommendationMapper {
    
    public HealthRecommendationDTO toDTO(HealthRecommendation entity) {
        if (entity == null) {
            return null;
        }
        
        HealthRecommendationDTO dto = new HealthRecommendationDTO();
        dto.setId(entity.getId());
        dto.setUserId(entity.getUser().getId());
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setCategory(entity.getCategory());
        dto.setPriority(entity.getPriority());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setValidUntil(entity.getValidUntil());
        dto.setActive(entity.isActive());
        
        return dto;
    }
    
    public HealthRecommendation toEntity(HealthRecommendationDTO dto) {
        if (dto == null) {
            return null;
        }
        
        HealthRecommendation entity = new HealthRecommendation();
        entity.setId(dto.getId());
        entity.setTitle(dto.getTitle());
        entity.setDescription(dto.getDescription());
        entity.setCategory(dto.getCategory());
        entity.setPriority(dto.getPriority());
        entity.setCreatedAt(dto.getCreatedAt());
        entity.setValidUntil(dto.getValidUntil());
        entity.setActive(dto.isActive());
        
        return entity;
    }
} 