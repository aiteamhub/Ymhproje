package com.healthylife.config;

import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;
import org.springframework.context.annotation.Configuration;

/**
 * Configures Jakarta RESTful Web Services for the application.
 */
@Configuration
@ApplicationPath("/api")
public class JakartaRestConfiguration extends Application {
    // Configuration class for Jakarta REST API
} 