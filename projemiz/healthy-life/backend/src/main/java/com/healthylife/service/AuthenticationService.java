package com.healthylife.service;

import com.healthylife.domain.user.User;
import com.healthylife.infrastructure.exception.EmailAlreadyExistsException;
import com.healthylife.infrastructure.exception.InvalidCredentialsException;
import com.healthylife.interfaces.rest.auth.dto.AuthenticationResponse;
import com.healthylife.repository.UserRepository;
import com.healthylife.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthenticationResponse register(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new EmailAlreadyExistsException("Email already exists: " + user.getEmail());
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);

        String token = jwtTokenProvider.generateToken(savedUser);
        String refreshToken = jwtTokenProvider.generateToken(savedUser); // In a real app, use a different method for refresh tokens

        return buildAuthResponse(savedUser, token, refreshToken);
    }

    public AuthenticationResponse authenticate(String email, String password) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );

            User user = (User) authentication.getPrincipal();
            String token = jwtTokenProvider.generateToken(user);
            String refreshToken = jwtTokenProvider.generateToken(user); // In a real app, use a different method for refresh tokens

            return buildAuthResponse(user, token, refreshToken);
        } catch (Exception e) {
            throw new InvalidCredentialsException("Invalid email or password");
        }
    }

    public AuthenticationResponse refreshToken(String refreshToken) {
        if (!jwtTokenProvider.validateToken(refreshToken)) {
            throw new InvalidCredentialsException("Invalid refresh token");
        }

        String email = jwtTokenProvider.getUsernameFromToken(refreshToken);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new InvalidCredentialsException("User not found"));

        String newToken = jwtTokenProvider.generateToken(user);
        String newRefreshToken = jwtTokenProvider.generateToken(user); // In a real app, use a different method for refresh tokens

        return buildAuthResponse(user, newToken, newRefreshToken);
    }

    private AuthenticationResponse buildAuthResponse(User user, String token, String refreshToken) {
        return AuthenticationResponse.builder()
                .token(token)
                .refreshToken(refreshToken)
                .userId(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole())
                .build();
    }
} 