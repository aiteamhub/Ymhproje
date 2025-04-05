package com.healthylife.controller;

import com.healthylife.domain.health.HealthProfile;
import com.healthylife.service.HealthProfileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/health-profiles")
@RequiredArgsConstructor
@Tag(name = "Health Profile", description = "Health Profile management APIs")
public class HealthProfileController {

    private final HealthProfileService healthProfileService;

    @GetMapping
    @Operation(summary = "Get user's health profile")
    public ResponseEntity<HealthProfile> getHealthProfile(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(healthProfileService.getHealthProfileByUserEmail(userDetails.getUsername()));
    }

    @PostMapping
    @Operation(summary = "Create health profile")
    public ResponseEntity<HealthProfile> createHealthProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody HealthProfile healthProfile) {
        return ResponseEntity.ok(healthProfileService.createHealthProfile(userDetails.getUsername(), healthProfile));
    }

    @PutMapping
    @Operation(summary = "Update health profile")
    public ResponseEntity<HealthProfile> updateHealthProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody HealthProfile healthProfile) {
        return ResponseEntity.ok(healthProfileService.updateHealthProfile(userDetails.getUsername(), healthProfile));
    }

    @DeleteMapping
    @Operation(summary = "Delete health profile")
    public ResponseEntity<Void> deleteHealthProfile(@AuthenticationPrincipal UserDetails userDetails) {
        healthProfileService.deleteHealthProfile(userDetails.getUsername());
        return ResponseEntity.ok().build();
    }
} 