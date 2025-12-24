package com.example.demo.Model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//@Document(collection = "trips")
//@Data
//@Builder
//@AllArgsConstructor
//@NoArgsConstructor
//public class Trip {
//    @Id
//    private String id;
//    private String title;
//    private String description;
//}


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "trips")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Trip {
    @Id
    private String id;
    private String email;

    // Overview (keeping your existing fields)
    private String title;
    private String description;

    // NEW: Additional overview fields
    private String destination;
    private LocalDate startDate;
    private LocalDate endDate;
    private String category;

    // NEW: Nested objects
    private Travel travel;
    private Housing housing;
    private Logistics logistics;

    // NEW: Chat history
    private List<ChatMessage> chatHistory;

    // NEW: Metadata
    private String userId;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Nested classes
    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Travel {
        private String transportationType;
        private String departureLocation;
        private String arrivalLocation;
        private LocalDateTime departureDateTime;
        private LocalDateTime arrivalDateTime;
        private Integer numberOfTravelers;
        private String travelNotes;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Housing {
        private String accommodationType;
        private String accommodationName;
        private String address;
        private LocalDate checkInDate;
        private LocalDate checkOutDate;
        private Integer numberOfRooms;
        private String accommodationNotes;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Logistics {
        private Double budget;
        private String currency;
        private String emergencyContact;
        private String emergencyPhone;
        private String importantDocuments;
        private String additionalNotes;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ChatMessage {
        private String role;
        private String content;
        private LocalDateTime timestamp;
    }
}
