package com.example.demo.FlightAPI;

import java.util.List;

public class FlightInfo {

    private List<Data> data;

    public List<Data> getData() { return data; }
    public void setData(List<Data> data) { this.data = data; }

    public static class Data {
        public String flight_status;
        public Flight flight;
        public Part departure;
        public Part arrival;
        public Airline airline;
    }

    public static class Flight {
        public String iata;
        public String icao;
    }

    public static class Part {
        public String airport;
        public String icao;
    }

    public static class Airline {
        public String name;
    }
}

