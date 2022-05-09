package com.example.BackgroundVerificationSystem.Request_Response;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class UserRequest {

    private String name;
    private String email;
    private String username;
    private Date dob;
    private String password;
    private String[] roles;
}
