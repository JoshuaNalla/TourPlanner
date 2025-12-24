package com.example.demo.DTO;

import java.util.List;

// for AI!

public class ChatRequest {
    private String message;
    private TripContext context;
    private List<ConversationMessage> conversationHistory;

    // Constructors
    public ChatRequest() {}

    public ChatRequest(String message, TripContext context, List<ConversationMessage> conversationHistory) {
        this.message = message;
        this.context = context;
        this.conversationHistory = conversationHistory;
    }

    // Getters and Setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public TripContext getContext() {
        return context;
    }

    public void setContext(TripContext context) {
        this.context = context;
    }

    public List<ConversationMessage> getConversationHistory() {
        return conversationHistory;
    }

    public void setConversationHistory(List<ConversationMessage> conversationHistory) {
        this.conversationHistory = conversationHistory;
    }
}
// for AI!!
