package com.healthylife.domain.food;

import com.healthylife.domain.BaseEntity;
import com.healthylife.domain.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "food_history")
public class FoodHistory extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String foodName;

    @Column(columnDefinition = "TEXT")
    private String foodAnalysis;

    @Column(columnDefinition = "TEXT")
    private String aiRecommendation;

    @Column(nullable = false)
    private LocalDateTime consumptionDate;

    @Lob
    private byte[] foodImage;
} 