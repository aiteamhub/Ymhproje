package com.healthylife.repository;

import com.healthylife.model.FoodConsumption;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface FoodConsumptionRepository extends JpaRepository<FoodConsumption, Long> {
    List<FoodConsumption> findByUserIdOrderByConsumptionTimeDesc(Long userId);
    List<FoodConsumption> findByUserIdAndConsumptionTimeBetweenOrderByConsumptionTimeDesc(
        Long userId, LocalDateTime startTime, LocalDateTime endTime);
} 