package com.healthylife.controller;

import com.healthylife.model.FoodConsumption;
import com.healthylife.model.HealthReport;
import com.healthylife.model.User;
import com.healthylife.service.FoodAnalysisService;
import com.healthylife.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/food-analysis")
public class FoodAnalysisController {
    private final FoodAnalysisService foodAnalysisService;
    private final UserService userService;

    @Autowired
    public FoodAnalysisController(FoodAnalysisService foodAnalysisService, UserService userService) {
        this.foodAnalysisService = foodAnalysisService;
        this.userService = userService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<FoodConsumption> analyzeFood(
            @RequestParam Long userId,
            @RequestParam String foodName,
            @RequestParam Double quantity,
            @RequestParam String unit) {
        
        User user = userService.getUserById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        FoodConsumption analysis = foodAnalysisService.analyzeFoodConsumption(
                user, foodName, quantity, unit);
        
        return ResponseEntity.ok(analysis);
    }

    @GetMapping("/history/{userId}")
    public ResponseEntity<List<FoodConsumption>> getUserFoodHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(foodAnalysisService.getUserFoodHistory(userId));
    }

    @GetMapping("/health-report/{userId}")
    public ResponseEntity<HealthReport> generateHealthReport(@PathVariable Long userId) {
        User user = userService.getUserById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        HealthReport report = foodAnalysisService.generateHealthReport(user);
        return ResponseEntity.ok(report);
    }
} 