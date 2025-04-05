package com.healthylife.service;

import com.healthylife.domain.food.FoodHistory;
import com.healthylife.domain.user.User;
import com.healthylife.repository.FoodHistoryRepository;
import com.healthylife.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FoodHistoryService {

    private final FoodHistoryRepository foodHistoryRepository;
    private final UserRepository userRepository;

    public List<FoodHistory> getUserFoodHistory(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return foodHistoryRepository.findByUserOrderByConsumptionDateDesc(user);
    }

    @Transactional
    public FoodHistory addFoodHistory(String email, FoodHistory foodHistory) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        foodHistory.setUser(user);
        return foodHistoryRepository.save(foodHistory);
    }

    @Transactional
    public void deleteFoodHistory(String email, Long foodHistoryId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        FoodHistory foodHistory = foodHistoryRepository.findById(foodHistoryId)
                .orElseThrow(() -> new RuntimeException("Food history not found"));
        
        if (!foodHistory.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Not authorized to delete this food history");
        }
        
        foodHistoryRepository.delete(foodHistory);
    }
} 