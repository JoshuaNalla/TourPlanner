package com.example.demo.Controller;

import com.example.demo.FlightAPI.AirportInfo;
import com.example.demo.FlightAPI.AviationStackResponse;
import com.example.demo.FlightAPI.FlightInfo;
import com.example.demo.FlightAPI.FlightService;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3001")

public class FlightController {

    @Autowired
    private FlightService flightService;

    @Value("${flight.api.key}")
    private static String flightApiKey;

    @Value("${flight.api.url}")
    private static String flightApiUrl;

    @GetMapping("/cities/{city}")
    public ResponseEntity<?> getAirport(@PathVariable String city) {

        System.out.println("=== AviationStack Request ===");
        System.out.println("City: " + city);

        try {
            // Validate API key
            if (flightApiKey == null || flightApiKey.isEmpty()) {
                System.err.println("ERROR: AviationStack API key is not configured!");
                return ResponseEntity.status(500).body(
                        Map.of("error", "Aviation Stack API key is not configured in application.properties")
                );
            }

            //Generate given city's airport through input
            List<AirportInfo> airports = flightService.getAirportsByCity(city);

            return ResponseEntity.ok(airports);

            //Exceptions
        } catch (HttpClientErrorException e) {
            System.err.println("HTTP Client Error: " + e.getStatusCode());
            System.err.println("Response body: " + e.getResponseBodyAsString());

            return ResponseEntity.status(500).body(Map.of(
                    "error", "Aviation Stack API client error",
                    "details", e.getResponseBodyAsString()
            ));

        } catch (HttpServerErrorException e) {
            System.err.println("HTTP Server Error: " + e.getStatusCode());
            System.err.println("Response body: " + e.getResponseBodyAsString());

            return ResponseEntity.status(500).body(Map.of(
                    "error", "Aviation Stack API server error",
                    "details", e.getResponseBodyAsString()
            ));

        } catch (Exception e) {
            System.err.println("Unexpected error: " + e.getMessage());

            return ResponseEntity.status(500).body(Map.of(
                    "error", "Unexpected error",
                    "details", e.getMessage()
            ));
        }
    }

    //get flights based off of arrival and departure cities
    @GetMapping("/flights")
    public ResponseEntity<?> getFlights(@RequestParam String dep, @RequestParam String arr) {
        //calls the API for the flights going to dep from arr
        try {
            List<FlightInfo.Data> flights = flightService.getFlights(dep, arr);
            return ResponseEntity.ok(flights);

        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    Map.of("error", e.getMessage())
            );
        }
    }


    //Finds the icao letters for an airport based on the city name
    private List<AirportInfo> getAirportByCity(String city) {
        RestTemplate restTemplate = new RestTemplate();

        String url = flightApiUrl +
                "/cities?city_name=" + city +
                "&access_key=" + flightApiKey;

        AviationStackResponse response =
                restTemplate.getForObject(url, AviationStackResponse.class);

        return response != null ? response.getData() : List.of();
    }


}
