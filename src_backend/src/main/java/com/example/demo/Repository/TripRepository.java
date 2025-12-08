//package com.example.demo.Repository;
//
//import com.example.demo.Model.Trip;
//import org.springframework.data.mongodb.repository.MongoRepository;
//import org.springframework.stereotype.Repository;
//
//@Repository
//public interface TripRepository extends MongoRepository<Trip, String> {
//}

package com.example.demo.Repository;

import com.example.demo.Model.Trip;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripRepository extends MongoRepository<Trip, String> {
    // NEW: Add this method
    List<Trip> findByUserId(String userId);
}
