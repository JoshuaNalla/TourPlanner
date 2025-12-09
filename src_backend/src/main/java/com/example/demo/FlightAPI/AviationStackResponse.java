package com.example.demo.FlightAPI;

import java.util.List;

public class AviationStackResponse {
    private List<AirportInfo> data;

    public List<AirportInfo> getData() {
        return data;
    }

    public void setData(List<AirportInfo> data) {
        this.data = data;
    }
}
