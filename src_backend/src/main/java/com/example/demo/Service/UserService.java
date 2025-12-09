package com.example.demo.Service;

import com.example.demo.Model.User;
import com.example.demo.Repository.UserRepository;
import com.example.demo.DTO.UserTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import org.mindrot.jbcrypt.BCrypt;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepo;

    public String createUser(UserTO userTO) {
        try {

            // Check if email already exists
            User existingUser = userRepo.findByEmail(userTO.getEmail());
            if (existingUser != null) {
                return "Error: Email already registered";
            }

            if (userTO.getPassword().length() < 7){
                return "Error: Password must be 8 characters or more.";
            }


            String hashedPassword = BCrypt.hashpw(userTO.getPassword(), BCrypt.gensalt());
            User user = User.builder()
                    .email(userTO.getEmail())
                    .password(hashedPassword)
                    .build();
            userRepo.save(user);

        } catch (Exception e){
            e.printStackTrace();
            return "Error creating user";
        }

        return "User Created Successfully";
    }

    public boolean loginUser(String email, String password) {
        User user = userRepo.findByEmail(email);
        if (user == null) {
            System.out.println("User not found.");
            return false;
        }


        return BCrypt.checkpw(password, user.getPassword());
    }

    public List<User> getUsers() {
        List<User> userList = new ArrayList<>();
        try {
            userList = userRepo.findAll();
        } catch (Exception e) {
        }

        return userList;
    }

    public User getUserByEmail(String email) {
        return userRepo.findByEmail(email);
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
