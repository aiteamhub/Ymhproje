package com.healthylife.controller;

import com.healthylife.domain.health.FoodConsumption;
import com.healthylife.domain.user.User;
import com.healthylife.service.FoodConsumptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/food-consumption")
@RequiredArgsConstructor
public class FoodConsumptionController {
    private final FoodConsumptionService foodConsumptionService;

    @PostMapping
    public ResponseEntity<FoodConsumption> recordFoodConsumption(
            @RequestBody FoodConsumption foodConsumption,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(foodConsumptionService.recordFoodConsumption(foodConsumption, user));
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<FoodConsumption>> getFoodConsumptionsByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(foodConsumptionService.getFoodConsumptionsByUserAndDate(user, date));
    }

    @GetMapping("/date-range")
    public ResponseEntity<List<FoodConsumption>> getFoodConsumptionsByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(foodConsumptionService.getFoodConsumptionsByUserAndDateRange(user, startDate, endDate));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFoodConsumption(@PathVariable Long id) {
        foodConsumptionService.deleteFoodConsumption(id);
        return ResponseEntity.ok().build();
    }
} 