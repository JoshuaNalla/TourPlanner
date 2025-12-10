//////package com.example.demo.FlightAPI;
//////
//////import org.springframework.beans.factory.annotation.Value;
//////import org.springframework.stereotype.Service;
//////import org.springframework.web.client.RestTemplate;
//////import org.springframework.web.client.HttpClientErrorException;
//////import org.springframework.web.client.HttpServerErrorException;
//////
//////import java.util.List;
//////
//////@Service
//////public class FlightService {
//////
//////    @Value("${flight.api.key}")
//////    private String apiKey;
//////
//////    @Value("${flight.api.url}")
//////    private String apiUrl;
//////
//////    private final RestTemplate restTemplate = new RestTemplate();
//////
////////    public List<AirportInfo> getAirportsByCity(String city) {
////////
////////        String url = apiUrl +
////////                "/cities?city_name=" + city +
////////                "&access_key=" + apiKey;
////////
////////        try {
////////            AviationStackResponse response =
////////                    restTemplate.getForObject(url, AviationStackResponse.class);
////////
////////            return response != null ? response.getData() : List.of();
////////
////////        } catch (HttpClientErrorException e) {
////////            throw new RuntimeException("Client error: " + e.getResponseBodyAsString());
////////        } catch (HttpServerErrorException e) {
////////            throw new RuntimeException("Server error: " + e.getResponseBodyAsString());
////////        } catch (Exception e) {
////////            throw new RuntimeException("Unexpected error: " + e.getMessage());
////////        }
////////    }
//////
////////    public List<AirportInfo> getAirportsByCity(String city) {
////////
////////        // CHANGE THIS LINE - use /airports instead of /cities
////////        String url = apiUrl +
////////                "/airports?search=" + city +  // Use 'search' parameter
////////                "&access_key=" + apiKey;
////////
////////        try {
////////            AviationStackResponse response =
////////                    restTemplate.getForObject(url, AviationStackResponse.class);
////////
////////            return response != null ? response.getData() : List.of();
////////
////////        } catch (HttpClientErrorException e) {
////////            throw new RuntimeException("Client error: " + e.getResponseBodyAsString());
////////        } catch (HttpServerErrorException e) {
////////            throw new RuntimeException("Server error: " + e.getResponseBodyAsString());
////////        } catch (Exception e) {
////////            throw new RuntimeException("Unexpected error: " + e.getMessage());
////////        }
////////    }
//////
//////    public List<AirportInfo> getAirportsByCity(String city) {
//////
//////        // Make sure you're using the correct parameter name
//////        String url = apiUrl +
//////                "/airports?access_key=" + apiKey +
//////                "&city_name=" + city;
//////
//////        System.out.println("=== Calling AviationStack API ===");
//////        System.out.println("URL: " + url.replace(apiKey, "***KEY***"));
//////
//////        try {
//////            AviationStackResponse response =
//////                    restTemplate.getForObject(url, AviationStackResponse.class);
//////
//////            if (response == null || response.getData() == null) {
//////                System.err.println("Response is null or has no data");
//////                return List.of();
//////            }
//////
//////            System.out.println("Success! Got " + response.getData().size() + " airports");
//////            return response.getData();
//////
//////        } catch (HttpClientErrorException e) {
//////            System.err.println("HTTP Client Error: " + e.getStatusCode());
//////            System.err.println("Response: " + e.getResponseBodyAsString());
//////            throw new RuntimeException("Client error: " + e.getResponseBodyAsString());
//////        } catch (HttpServerErrorException e) {
//////            System.err.println("HTTP Server Error: " + e.getStatusCode());
//////            System.err.println("Response: " + e.getResponseBodyAsString());
//////            throw new RuntimeException("Server error: " + e.getResponseBodyAsString());
//////        } catch (Exception e) {
//////            System.err.println("Unexpected error: " + e.getClass().getName());
//////            System.err.println("Message: " + e.getMessage());
//////            e.printStackTrace();
//////            throw new RuntimeException("Unexpected error: " + e.getMessage());
//////        }
//////    }
//////    public List<FlightInfo.Data> getFlights(String depIcao, String arrIcao) {
//////
//////        String url = apiUrl +
//////                "/flights?dep_icao=" + depIcao +
//////                "&arr_icao=" + arrIcao +
//////                "&flight_status=scheduled" +
//////                "&access_key=" + apiKey;
//////
//////        FlightInfo response =
//////                restTemplate.getForObject(url, FlightInfo.class);
//////
//////        return response != null ? response.getData() : List.of();
//////    }
//////
//////
//////}
//////
////
////
////
////package com.example.demo.FlightAPI;
////
////import org.springframework.beans.factory.annotation.Value;
////import org.springframework.stereotype.Service;
////import org.springframework.web.client.RestTemplate;
////import org.springframework.web.client.HttpClientErrorException;
////import org.springframework.web.client.HttpServerErrorException;
////
////import java.util.List;
////
////@Service
////public class FlightService {
////
////    @Value("${flight.api.key}")
////    private String apiKey;
////
////    @Value("${flight.api.url}")
////    private String apiUrl;
////
////    private final RestTemplate restTemplate = new RestTemplate();
////
////    public List<AirportInfo> getAirportsByCity(String city) {
////
////        String url = apiUrl +
////                "/airports?access_key=" + apiKey +
////                "&city_name=" + city;
////
////        System.out.println("=== Calling AviationStack API ===");
////        System.out.println("URL: " + url.replace(apiKey, "***KEY***"));
////
////        try {
////            AviationStackResponse response =
////                    restTemplate.getForObject(url, AviationStackResponse.class);
////
////            if (response == null || response.getData() == null) {
////                System.err.println("Response is null or has no data");
////                return List.of();
////            }
////
////            System.out.println("Success! Got " + response.getData().size() + " airports");
////            return response.getData();
////
////        } catch (HttpClientErrorException e) {
////            System.err.println("HTTP Client Error: " + e.getStatusCode());
////            System.err.println("Response: " + e.getResponseBodyAsString());
////            throw new RuntimeException("Client error: " + e.getResponseBodyAsString());
////        } catch (HttpServerErrorException e) {
////            System.err.println("HTTP Server Error: " + e.getStatusCode());
////            System.err.println("Response: " + e.getResponseBodyAsString());
////            throw new RuntimeException("Server error: " + e.getResponseBodyAsString());
////        } catch (Exception e) {
////            System.err.println("Unexpected error: " + e.getClass().getName());
////            System.err.println("Message: " + e.getMessage());
////            e.printStackTrace();
////            throw new RuntimeException("Unexpected error: " + e.getMessage());
////        }
////    }
////
////    public List<FlightInfo.Data> getFlights(String depIcao, String arrIcao) {
////
////        // Remove flight_status to get ALL flights (active, scheduled, landed, etc.)
////        // Also remove the ICAO filter and use IATA instead - free tier works better with IATA
////        String url = apiUrl +
////                "/flights?access_key=" + apiKey +
////                "&dep_iata=" + depIcao +  // Try IATA instead of ICAO
////                "&arr_iata=" + arrIcao;
////
////        System.out.println("=== Calling AviationStack Flights API ===");
////        System.out.println("URL: " + url.replace(apiKey, "***KEY***"));
////
////        try {
////            FlightInfo response = restTemplate.getForObject(url, FlightInfo.class);
////
////            if (response == null || response.getData() == null) {
////                System.err.println("Response is null or has no data");
////                return List.of();
////            }
////
////            System.out.println("Success! Got " + response.getData().size() + " flights");
////
////            // Print first flight for debugging
////            if (!response.getData().isEmpty()) {
////                FlightInfo.Data firstFlight = response.getData().get(0);
////                System.out.println("Sample flight: " +
////                        (firstFlight.flight != null ? firstFlight.flight.iata : "unknown"));
////            }
////
////            return response.getData();
////
////        } catch (HttpClientErrorException e) {
////            System.err.println("HTTP Client Error: " + e.getStatusCode());
////            System.err.println("Response: " + e.getResponseBodyAsString());
////            throw new RuntimeException("Client error: " + e.getResponseBodyAsString());
////        } catch (HttpServerErrorException e) {
////            System.err.println("HTTP Server Error: " + e.getStatusCode());
////            System.err.println("Response: " + e.getResponseBodyAsString());
////            throw new RuntimeException("Server error: " + e.getResponseBodyAsString());
////        } catch (Exception e) {
////            System.err.println("Unexpected error: " + e.getClass().getName());
////            System.err.println("Message: " + e.getMessage());
////            e.printStackTrace();
////            throw new RuntimeException("Unexpected error: " + e.getMessage());
////        }
////    }
////}
//
//// take whatever atp
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
//    public List<AirportInfo> getAirportsByCity(String city) {
//
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
//            System.out.println("API returned " + response.getData().size() + " airports");
//
//            // FILTER: Only return airports that actually match the city name
//            List<AirportInfo> filteredAirports = response.getData().stream()
//                    .filter(airport -> airport.getCity_name() != null &&
//                            airport.getCity_name().equalsIgnoreCase(city))
//                    .toList();
//
//            System.out.println("After filtering: " + filteredAirports.size() + " airports match '" + city + "'");
//
//            // DEBUG: Print the filtered airports
//            if (!filteredAirports.isEmpty()) {
//                System.out.println("=== FILTERED AIRPORTS ===");
//                for (int i = 0; i < Math.min(3, filteredAirports.size()); i++) {
//                    AirportInfo airport = filteredAirports.get(i);
//                    System.out.println("Airport " + (i+1) + ":");
//                    System.out.println("  City: " + airport.getCity_name());
//                    System.out.println("  Airport Name: " + airport.getAirport_name());
//                    System.out.println("  IATA: " + airport.getIata_code());
//                    System.out.println("  ICAO: " + airport.getIcao_code());
//                }
//            } else {
//                System.out.println("WARNING: No airports found matching city: " + city);
//            }
//
//            return filteredAirports;
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
//
//    public List<FlightInfo.Data> getFlights(String depIcao, String arrIcao) {
//
//        String url = apiUrl +
//                "/flights?access_key=" + apiKey +
//                "&dep_iata=" + depIcao +
//                "&arr_iata=" + arrIcao;
//
//        System.out.println("=== Calling AviationStack Flights API ===");
//        System.out.println("URL: " + url.replace(apiKey, "***KEY***"));
//
//        try {
//            FlightInfo response = restTemplate.getForObject(url, FlightInfo.class);
//
//            if (response == null || response.getData() == null) {
//                System.err.println("Response is null or has no data");
//                return List.of();
//            }
//
//            System.out.println("Success! Got " + response.getData().size() + " flights");
//
//            if (!response.getData().isEmpty()) {
//                FlightInfo.Data firstFlight = response.getData().get(0);
//                System.out.println("Sample flight: " +
//                        (firstFlight.flight != null ? firstFlight.flight.iata : "unknown"));
//            }
//
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
//}

// this is using the flight database
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
        System.out.println("=== Searching Static Airport Database ===");
        System.out.println("City: " + city);

        List<AirportInfo> airports = AirportDatabase.searchByCity(city);

        if (airports.isEmpty()) {
            System.out.println("WARNING: No airports found for city: " + city);
            System.out.println("Available cities include: " +
                    String.join(", ", AirportDatabase.getAllCities().subList(0, Math.min(10, AirportDatabase.getAllCities().size()))));
        } else {
            System.out.println("Found " + airports.size() + " airport(s)");
            for (AirportInfo airport : airports) {
                System.out.println("  - " + airport.getAirport_name() + " (" + airport.getIata_code() + ")");
            }
        }

        return airports;
    }

    public List<FlightInfo.Data> getFlights(String depIata, String arrIata) {
        String url = apiUrl +
                "/flights?access_key=" + apiKey +
                "&dep_iata=" + depIata +
                "&arr_iata=" + arrIata;

        System.out.println("=== Calling AviationStack Flights API ===");
        System.out.println("Route: " + depIata + " → " + arrIata);

        try {
            FlightInfo response = restTemplate.getForObject(url, FlightInfo.class);

            if (response == null || response.getData() == null) {
                System.err.println("Response is null or has no data");
                return List.of();
            }

            System.out.println("Success! Got " + response.getData().size() + " flights");

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