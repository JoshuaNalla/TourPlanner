package com.example.demo.Service;

import com.example.demo.Model.User;
import com.example.demo.Repository.UserRepository;
import com.example.demo.DTO.UserTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepo;

    public String createUser(UserTO userTO) {
        try {
            User user = User.builder()
                    .email(userTO.getEmail())
                    .password(userTO.getPassword())
                    .build();
            userRepo.save(user);

        } catch (Exception e){
            e.printStackTrace();
            return "Error creating user";
        }

        return "User Created Successfully";
    }

    public List<User> getUsers() {
        List<User> userList = new ArrayList<>();
        try {
            userList = userRepo.findAll();
        } catch (Exception e) {
        }

        return userList;
    }

    public String deleteUser(String id) {
        try {
            userRepo.deleteById(id);
        } catch (Exception e) {
            return "Error Deleting User";
        }

        return "User Deleted Successfully";
    }

    public String updateUser(UserTO userTO) {
        try {
            User user = User.builder()
                    .id(userTO.getId())
                    .email(userTO.getEmail())
                    .password(userTO.getPassword())
                    .build();
            userRepo.save(user);
        } catch (Exception e) {
            return "Error Updating User";
        }

        return "User Updated Successfully";
    }
}
