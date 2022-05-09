package com.example.BackgroundVerificationSystem.Controller;

import com.example.BackgroundVerificationSystem.Model.User;
import com.example.BackgroundVerificationSystem.Request_Response.DocumentRequest;
import com.example.BackgroundVerificationSystem.Request_Response.UserResponse;
import com.example.BackgroundVerificationSystem.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/{id}")
    public UserResponse getUser(@PathVariable Long id){
        return userService.getUser(id);
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('EMPLOYER')")
    public List<UserResponse> getAllUsers() {
        return userService.getAllUsers();
    }

}
