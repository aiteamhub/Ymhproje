package com.healthylife;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.healthylife.domain")
@EnableJpaRepositories("com.healthylife.repository")
public class HealthyLifeApplication {
    public static void main(String[] args) {
        SpringApplication.run(HealthyLifeApplication.class, args);
    }
} 