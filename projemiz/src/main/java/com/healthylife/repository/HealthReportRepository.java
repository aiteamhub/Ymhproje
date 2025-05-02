package com.healthylife.repository;

import com.healthylife.model.HealthReport;
import com.healthylife.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface HealthReportRepository extends JpaRepository<HealthReport, Long> {
    List<HealthReport> findByUserOrderByReportDateDesc(User user);
    List<HealthReport> findByUserAndReportDateBetween(User user, LocalDateTime startDate, LocalDateTime endDate);
} 