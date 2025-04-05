package com.healthylife.service;

import com.healthylife.domain.health.HealthProfile;
import com.healthylife.domain.user.User;
import com.healthylife.repository.HealthProfileRepository;
import com.healthylife.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HealthProfileService {

    private final HealthProfileRepository healthProfileRepository;
    private final UserRepository userRepository;

    public HealthProfile getHealthProfileByUserEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return healthProfileRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Health profile not found"));
    }

    @Transactional
    public HealthProfile createHealthProfile(String email, HealthProfile healthProfile) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        healthProfile.setUser(user);
        return healthProfileRepository.save(healthProfile);
    }

    @Transactional
    public HealthProfile updateHealthProfile(String email, HealthProfile healthProfile) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        HealthProfile existingProfile = healthProfileRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Health profile not found"));
        
        existingProfile.setHeight(healthProfile.getHeight());
        existingProfile.setWeight(healthProfile.getWeight());
        existingProfile.setBirthDate(healthProfile.getBirthDate());
        existingProfile.setGender(healthProfile.getGender());
        existingProfile.setMedicalConditions(healthProfile.getMedicalConditions());
        existingProfile.setAllergies(healthProfile.getAllergies());
        existingProfile.setMedications(healthProfile.getMedications());
        existingProfile.setDietaryRestrictions(healthProfile.getDietaryRestrictions());
        existingProfile.setFitnessGoals(healthProfile.getFitnessGoals());
        existingProfile.setNotes(healthProfile.getNotes());
        existingProfile.setActivityLevel(healthProfile.getActivityLevel());
        
        return healthProfileRepository.save(existingProfile);
    }

    @Transactional
    public void deleteHealthProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        HealthProfile healthProfile = healthProfileRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Health profile not found"));
        healthProfileRepository.delete(healthProfile);
    }

    @Transactional(readOnly = true)
    public double calculateBMI(HealthProfile healthProfile) {
        double heightInMeters = healthProfile.getHeight() / 100.0;
        return healthProfile.getWeight() / (heightInMeters * heightInMeters);
    }

    @Transactional(readOnly = true)
    public String getBMICategory(double bmi) {
        if (bmi < 18.5) return "Underweight";
        if (bmi < 25) return "Normal weight";
        if (bmi < 30) return "Overweight";
        return "Obese";
    }
} 