//package com.example.taskmanagement.controller;
//
//import com.example.taskmanagement.model.User;
//import com.example.taskmanagement.service.AuthService;
//import jakarta.servlet.http.HttpServletRequest;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/auth")
//public class AuthController {
//
//    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
//    private final AuthService userService;
//    private final AuthenticationManager authenticationManager;
//
//    // Add AuthenticationManager to constructor
//    public AuthController(AuthService userService, 
//                         AuthenticationManager authenticationManager) {
//        this.userService = userService;
//        this.authenticationManager = authenticationManager;
//    }
//
//    @PostMapping("/register")
//    public ResponseEntity<String> registerUser(@RequestBody User user) {
//        logger.info("Request URL: /api/auth/register");
//        userService.registerUser(user);
//        return ResponseEntity.ok("User registered successfully!");
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<?> loginUser(@RequestBody User user, 
//                                      HttpServletRequest request) {
//        // Fix Authentication import (use Spring's Authentication)
//        Authentication authentication = authenticationManager.authenticate(
//            new UsernamePasswordAuthenticationToken(
//                user.getUsername(), 
//                user.getPassword()
//            )
//        );
//        
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//        
//        // Add proper session attribute key
//        request.getSession().setAttribute(
//                HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, // Correct constant
//            SecurityContextHolder.getContext()
//        );
//        
//        return ResponseEntity.ok()
//            // Use correct header name and session ID
//            .header(HttpHeaders.SET_COOKIE, "JSESSIONID=" + request.getSession().getId() + "; Path=/; HttpOnly; SameSite=Lax")
//            .body("Login successful!");
//    }
//    
//
//}



package com.example.taskmanagement.controller;

import com.example.taskmanagement.model.User;
import com.example.taskmanagement.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final AuthService userService;
    private final AuthenticationManager authenticationManager;

    public AuthController(AuthService userService, 
                         AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody User user) {
        logger.info("POST /api/auth/register - Attempting to register user: {}", user.getUsername());
        userService.registerUser(user);
        logger.info("User registered successfully: {}", user.getUsername());
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(Collections.singletonMap("message", "User registered successfully!"));
    }

    // Original commented code preserved as requested
    /*
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user, 
                                      HttpServletRequest request) {
        // Fix Authentication import (use Spring's Authentication)
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                user.getUsername(), 
                user.getPassword()
            )
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        // Add proper session attribute key
        request.getSession().setAttribute(
                HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, // Correct constant
            SecurityContextHolder.getContext()
        );
        
        return ResponseEntity.ok()
            // Use correct header name and session ID
            .header(HttpHeaders.SET_COOKIE, "JSESSIONID=" + request.getSession().getId() + "; Path=/; HttpOnly; SameSite=Lax")
            .body("Login successful!");
    }
    */

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody User user, 
                                                       HttpServletRequest request) {
        logger.info("POST /api/auth/login - Attempting login for user: {}", user.getUsername());
        
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    user.getUsername(),
                    user.getPassword()
                )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            HttpSession session = request.getSession();
            session.setAttribute(
                HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                SecurityContextHolder.getContext()
            );

            logger.info("Login successful for user: {}", user.getUsername());
            
            return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, createSessionCookie(session))
                .contentType(MediaType.APPLICATION_JSON)
                .body(Collections.singletonMap("message", "Login successful!"));
                
        } catch (BadCredentialsException e) {
            logger.warn("Login failed for user: {} - Invalid credentials", user.getUsername());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Collections.singletonMap("error", "Invalid credentials"));
        }
    }

    private String createSessionCookie(HttpSession session) {
        return "JSESSIONID=" + session.getId() + 
               "; Path=/" + 
               "; HttpOnly" + 
               "; SameSite=Lax" + 
               "; Max-Age=" + session.getMaxInactiveInterval();
    }
}