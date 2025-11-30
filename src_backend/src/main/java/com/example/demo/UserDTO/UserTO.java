package com.example.demo.UserDTO;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class UserTO {
    private String id;
    private String email;
    private String password;
}
