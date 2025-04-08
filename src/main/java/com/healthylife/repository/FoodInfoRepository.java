package com.healthylife.repository;

import com.healthylife.model.FoodInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface FoodInfoRepository extends JpaRepository<FoodInfo, Long> {
    Optional<FoodInfo> findByName(String name);
    List<FoodInfo> findByCategory(String category);
    List<FoodInfo> findByNameContainingIgnoreCase(String name);
} 