package com.example.demo.DTO;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class TripTO {
    private String id;
    private String email;
    private String title;
    private String description;
}
