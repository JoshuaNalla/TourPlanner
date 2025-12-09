//package com.example.demo.Controller;
//
//import com.example.demo.DTO.TripTO;
//import com.example.demo.Model.Trip;
//import com.example.demo.Service.TripService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@CrossOrigin(origins = "http://localhost:3000")
//@RestController
//@RequestMapping("/api/trips")
//public class TripController {
//    @Autowired
//    private TripService tripService;
//
//    @PostMapping("/create")
//    @ResponseStatus(HttpStatus.CREATED)
//    public String createTrip(@RequestBody TripTO trip) {
//        return tripService.createTrip(trip);
//    }
//
//    @GetMapping("/get")
//    @ResponseStatus(HttpStatus.OK)
//    public List<Trip> getTrip() {
//        return tripService.getUsers();
//    }
//
//    @DeleteMapping("/delete")
//    @ResponseStatus(HttpStatus.OK)
//    public String deleteTrip(@RequestParam String id) {
//        return tripService.deleteUser(id);
//    }
//
//    @PutMapping("/update")
//    @ResponseStatus(HttpStatus.OK)
//    public String updateTrip(@RequestBody TripTO trip) {
//        return tripService.updateTrip(trip);
//    }
//}

package com.example.demo.Controller;

import com.example.demo.DTO.TripTO;
import com.example.demo.Model.Trip;
import com.example.demo.Service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping("/api/trips")
public class TripController {
    @Autowired
    private TripService tripService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public String createTrip(@RequestBody TripTO trip) {
        return tripService.createTrip(trip);
    }

    @GetMapping("/get")
    @ResponseStatus(HttpStatus.OK)
    public List<Trip> getTrip() {
        return tripService.getTrips(); // Fixed method name
    }

    // NEW: Get trip by ID
    @GetMapping("/get/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Trip> getTripById(@PathVariable String id) {
        Trip trip = tripService.getTripById(id);
        if (trip != null) {
            return ResponseEntity.ok(trip);
        }
        return ResponseEntity.notFound().build();
    }

    // NEW: Get trips by user ID
    @GetMapping("/user/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public List<Trip> getTripsByUser(@PathVariable String userId) {
        return tripService.getTripsByUserId(userId);
    }

    @DeleteMapping("/delete")
    @ResponseStatus(HttpStatus.OK)
    public String deleteTrip(@RequestParam String id) {
        return tripService.deleteTrip(id); // Fixed method name
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.OK)
    public String updateTrip(@RequestBody TripTO trip) {
        return tripService.updateTrip(trip);
    }
}