//package com.example.demo.DTO;
//
//import lombok.Data;
//import lombok.RequiredArgsConstructor;
//
//@Data
//@RequiredArgsConstructor
//public class TripTO {
//    private String id;
//    private String title;
//    private String description;
//}

package com.example.demo.DTO;

import com.example.demo.Model.Trip;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TripTO {
    private String id;

    // Overview
    private String title;
    private String description;
    private String destination;
    private LocalDate startDate;
    private LocalDate endDate;
    private String category;

    // Nested objects
    private Trip.Travel travel;
    private Trip.Housing housing;
    private Trip.Logistics logistics;

    // Chat history
    private List<Trip.ChatMessage> chatHistory;

    // Metadata
    private String userId;
    private String status;
}