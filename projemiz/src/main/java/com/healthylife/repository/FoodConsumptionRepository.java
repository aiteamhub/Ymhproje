package com.healthylife.repository;

import com.healthylife.model.FoodConsumption;
import com.healthylife.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodConsumptionRepository extends JpaRepository<FoodConsumption, Long> {
    List<FoodConsumption> findByUserOrderByConsumptionDateDesc(User user);
    List<FoodConsumption> findByUser(User user);
} 