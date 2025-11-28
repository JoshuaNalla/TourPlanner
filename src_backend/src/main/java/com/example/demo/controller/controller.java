package com.example.demo.controller;

import com.example.demo.Model.Trip;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class controller {
    @GetMapping("/api/test")
    public Trip getTrip() {
        return new Trip("ex_title", "ex_desc");
    }
}
