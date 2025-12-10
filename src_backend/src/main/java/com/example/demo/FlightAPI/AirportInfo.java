package com.example.demo.FlightAPI;

public class AirportInfo {
    private String city_name;
    private String iata_code;
    private String icao_code; // i added this
    private String airport_name;
    private String country_name;
    // getters/setters

    public String getIcao_code() {
        return icao_code;
    }
    public void setIcao_code(String icao_code) {
        this.icao_code = icao_code;
    }

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
