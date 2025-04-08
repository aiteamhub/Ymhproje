package com.healthylife.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;

@Service
public class OpenAIService {
    private final String apiKey;
    private final RestTemplate restTemplate;
    private final String apiUrl = "https://api.openai.com/v1/chat/completions";

    public OpenAIService(@Value("${openai.api.key}") String apiKey) {
        this.apiKey = apiKey;
        this.restTemplate = new RestTemplate();
    }

    public String analyzeFood(String foodName, Double quantity, String unit) {
        String prompt = String.format(
            "Analyze the health impact of consuming %f %s of %s. " +
            "Include nutritional information, health benefits, and potential risks. " +
            "Format the response in a clear, structured way.",
            quantity, unit, foodName
        );

        return callOpenAI(prompt, 500);
    }

    public String generateHealthReport(String userProfile, String foodHistory) {
        String prompt = String.format(
            "Based on the following user profile and food consumption history, " +
            "generate a comprehensive health report with diet analysis and recommendations:\n\n" +
            "User Profile: %s\n\n" +
            "Food History: %s",
            userProfile, foodHistory
        );

        return callOpenAI(prompt, 1000);
    }

    private String callOpenAI(String prompt, int maxTokens) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        Map<String, Object> message = new HashMap<>();
        message.put("role", "user");
        message.put("content", prompt);

        List<Map<String, Object>> messages = new ArrayList<>();
        messages.add(message);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-3.5-turbo");
        requestBody.put("messages", messages);
        requestBody.put("max_tokens", maxTokens);
        requestBody.put("temperature", 0.7);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
        
        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl, request, Map.class);
            Map<String, Object> responseBody = response.getBody();
            
            if (responseBody != null && responseBody.containsKey("choices")) {
                List<Map<String, Object>> choices = (List<Map<String, Object>>) responseBody.get("choices");
                if (!choices.isEmpty()) {
                    Map<String, Object> choice = choices.get(0);
                    Map<String, Object> messageResponse = (Map<String, Object>) choice.get("message");
                    return (String) messageResponse.get("content");
                }
            }
            
            return "Unable to generate response from OpenAI";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error calling OpenAI API: " + e.getMessage();
        }
    }
} 