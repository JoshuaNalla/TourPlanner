package com.example.demo.Service;

import com.example.demo.DTO.TripTO;
import com.example.demo.Model.Trip;
import com.example.demo.Repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
                    .build();
            tripRepo.save(trip);

        } catch (Exception e) {
            return "Error creating trip";
        }

        return "Trip Created Successfully";
    }

    public List<Trip> getUsers() {
        List<Trip> userList = new ArrayList<>();
        try {
            userList = tripRepo.findAll();
        } catch (Exception e) {
        }

        return userList;
    }

    public String deleteUser(String id) {
        try {
            tripRepo.deleteById(id);
        } catch (Exception e) {
            return "Error Deleting Trip";
        }

        return "Trip Deleted Successfully";
    }

    public String updateTrip(TripTO tripTO) {
        try {
            Trip trip = Trip.builder()
                    .id(tripTO.getId())
                    .title(tripTO.getTitle())
                    .description(tripTO.getDescription())
                    .build();
            tripRepo.save(trip);
        } catch (Exception e) {
            return "Error Updating Trip";
        }

        return "Trip Updated Successfully";
    }
}
