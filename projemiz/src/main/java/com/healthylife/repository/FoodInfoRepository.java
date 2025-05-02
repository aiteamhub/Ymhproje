package com.healthylife.repository;

import com.healthylife.model.FoodInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FoodInfoRepository extends JpaRepository<FoodInfo, Long> {
    List<FoodInfo> findByNameContainingIgnoreCase(String name);
    List<FoodInfo> findByCategory(String category);
} 