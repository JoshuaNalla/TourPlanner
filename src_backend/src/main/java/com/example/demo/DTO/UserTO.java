package com.example.demo.DTO;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class UserTO {
    private String id;
    private String email;
    private String password;

//    public UserTO(String id, String email, String password) {
//        this.id = id;
//        this.email = email;
//        this.password = hashPassword(password);
//    }
//
//    public String hashPassword(String password) {
//
//        return "hash";
//    }
}
