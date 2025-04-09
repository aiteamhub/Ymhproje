package com.healthylife.repository;

import com.healthylife.model.HealthMetrics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HealthMetricsRepository extends JpaRepository<HealthMetrics, Long> {
    List<HealthMetrics> findByUserIdOrderByRecordedAtDesc(Long userId);
} 