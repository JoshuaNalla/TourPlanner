package com.example.demo.Controller;

import com.example.demo.Model.User;
import com.example.demo.Service.UserService;
import com.example.demo.DTO.UserTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public String createUser(@RequestBody UserTO userTO) {
        return userService.createUser(userTO);
    }

    @GetMapping("/get")
    @ResponseStatus(HttpStatus.OK)
    public List<User> getUser() {
        return userService.getUsers();
    }

    @GetMapping("/get/{email}")
    @ResponseStatus(HttpStatus.OK)
    public User getUserByEmail(@PathVariable String email) { return userService.getUserByEmail(email); }

    @DeleteMapping("/delete")
    @ResponseStatus(HttpStatus.OK)
    public String deleteUser(@RequestParam String id) {
        return userService.deleteUser(id);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.OK)
    public String updateUser(@RequestBody UserTO userTO) {
        return userService.updateUser(userTO);
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public boolean login(@RequestBody UserTO userTO) {
        boolean result = userService.loginUser(userTO.getEmail(), userTO.getPassword());
        System.out.println("Successful Login: " + result);
        return result;
    }

}
