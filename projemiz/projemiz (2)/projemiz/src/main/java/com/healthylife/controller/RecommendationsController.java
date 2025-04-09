package com.healthylife.controller;

import com.healthylife.dto.HealthRecommendationDTO;
import com.healthylife.service.RecommendationsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
@RequiredArgsConstructor
@Tag(name = "Health Recommendations", description = "Health recommendations management APIs")
public class RecommendationsController {

    private final RecommendationsService recommendationsService;

    @GetMapping("/user/{userId}")
    @Operation(summary = "Get personalized health recommendations for user")
    public ResponseEntity<List<HealthRecommendationDTO>> getUserRecommendations(@PathVariable Long userId) {
        return ResponseEntity.ok(recommendationsService.getUserRecommendations(userId));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get specific recommendation by ID")
    public ResponseEntity<HealthRecommendationDTO> getRecommendationById(@PathVariable Long id) {
        return ResponseEntity.ok(recommendationsService.getRecommendationById(id));
    }

    @PostMapping("/generate")
    @Operation(summary = "Generate new recommendations for user")
    public ResponseEntity<List<HealthRecommendationDTO>> generateRecommendations(@RequestParam Long userId) {
        return ResponseEntity.ok(recommendationsService.generateRecommendations(userId));
    }
} 