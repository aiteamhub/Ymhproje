package com.healthylife.service;

import com.healthylife.model.FoodConsumption;
import com.healthylife.model.FoodInfo;
import com.healthylife.model.HealthReport;
import com.healthylife.model.User;
import com.healthylife.repository.FoodConsumptionRepository;
import com.healthylife.repository.FoodInfoRepository;
import com.healthylife.repository.HealthReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class FoodAnalysisService {
    private final FoodConsumptionRepository foodConsumptionRepository;
    private final FoodInfoRepository foodInfoRepository;
    private final HealthReportRepository healthReportRepository;
    private final OpenAIService openAIService;

    @Autowired
    public FoodAnalysisService(
            FoodConsumptionRepository foodConsumptionRepository,
            FoodInfoRepository foodInfoRepository,
            HealthReportRepository healthReportRepository,
            OpenAIService openAIService) {
        this.foodConsumptionRepository = foodConsumptionRepository;
        this.foodInfoRepository = foodInfoRepository;
        this.healthReportRepository = healthReportRepository;
        this.openAIService = openAIService;
    }

    public FoodConsumption analyzeFoodConsumption(User user, String foodName, Double quantity, String unit) {
        // Get or create food info
        FoodInfo foodInfo = foodInfoRepository.findByName(foodName)
                .orElseGet(() -> createFoodInfo(foodName));

        // Create food consumption record
        FoodConsumption consumption = new FoodConsumption();
        consumption.setUser(user);
        consumption.setFoodName(foodName);
        consumption.setQuantity(quantity);
        consumption.setUnit(unit);
        consumption.setConsumptionTime(LocalDateTime.now());

        // Get AI analysis
        String analysis = openAIService.analyzeFood(foodName, quantity, unit);
        consumption.setAnalysis(analysis);
        consumption.setNutritionalInfo(foodInfo.getNutritionalInfo());
        consumption.setHealthImpact(foodInfo.getHealthBenefits() + "\n\nPotential Risks:\n" + foodInfo.getPotentialRisks());

        return foodConsumptionRepository.save(consumption);
    }

    private FoodInfo createFoodInfo(String foodName) {
        FoodInfo foodInfo = new FoodInfo();
        foodInfo.setName(foodName);
        // Additional food info can be populated from external APIs or databases
        return foodInfoRepository.save(foodInfo);
    }

    public List<FoodConsumption> getUserFoodHistory(Long userId) {
        return foodConsumptionRepository.findByUserIdOrderByConsumptionTimeDesc(userId);
    }

    public HealthReport generateHealthReport(User user) {
        List<FoodConsumption> recentConsumptions = foodConsumptionRepository
                .findByUserIdOrderByConsumptionTimeDesc(user.getId());

        String userProfile = String.format(
            "Age: %d, Weight: %.1f, Height: %.1f, Gender: %s, Health Conditions: %s",
            user.getAge(), user.getWeight(), user.getHeight(), user.getGender(), user.getHealthConditions()
        );

        String foodHistory = recentConsumptions.stream()
                .map(fc -> String.format("%s: %.1f %s", fc.getFoodName(), fc.getQuantity(), fc.getUnit()))
                .reduce("", (a, b) -> a + "\n" + b);

        String aiAnalysis = openAIService.generateHealthReport(userProfile, foodHistory);

        HealthReport report = new HealthReport();
        report.setUser(user);
        report.setReportDate(LocalDateTime.now());
        report.setSummary(aiAnalysis);
        report.setDietAnalysis(analyzeDiet(recentConsumptions));
        report.setHealthRecommendations(generateRecommendations(aiAnalysis));
        report.setRiskAssessment(assessRisks(recentConsumptions, user));

        return healthReportRepository.save(report);
    }

    private String analyzeDiet(List<FoodConsumption> consumptions) {
        // Implement diet analysis logic
        return "Diet analysis based on consumption history";
    }

    private String generateRecommendations(String aiAnalysis) {
        // Implement recommendation generation logic
        return "Health recommendations based on AI analysis";
    }

    private String assessRisks(List<FoodConsumption> consumptions, User user) {
        // Implement risk assessment logic
        return "Risk assessment based on consumption history and user profile";
    }
} 