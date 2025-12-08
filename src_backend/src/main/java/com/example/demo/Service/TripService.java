//package com.example.demo.Service;
//
//import com.example.demo.DTO.TripTO;
//import com.example.demo.Model.Trip;
//import com.example.demo.Repository.TripRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Service
//public class TripService {
//    @Autowired
//    private TripRepository tripRepo;
//
//    public String createTrip(TripTO tripTO) {
//        try {
//            Trip trip = Trip.builder()
//                    .title(tripTO.getTitle())
//                    .description(tripTO.getDescription())
//                    .build();
//            tripRepo.save(trip);
//
//        } catch (Exception e) {
//            return "Error creating trip";
//        }
//
//        return "Trip Created Successfully";
//    }
//
//    public List<Trip> getUsers() {
//        List<Trip> userList = new ArrayList<>();
//        try {
//            userList = tripRepo.findAll();
//        } catch (Exception e) {
//        }
//
//        return userList;
//    }
//
//    public String deleteUser(String id) {
//        try {
//            tripRepo.deleteById(id);
//        } catch (Exception e) {
//            return "Error Deleting Trip";
//        }
//
//        return "Trip Deleted Successfully";
//    }
//
//    public String updateTrip(TripTO tripTO) {
//        try {
//            Trip trip = Trip.builder()
//                    .id(tripTO.getId())
//                    .title(tripTO.getTitle())
//                    .description(tripTO.getDescription())
//                    .build();
//            tripRepo.save(trip);
//        } catch (Exception e) {
//            return "Error Updating Trip";
//        }
//
//        return "Trip Updated Successfully";
//    }
//}

package com.example.demo.Service;

import com.example.demo.DTO.TripTO;
import com.example.demo.Model.Trip;
import com.example.demo.Repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class TripService {
    @Autowired
    private TripRepository tripRepo;

    public String createTrip(TripTO tripTO) {
        try {
            Trip trip = Trip.builder()
                    .title(tripTO.getTitle())
                    .description(tripTO.getDescription())
                    // NEW: Add all the new fields
                    .destination(tripTO.getDestination())
                    .startDate(tripTO.getStartDate())
                    .endDate(tripTO.getEndDate())
                    .category(tripTO.getCategory())
                    .travel(tripTO.getTravel())
                    .housing(tripTO.getHousing())
                    .logistics(tripTO.getLogistics())
                    .chatHistory(tripTO.getChatHistory())
                    .userId(tripTO.getUserId())
                    .status(tripTO.getStatus() != null ? tripTO.getStatus() : "draft")
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();
            tripRepo.save(trip);

        } catch (Exception e) {
            e.printStackTrace(); // Add this to see errors in console
            return "Error creating trip: " + e.getMessage();
        }

        return "Trip Created Successfully";
    }

    // Renamed from getUsers to getTrips (more accurate)
    public List<Trip> getTrips() {
        List<Trip> tripList = new ArrayList<>();
        try {
            tripList = tripRepo.findAll();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return tripList;
    }

    // Renamed from deleteUser to deleteTrip
    public String deleteTrip(String id) {
        try {
            tripRepo.deleteById(id);
        } catch (Exception e) {
            return "Error Deleting Trip: " + e.getMessage();
        }

        return "Trip Deleted Successfully";
    }

    public String updateTrip(TripTO tripTO) {
        try {
            Trip trip = Trip.builder()
                    .id(tripTO.getId())
                    .title(tripTO.getTitle())
                    .description(tripTO.getDescription())
                    // NEW: Add all the new fields
                    .destination(tripTO.getDestination())
                    .startDate(tripTO.getStartDate())
                    .endDate(tripTO.getEndDate())
                    .category(tripTO.getCategory())
                    .travel(tripTO.getTravel())
                    .housing(tripTO.getHousing())
                    .logistics(tripTO.getLogistics())
                    .chatHistory(tripTO.getChatHistory())
                    .userId(tripTO.getUserId())
                    .status(tripTO.getStatus())
                    .updatedAt(LocalDateTime.now())
                    .build();

            // Preserve createdAt from existing trip
            tripRepo.findById(tripTO.getId()).ifPresent(existingTrip ->
                    trip.setCreatedAt(existingTrip.getCreatedAt())
            );

            tripRepo.save(trip);
        } catch (Exception e) {
            e.printStackTrace();
            return "Error Updating Trip: " + e.getMessage();
        }

        return "Trip Updated Successfully";
    }

    // NEW: Get trip by ID
    public Trip getTripById(String id) {
        return tripRepo.findById(id).orElse(null);
    }

    // NEW: Get trips by user ID (if you add user authentication later)
    public List<Trip> getTripsByUserId(String userId) {
        // You'll need to add this method to TripRepository
        return tripRepo.findByUserId(userId);
    }
}
