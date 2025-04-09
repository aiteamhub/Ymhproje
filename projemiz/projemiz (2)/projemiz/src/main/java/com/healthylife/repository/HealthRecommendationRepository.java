package com.healthylife.repository;

import com.healthylife.model.HealthRecommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HealthRecommendationRepository extends JpaRepository<HealthRecommendation, Long> {
    List<HealthRecommendation> findByUserIdAndIsActiveOrderByCreatedAtDesc(Long userId, boolean isActive);
    List<HealthRecommendation> findByUserIdOrderByCreatedAtDesc(Long userId);
} 