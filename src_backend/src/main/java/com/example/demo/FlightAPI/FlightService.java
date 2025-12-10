//package com.example.demo.FlightAPI;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//import org.springframework.web.client.HttpClientErrorException;
//import org.springframework.web.client.HttpServerErrorException;
//
//import java.util.List;
//
//@Service
//public class FlightService {
//
//    @Value("${flight.api.key}")
//    private String apiKey;
//
//    @Value("${flight.api.url}")
//    private String apiUrl;
//
//    private final RestTemplate restTemplate = new RestTemplate();
//
////    public List<AirportInfo> getAirportsByCity(String city) {
////
////        String url = apiUrl +
////                "/cities?city_name=" + city +
////                "&access_key=" + apiKey;
////
////        try {
////            AviationStackResponse response =
////                    restTemplate.getForObject(url, AviationStackResponse.class);
////
////            return response != null ? response.getData() : List.of();
////
////        } catch (HttpClientErrorException e) {
////            throw new RuntimeException("Client error: " + e.getResponseBodyAsString());
////        } catch (HttpServerErrorException e) {
////            throw new RuntimeException("Server error: " + e.getResponseBodyAsString());
////        } catch (Exception e) {
////            throw new RuntimeException("Unexpected error: " + e.getMessage());
////        }
////    }
//
////    public List<AirportInfo> getAirportsByCity(String city) {
////
////        // CHANGE THIS LINE - use /airports instead of /cities
////        String url = apiUrl +
////                "/airports?search=" + city +  // Use 'search' parameter
////                "&access_key=" + apiKey;
////
////        try {
////            AviationStackResponse response =
////                    restTemplate.getForObject(url, AviationStackResponse.class);
////
////            return response != null ? response.getData() : List.of();
////
////        } catch (HttpClientErrorException e) {
////            throw new RuntimeException("Client error: " + e.getResponseBodyAsString());
////        } catch (HttpServerErrorException e) {
////            throw new RuntimeException("Server error: " + e.getResponseBodyAsString());
////        } catch (Exception e) {
////            throw new RuntimeException("Unexpected error: " + e.getMessage());
////        }
////    }
//
//    public List<AirportInfo> getAirportsByCity(String city) {
//
//        // Make sure you're using the correct parameter name
//        String url = apiUrl +
//                "/airports?access_key=" + apiKey +
//                "&city_name=" + city;
//
//        System.out.println("=== Calling AviationStack API ===");
//        System.out.println("URL: " + url.replace(apiKey, "***KEY***"));
//
//        try {
//            AviationStackResponse response =
//                    restTemplate.getForObject(url, AviationStackResponse.class);
//
//            if (response == null || response.getData() == null) {
//                System.err.println("Response is null or has no data");
//                return List.of();
//            }
//
//            System.out.println("Success! Got " + response.getData().size() + " airports");
//            return response.getData();
//
//        } catch (HttpClientErrorException e) {
//            System.err.println("HTTP Client Error: " + e.getStatusCode());
//            System.err.println("Response: " + e.getResponseBodyAsString());
//            throw new RuntimeException("Client error: " + e.getResponseBodyAsString());
//        } catch (HttpServerErrorException e) {
//            System.err.println("HTTP Server Error: " + e.getStatusCode());
//            System.err.println("Response: " + e.getResponseBodyAsString());
//            throw new RuntimeException("Server error: " + e.getResponseBodyAsString());
//        } catch (Exception e) {
//            System.err.println("Unexpected error: " + e.getClass().getName());
//            System.err.println("Message: " + e.getMessage());
//            e.printStackTrace();
//            throw new RuntimeException("Unexpected error: " + e.getMessage());
//        }
//    }
//    public List<FlightInfo.Data> getFlights(String depIcao, String arrIcao) {
//
//        String url = apiUrl +
//                "/flights?dep_icao=" + depIcao +
//                "&arr_icao=" + arrIcao +
//                "&flight_status=scheduled" +
//                "&access_key=" + apiKey;
//
//        FlightInfo response =
//                restTemplate.getForObject(url, FlightInfo.class);
//
//        return response != null ? response.getData() : List.of();
//    }
//
//
//}
//



package com.example.demo.FlightAPI;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;

import java.util.List;

@Service
public class FlightService {

    @Value("${flight.api.key}")
    private String apiKey;

    @Value("${flight.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public List<AirportInfo> getAirportsByCity(String city) {

        String url = apiUrl +
                "/airports?access_key=" + apiKey +
                "&city_name=" + city;

        System.out.println("=== Calling AviationStack API ===");
        System.out.println("URL: " + url.replace(apiKey, "***KEY***"));

        try {
            AviationStackResponse response =
                    restTemplate.getForObject(url, AviationStackResponse.class);

            if (response == null || response.getData() == null) {
                System.err.println("Response is null or has no data");
                return List.of();
            }

            System.out.println("Success! Got " + response.getData().size() + " airports");
            return response.getData();

        } catch (HttpClientErrorException e) {
            System.err.println("HTTP Client Error: " + e.getStatusCode());
            System.err.println("Response: " + e.getResponseBodyAsString());
            throw new RuntimeException("Client error: " + e.getResponseBodyAsString());
        } catch (HttpServerErrorException e) {
            System.err.println("HTTP Server Error: " + e.getStatusCode());
            System.err.println("Response: " + e.getResponseBodyAsString());
            throw new RuntimeException("Server error: " + e.getResponseBodyAsString());
        } catch (Exception e) {
            System.err.println("Unexpected error: " + e.getClass().getName());
            System.err.println("Message: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Unexpected error: " + e.getMessage());
        }
    }

    public List<FlightInfo.Data> getFlights(String depIcao, String arrIcao) {

        // Remove flight_status to get ALL flights (active, scheduled, landed, etc.)
        // Also remove the ICAO filter and use IATA instead - free tier works better with IATA
        String url = apiUrl +
                "/flights?access_key=" + apiKey +
                "&dep_iata=" + depIcao +  // Try IATA instead of ICAO
                "&arr_iata=" + arrIcao;

        System.out.println("=== Calling AviationStack Flights API ===");
        System.out.println("URL: " + url.replace(apiKey, "***KEY***"));

        try {
            FlightInfo response = restTemplate.getForObject(url, FlightInfo.class);

            if (response == null || response.getData() == null) {
                System.err.println("Response is null or has no data");
                return List.of();
            }

            System.out.println("Success! Got " + response.getData().size() + " flights");

            // Print first flight for debugging
            if (!response.getData().isEmpty()) {
                FlightInfo.Data firstFlight = response.getData().get(0);
                System.out.println("Sample flight: " +
                        (firstFlight.flight != null ? firstFlight.flight.iata : "unknown"));
            }

            return response.getData();

        } catch (HttpClientErrorException e) {
            System.err.println("HTTP Client Error: " + e.getStatusCode());
            System.err.println("Response: " + e.getResponseBodyAsString());
            throw new RuntimeException("Client error: " + e.getResponseBodyAsString());
        } catch (HttpServerErrorException e) {
            System.err.println("HTTP Server Error: " + e.getStatusCode());
            System.err.println("Response: " + e.getResponseBodyAsString());
            throw new RuntimeException("Server error: " + e.getResponseBodyAsString());
        } catch (Exception e) {
            System.err.println("Unexpected error: " + e.getClass().getName());
            System.err.println("Message: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Unexpected error: " + e.getMessage());
        }
    }
}
