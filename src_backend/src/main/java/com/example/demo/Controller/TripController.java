package com.example.demo.Controller;

import com.example.demo.DTO.TripTO;
import com.example.demo.Model.Trip;
import com.example.demo.Service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
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
        return tripService.getUsers();
    }

    @DeleteMapping("/delete")
    @ResponseStatus(HttpStatus.OK)
    public String deleteTrip(@RequestParam String id) {
        return tripService.deleteUser(id);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.OK)
    public String updateTrip(@RequestBody TripTO trip) {
        return tripService.updateTrip(trip);
    }
}
