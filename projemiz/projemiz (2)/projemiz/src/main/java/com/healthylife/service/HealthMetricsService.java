package com.healthylife.service;

import com.healthylife.dto.HealthMetricsDTO;
import com.healthylife.exception.ResourceNotFoundException;
import com.healthylife.mapper.HealthMetricsMapper;
import com.healthylife.model.HealthMetrics;
import com.healthylife.model.User;
import com.healthylife.repository.HealthMetricsRepository;
import com.healthylife.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HealthMetricsService {

    private final HealthMetricsRepository healthMetricsRepository;
    private final UserRepository userRepository;
    private final HealthMetricsMapper healthMetricsMapper;

    @Transactional
    public HealthMetricsDTO recordMetrics(HealthMetricsDTO metricsDTO) {
        User user = userRepository.findById(metricsDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        HealthMetrics metrics = healthMetricsMapper.toEntity(metricsDTO);
        metrics.setUser(user);
        metrics = healthMetricsRepository.save(metrics);
        
        return healthMetricsMapper.toDTO(metrics);
    }

    public List<HealthMetricsDTO> getUserMetrics(Long userId) {
        return healthMetricsRepository.findByUserIdOrderByRecordedAtDesc(userId)
                .stream()
                .map(healthMetricsMapper::toDTO)
                .collect(Collectors.toList());
    }

    public HealthMetricsDTO getMetricsById(Long id) {
        HealthMetrics metrics = healthMetricsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Health metrics not found"));
        return healthMetricsMapper.toDTO(metrics);
    }

    @Transactional
    public HealthMetricsDTO updateMetrics(Long id, HealthMetricsDTO metricsDTO) {
        HealthMetrics existingMetrics = healthMetricsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Health metrics not found"));
        
        healthMetricsMapper.updateEntityFromDTO(metricsDTO, existingMetrics);
        existingMetrics = healthMetricsRepository.save(existingMetrics);
        
        return healthMetricsMapper.toDTO(existingMetrics);
    }

    @Transactional
    public void deleteMetrics(Long id) {
        if (!healthMetricsRepository.existsById(id)) {
            throw new ResourceNotFoundException("Health metrics not found");
        }
        healthMetricsRepository.deleteById(id);
    }
} 