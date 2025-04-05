package com.healthylife.repository;

import com.healthylife.domain.health.FoodConsumption;
import com.healthylife.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface FoodConsumptionRepository extends JpaRepository<FoodConsumption, Long> {
    List<FoodConsumption> findByUserAndDate(User user, LocalDate date);
    List<FoodConsumption> findByUserAndDateBetween(User user, LocalDate startDate, LocalDate endDate);
    
    @Query("SELECT fc FROM FoodConsumption fc WHERE fc.user = :user ORDER BY fc.date DESC")
    List<FoodConsumption> findByUserOrderByDateDesc(@Param("user") User user);
    
    @Query("SELECT SUM(fc.calories) FROM FoodConsumption fc WHERE fc.user = :user AND fc.date = :date")
    Double calculateTotalCaloriesForDate(@Param("user") User user, @Param("date") LocalDate date);
    
    @Query("SELECT SUM(fc.calories) FROM FoodConsumption fc WHERE fc.user = :user AND fc.date BETWEEN :startDate AND :endDate")
    Double calculateTotalCaloriesForDateRange(@Param("user") User user, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
} 