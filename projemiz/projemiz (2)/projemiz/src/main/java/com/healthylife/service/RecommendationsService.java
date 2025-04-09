package com.healthylife.service;

import com.healthylife.dto.HealthRecommendationDTO;
import com.healthylife.exception.ResourceNotFoundException;
import com.healthylife.mapper.HealthRecommendationMapper;
import com.healthylife.model.HealthRecommendation;
import com.healthylife.model.User;
import com.healthylife.repository.HealthRecommendationRepository;
import com.healthylife.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecommendationsService {

    private final HealthRecommendationRepository recommendationRepository;
    private final UserRepository userRepository;
    private final HealthRecommendationMapper recommendationMapper;
    private final HealthMetricsService healthMetricsService;

    public List<HealthRecommendationDTO> getUserRecommendations(Long userId) {
        return recommendationRepository.findByUserIdAndIsActiveOrderByCreatedAtDesc(userId, true)
                .stream()
                .map(recommendationMapper::toDTO)
                .collect(Collectors.toList());
    }

    public HealthRecommendationDTO getRecommendationById(Long id) {
        HealthRecommendation recommendation = recommendationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recommendation not found"));
        return recommendationMapper.toDTO(recommendation);
    }

    @Transactional
    public List<HealthRecommendationDTO> generateRecommendations(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Deactivate old recommendations
        List<HealthRecommendation> oldRecommendations = recommendationRepository
                .findByUserIdAndIsActiveOrderByCreatedAtDesc(userId, true);
        oldRecommendations.forEach(rec -> rec.setActive(false));
        recommendationRepository.saveAll(oldRecommendations);

        // Generate new recommendations based on user's health metrics
        List<HealthRecommendation> newRecommendations = generatePersonalizedRecommendations(user);
        newRecommendations = recommendationRepository.saveAll(newRecommendations);

        return newRecommendations.stream()
                .map(recommendationMapper::toDTO)
                .collect(Collectors.toList());
    }

    private List<HealthRecommendation> generatePersonalizedRecommendations(User user) {
        // This is a simplified version. In a real application, you would:
        // 1. Analyze user's health metrics
        // 2. Consider user's goals and preferences
        // 3. Apply machine learning algorithms
        // 4. Generate personalized recommendations

        HealthRecommendation recommendation = new HealthRecommendation();
        recommendation.setUser(user);
        recommendation.setTitle("Stay Active");
        recommendation.setDescription("Try to take at least 10,000 steps daily to maintain a healthy lifestyle.");
        recommendation.setCategory("Physical Activity");
        recommendation.setPriority("Medium");
        recommendation.setCreatedAt(LocalDateTime.now());
        recommendation.setValidUntil(LocalDateTime.now().plusDays(7));
        recommendation.setActive(true);

        return List.of(recommendation);
    }
} 