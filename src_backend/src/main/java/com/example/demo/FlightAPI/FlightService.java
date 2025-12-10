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

//    public List<AirportInfo> getAirportsByCity(String city) {
//
//        String url = apiUrl +
//                "/cities?city_name=" + city +
//                "&access_key=" + apiKey;
//
//        try {
//            AviationStackResponse response =
//                    restTemplate.getForObject(url, AviationStackResponse.class);
//
//            return response != null ? response.getData() : List.of();
//
//        } catch (HttpClientErrorException e) {
//            throw new RuntimeException("Client error: " + e.getResponseBodyAsString());
//        } catch (HttpServerErrorException e) {
//            throw new RuntimeException("Server error: " + e.getResponseBodyAsString());
//        } catch (Exception e) {
//            throw new RuntimeException("Unexpected error: " + e.getMessage());
//        }
//    }

    public List<AirportInfo> getAirportsByCity(String city) {

        // CHANGE THIS LINE - use /airports instead of /cities
        String url = apiUrl +
                "/airports?search=" + city +  // Use 'search' parameter
                "&access_key=" + apiKey;

        try {
            AviationStackResponse response =
                    restTemplate.getForObject(url, AviationStackResponse.class);

            return response != null ? response.getData() : List.of();

        } catch (HttpClientErrorException e) {
            throw new RuntimeException("Client error: " + e.getResponseBodyAsString());
        } catch (HttpServerErrorException e) {
            throw new RuntimeException("Server error: " + e.getResponseBodyAsString());
        } catch (Exception e) {
            throw new RuntimeException("Unexpected error: " + e.getMessage());
        }
    }

    public List<FlightInfo.Data> getFlights(String depIcao, String arrIcao) {

        String url = apiUrl +
                "/flights?dep_icao=" + depIcao +
                "&arr_icao=" + arrIcao +
                "&flight_status=scheduled" +
                "&access_key=" + apiKey;

        FlightInfo response =
                restTemplate.getForObject(url, FlightInfo.class);

        return response != null ? response.getData() : List.of();
    }


}

