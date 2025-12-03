package com.example.demo.DTO;

public class ConversationMessage {
    private String role;  // "user" or "assistant"
    private String content;

    // Constructors
    public ConversationMessage() {}

    public ConversationMessage(String role, String content) {
        this.role = role;
        this.content = content;
    }

    // Getters and Setters
    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
