package com.example.demo.FlightAPI;

public class AirportInfo {
    private String city_name;
    private String iata_code;
    private String airport_name;
    private String country_name;
    // getters/setters

    public String getCity_name() {
        return city_name;
    }
    public void setCity_name(String city_name){
        this.city_name = city_name;
    }

    public String getIata_code() {
        return iata_code;
    }
    public void setIata_code(String iata_code) {
        this.iata_code = iata_code;
    }

    public String getAirport_name() {
        return airport_name;
    }
    public void setAirport_name(String airport_name) {
        this.airport_name = airport_name;
    }

    public String getCountry_name() {
        return country_name;
    }
    public void setCountry_name(String country_name) {
        this.country_name = country_name;
    }
}
