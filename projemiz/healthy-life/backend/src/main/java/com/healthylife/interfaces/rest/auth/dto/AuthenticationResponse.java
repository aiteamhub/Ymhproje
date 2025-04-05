package com.healthylife.interfaces.rest.auth.dto;

import com.healthylife.domain.user.Role;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Response object for authentication")
public class AuthenticationResponse {
    private String token;
    private String refreshToken;
    private Long userId;
    private String email;
    private Role role;
    private String firstName;
    private String lastName;
} 