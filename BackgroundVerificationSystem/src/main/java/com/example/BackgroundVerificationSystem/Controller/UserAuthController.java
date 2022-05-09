package com.example.BackgroundVerificationSystem.Controller;

import com.example.BackgroundVerificationSystem.Model.User;
import com.example.BackgroundVerificationSystem.Request_Response.LoginRequest;
import com.example.BackgroundVerificationSystem.Request_Response.LoginResponse;
import com.example.BackgroundVerificationSystem.Request_Response.UserRequest;
import com.example.BackgroundVerificationSystem.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/auth")
@RestController
public class UserAuthController {

    @Autowired
    UserService userService;

    @PostMapping("/signup")
    public User registerUser(@RequestBody UserRequest userRequest){
        return userService.registerUser(userRequest);
    }

    @PostMapping("/signin")
    public LoginResponse login(@RequestBody LoginRequest loginRequest){
        return userService.login(loginRequest);
    }
}
