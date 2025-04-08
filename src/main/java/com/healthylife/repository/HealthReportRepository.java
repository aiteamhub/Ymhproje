package com.healthylife.repository;

import com.healthylife.model.HealthReport;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HealthReportRepository extends JpaRepository<HealthReport, Long> {
    List<HealthReport> findByUserIdOrderByReportDateDesc(Long userId);
    List<HealthReport> findTop10ByUserIdOrderByReportDateDesc(Long userId);
} 