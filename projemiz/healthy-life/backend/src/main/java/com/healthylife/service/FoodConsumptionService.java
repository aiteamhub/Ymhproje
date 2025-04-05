package com.healthylife.service;

import com.healthylife.domain.health.FoodConsumption;
import com.healthylife.domain.user.User;
import com.healthylife.repository.FoodConsumptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FoodConsumptionService {
    private final FoodConsumptionRepository foodConsumptionRepository;

    @Transactional
    public FoodConsumption recordFoodConsumption(FoodConsumption foodConsumption, User user) {
        foodConsumption.setUser(user);
        return foodConsumptionRepository.save(foodConsumption);
    }

    @Transactional(readOnly = true)
    public List<FoodConsumption> getFoodConsumptionsByUserAndDate(User user, LocalDate date) {
        return foodConsumptionRepository.findByUserAndDate(user, date);
    }

    @Transactional(readOnly = true)
    public List<FoodConsumption> getFoodConsumptionsByUserAndDateRange(
            User user, LocalDate startDate, LocalDate endDate) {
        return foodConsumptionRepository.findByUserAndDateBetween(user, startDate, endDate);
    }

    @Transactional
    public void deleteFoodConsumption(Long id) {
        foodConsumptionRepository.deleteById(id);
    }
} 