//package com.example.demo.Controller;
//
//import com.example.demo.FlightAPI.AirportInfo;
//import com.example.demo.FlightAPI.AviationStackResponse;
//import com.example.demo.FlightAPI.FlightInfo;
//import com.example.demo.FlightAPI.FlightService;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.client.HttpClientErrorException;
//import org.springframework.web.client.HttpServerErrorException;
//import org.springframework.web.client.RestTemplate;
//
//import java.util.List;
//import java.util.Map;
//
////@RestController
////@RequestMapping("/api")
////@CrossOrigin(origins = "http://localhost:3001")
////
////public class FlightController {
////
////    @Autowired
////    private FlightService flightService;
////
////    @Value("${flight.api.key}")
////    private static String flightApiKey;
////
////    @Value("${flight.api.url}")
////    private static String flightApiUrl;
////
////    @GetMapping("/cities")
////    public ResponseEntity<?> getAirport(@PathVariable String city) {
////
////        System.out.println("=== AviationStack Request ===");
////        System.out.println("City: " + city);
////
////        try {
////            // Validate API key
////            if (flightApiKey == null || flightApiKey.isEmpty()) {
////                System.err.println("ERROR: AviationStack API key is not configured!");
////                return ResponseEntity.status(500).body(
////                        Map.of("error", "Aviation Stack API key is not configured in application.properties")
////                );
////            }
////
////            //Generate given city's airport through input
////            List<AirportInfo> airports = flightService.getAirportsByCity(city);
////
////            return ResponseEntity.ok(airports);
////
////            //Exceptions
////        } catch (HttpClientErrorException e) {
////            System.err.println("HTTP Client Error: " + e.getStatusCode());
////            System.err.println("Response body: " + e.getResponseBodyAsString());
////
////            return ResponseEntity.status(500).body(Map.of(
////                    "error", "Aviation Stack API client error",
////                    "details", e.getResponseBodyAsString()
////            ));
////
////        } catch (HttpServerErrorException e) {
////            System.err.println("HTTP Server Error: " + e.getStatusCode());
////            System.err.println("Response body: " + e.getResponseBodyAsString());
////
////            return ResponseEntity.status(500).body(Map.of(
////                    "error", "Aviation Stack API server error",
////                    "details", e.getResponseBodyAsString()
////            ));
////
////        } catch (Exception e) {
////            System.err.println("Unexpected error: " + e.getMessage());
////
////            return ResponseEntity.status(500).body(Map.of(
////                    "error", "Unexpected error",
////                    "details", e.getMessage()
////            ));
////        }
////    }
////
////    //get flights based off of arrival and departure cities
////    @GetMapping("/flights")
////    public ResponseEntity<?> getFlights(@RequestParam String dep, @RequestParam String arr) {
////        //calls the API for the flights going to dep from arr
////        try {
////            List<FlightInfo.Data> flights = flightService.getFlights(dep, arr);
////            return ResponseEntity.ok(flights);
////
////        } catch (Exception e) {
////            return ResponseEntity.status(500).body(
////                    Map.of("error", e.getMessage())
////            );
////        }
////    }
////
////
////    //Finds the icao letters for an airport based on the city name
////    private List<AirportInfo> getAirportByCity(String city) {
////        RestTemplate restTemplate = new RestTemplate();
////
////        String url = flightApiUrl +
////                "/cities?city_name=" + city +
////                "&access_key=" + flightApiKey;
////
////        AviationStackResponse response =
////                restTemplate.getForObject(url, AviationStackResponse.class);
////
////        return response != null ? response.getData() : List.of();
////    }
////
////
////}
//
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/flights")
//@CrossOrigin(origins = "http://localhost:3000")
//public class FlightController {
//
//    @Autowired
//    private FlightService flightService;
//
//    @GetMapping("/airports")
//    public ResponseEntity<List<AirportInfo>> getAirportsByCity(@RequestParam String city) {
//        List<AirportInfo> airports = flightService.getAirportsByCity(city);
//        return ResponseEntity.ok(airports);
//    }
//
//    @GetMapping
//    public ResponseEntity<List<FlightInfo.Data>> getFlights(
//            @RequestParam String depIcao,
//            @RequestParam String arrIcao) {
//        List<FlightInfo.Data> flights = flightService.getFlights(depIcao, arrIcao);
//        return ResponseEntity.ok(flights);
//    }
//}

// take 2
package com.example.demo.Controller;

import com.example.demo.FlightAPI.AirportInfo;
import com.example.demo.FlightAPI.FlightInfo;
import com.example.demo.FlightAPI.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/flights")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class FlightController {

    @Autowired
    private FlightService flightService;

    @GetMapping("/airports")
    public ResponseEntity<?> getAirportsByCity(@RequestParam String city) {
        System.out.println("=== GET /api/flights/airports ===");
        System.out.println("Request parameter - city: " + city);

        try {
            // Validate input
            if (city == null || city.trim().isEmpty()) {
                System.err.println("ERROR: City parameter is empty");
                return ResponseEntity.badRequest().body(
                        Map.of("error", "City parameter is required")
                );
            }

            System.out.println("Calling flightService.getAirportsByCity()...");
            List<AirportInfo> airports = flightService.getAirportsByCity(city);

            System.out.println("Success! Found " + airports.size() + " airports");
            return ResponseEntity.ok(airports);

        } catch (RuntimeException e) {
            System.err.println("RuntimeException in getAirportsByCity:");
            System.err.println("Message: " + e.getMessage());
            System.err.println("Cause: " + (e.getCause() != null ? e.getCause().getMessage() : "none"));
            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    Map.of(
                            "error", "Failed to fetch airports",
                            "details", e.getMessage(),
                            "city", city
                    )
            );

        } catch (Exception e) {
            System.err.println("Unexpected Exception in getAirportsByCity:");
            System.err.println("Type: " + e.getClass().getName());
            System.err.println("Message: " + e.getMessage());
            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    Map.of(
                            "error", "Unexpected error occurred",
                            "details", e.getMessage(),
                            "type", e.getClass().getSimpleName()
                    )
            );
        }
    }

    @GetMapping
    public ResponseEntity<?> getFlights(
            @RequestParam String depIcao,
            @RequestParam String arrIcao) {

        System.out.println("=== GET /api/flights ===");
        System.out.println("Request parameters:");
        System.out.println("  depIcao: " + depIcao);
        System.out.println("  arrIcao: " + arrIcao);

        try {
            // Validate inputs
            if (depIcao == null || depIcao.trim().isEmpty()) {
                System.err.println("ERROR: depIcao parameter is empty");
                return ResponseEntity.badRequest().body(
                        Map.of("error", "Departure ICAO code is required")
                );
            }

            if (arrIcao == null || arrIcao.trim().isEmpty()) {
                System.err.println("ERROR: arrIcao parameter is empty");
                return ResponseEntity.badRequest().body(
                        Map.of("error", "Arrival ICAO code is required")
                );
            }

            System.out.println("Calling flightService.getFlights()...");
            List<FlightInfo.Data> flights = flightService.getFlights(depIcao, arrIcao);

            System.out.println("Success! Found " + flights.size() + " flights");

            if (flights.isEmpty()) {
                System.out.println("Warning: No flights found for this route");
                return ResponseEntity.ok().body(
                        Map.of(
                                "message", "No flights found for this route",
                                "depIcao", depIcao,
                                "arrIcao", arrIcao,
                                "flights", flights
                        )
                );
            }

            return ResponseEntity.ok(flights);

        } catch (RuntimeException e) {
            System.err.println("RuntimeException in getFlights:");
            System.err.println("Message: " + e.getMessage());
            System.err.println("Cause: " + (e.getCause() != null ? e.getCause().getMessage() : "none"));
            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    Map.of(
                            "error", "Failed to fetch flights",
                            "details", e.getMessage(),
                            "depIcao", depIcao,
                            "arrIcao", arrIcao
                    )
            );

        } catch (Exception e) {
            System.err.println("Unexpected Exception in getFlights:");
            System.err.println("Type: " + e.getClass().getName());
            System.err.println("Message: " + e.getMessage());
            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    Map.of(
                            "error", "Unexpected error occurred",
                            "details", e.getMessage(),
                            "type", e.getClass().getSimpleName()
                    )
            );
        }
    }
}