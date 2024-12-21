package com.event.server.controller;

import com.event.server.infra.security.TokenService;
import com.event.server.model.LoginRequestDTO;
import com.event.server.model.RegisterRequestDTO;
import com.event.server.model.ResponseDTO;
import com.event.server.model.User;
import com.event.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private UserRepository repository;

    @Autowired
    private  PasswordEncoder passwordEncoder;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDTO body) {
        String cacheKey = "auth:" + body.login();


        if (Boolean.TRUE.equals(redisTemplate.hasKey(cacheKey))) {
            String cachedToken = (String) redisTemplate.opsForValue().get(cacheKey);
            return ResponseEntity.ok(new ResponseDTO(body.login(), cachedToken));
        }


        User user = this.repository.findByLogin(body.login())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (passwordEncoder.matches(body.password(), user.getPassword())) {
            String token = this.tokenService.generateToken(user);


            redisTemplate.opsForValue().set(cacheKey, token);
            redisTemplate.expire(cacheKey, Duration.ofMinutes(10));

            return ResponseEntity.ok(new ResponseDTO(user.getEmail(), token));
        }

        return ResponseEntity.badRequest().build();
    }


    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterRequestDTO body) {
        Optional<User> user = this.repository.findByLogin(body.login());

        if (user.isEmpty()) {
            User newUser = new User();
            newUser.setPassword(passwordEncoder.encode(body.password()));
            newUser.setLogin(body.login());
            newUser.setEmail(body.email());
            this.repository.save(newUser);

            String token = this.tokenService.generateToken(newUser);

            String cacheKey = "auth:" + body.login();
            redisTemplate.opsForValue().set(cacheKey, token);
            redisTemplate.expire(cacheKey, Duration.ofMinutes(10));

            return ResponseEntity.ok(new ResponseDTO(newUser.getEmail(), token));
        }

        return ResponseEntity.badRequest().build();
    }

}