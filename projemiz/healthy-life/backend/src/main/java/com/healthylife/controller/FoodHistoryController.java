package com.healthylife.controller;

import com.healthylife.domain.food.FoodHistory;
import com.healthylife.service.FoodHistoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/food-history")
@RequiredArgsConstructor
@Tag(name = "Food History", description = "Food History management APIs")
public class FoodHistoryController {

    private final FoodHistoryService foodHistoryService;

    @GetMapping
    @Operation(summary = "Get user's food history")
    public ResponseEntity<List<FoodHistory>> getFoodHistory(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(foodHistoryService.getUserFoodHistory(userDetails.getUsername()));
    }

    @PostMapping
    @Operation(summary = "Add food history entry")
    public ResponseEntity<FoodHistory> addFoodHistory(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody FoodHistory foodHistory) {
        return ResponseEntity.ok(foodHistoryService.addFoodHistory(userDetails.getUsername(), foodHistory));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete food history entry")
    public ResponseEntity<Void> deleteFoodHistory(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id) {
        foodHistoryService.deleteFoodHistory(userDetails.getUsername(), id);
        return ResponseEntity.ok().build();
    }
} 