package com.healthylife.controller;

import com.healthylife.dto.HealthMetricsDTO;
import com.healthylife.service.HealthMetricsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/health-metrics")
@RequiredArgsConstructor
@Tag(name = "Health Metrics", description = "Health metrics management APIs")
public class HealthMetricsController {

    private final HealthMetricsService healthMetricsService;

    @PostMapping
    @Operation(summary = "Record new health metrics")
    public ResponseEntity<HealthMetricsDTO> recordMetrics(@RequestBody HealthMetricsDTO metrics) {
        return ResponseEntity.ok(healthMetricsService.recordMetrics(metrics));
    }

    @GetMapping("/user/{userId}")
    @Operation(summary = "Get user's health metrics history")
    public ResponseEntity<List<HealthMetricsDTO>> getUserMetrics(@PathVariable Long userId) {
        return ResponseEntity.ok(healthMetricsService.getUserMetrics(userId));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get specific health metrics by ID")
    public ResponseEntity<HealthMetricsDTO> getMetricsById(@PathVariable Long id) {
        return ResponseEntity.ok(healthMetricsService.getMetricsById(id));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update health metrics")
    public ResponseEntity<HealthMetricsDTO> updateMetrics(@PathVariable Long id, @RequestBody HealthMetricsDTO metrics) {
        return ResponseEntity.ok(healthMetricsService.updateMetrics(id, metrics));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete health metrics")
    public ResponseEntity<Void> deleteMetrics(@PathVariable Long id) {
        healthMetricsService.deleteMetrics(id);
        return ResponseEntity.ok().build();
    }
} 