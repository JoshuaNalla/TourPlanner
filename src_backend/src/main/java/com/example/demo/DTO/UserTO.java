package com.example.demo.DTO;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class UserTO {
    private String id;
    private String email;
    private String password;
}
