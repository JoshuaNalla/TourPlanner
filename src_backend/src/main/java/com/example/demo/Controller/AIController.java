package com.example.demo.Controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import com.example.demo.DTO.ChatRequest;
import com.example.demo.DTO.ConversationMessage;
import com.example.demo.DTO.TripContext;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:3001")
public class AIController {

    @Value("${groq.api.key}")
    private String groqApiKey;

    @Value("${groq.api.url}")
    private String groqApiUrl;

    @PostMapping("/chat")
    public ResponseEntity<?> chat(@RequestBody ChatRequest request) {
        System.out.println("=== AI Chat Request Received ===");
        System.out.println("Message: " + request.getMessage());
        System.out.println("Context: " + (request.getContext() != null ? request.getContext().getDestination() : "null"));

        try {
            // Validate API key
            if (groqApiKey == null || groqApiKey.isEmpty()) {
                System.err.println("ERROR: Groq API key is not configured!");
                return ResponseEntity.status(500).body(
                        Map.of("error", "Groq API key is not configured in application.properties")
                );
            }

            // Build the prompt with context
            String systemPrompt = buildSystemPrompt(request.getContext());
            System.out.println("System prompt: " + systemPrompt);

            // Create request body for Groq
            Map<String, Object> groqRequest = new HashMap<>();
            // this model should work, also github test! say hi bud
            groqRequest.put("model", "llama-3.3-70b-versatile");

            List<Map<String, String>> messages = new ArrayList<>();
            messages.add(Map.of("role", "system", "content", systemPrompt));

            // Add conversation history
            if (request.getConversationHistory() != null && !request.getConversationHistory().isEmpty()) {
                for (ConversationMessage msg : request.getConversationHistory()) {
                    Map<String, String> messageMap = new HashMap<>();
                    messageMap.put("role", msg.getRole());
                    messageMap.put("content", msg.getContent());
                    messages.add(messageMap);
                }
            }

            // Add current message
            Map<String, String> userMessage = new HashMap<>();
            userMessage.put("role", "user");
            userMessage.put("content", request.getMessage());
            messages.add(userMessage);

            groqRequest.put("messages", messages);
            groqRequest.put("temperature", 0.7);
            groqRequest.put("max_tokens", 1000);

            System.out.println("Sending request to Groq API...");

            // Make API call to Groq
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + groqApiKey);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(groqRequest, headers);

            ResponseEntity<Map> response = restTemplate.exchange(
                    groqApiUrl,
                    HttpMethod.POST,
                    entity,
                    Map.class
            );

            System.out.println("Received response from Groq API");

            // Extract AI response
            Map<String, Object> responseBody = response.getBody();
            if (responseBody == null) {
                throw new RuntimeException("Empty response from Groq API");
            }

            List<Map<String, Object>> choices = (List<Map<String, Object>>) responseBody.get("choices");
            if (choices == null || choices.isEmpty()) {
                throw new RuntimeException("No choices in Groq API response");
            }

            Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
            String aiResponse = (String) message.get("content");

            System.out.println("AI Response: " + aiResponse.substring(0, Math.min(100, aiResponse.length())) + "...");
            System.out.println("=== Request Complete ===\n");

            Map<String, String> result = new HashMap<>();
            result.put("response", aiResponse);
            return ResponseEntity.ok(result);

        } catch (HttpClientErrorException e) {
            System.err.println("HTTP Client Error: " + e.getStatusCode());
            System.err.println("Response body: " + e.getResponseBodyAsString());
            e.printStackTrace();

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Groq API error: " + e.getMessage());
            errorResponse.put("details", e.getResponseBodyAsString());
            return ResponseEntity.status(500).body(errorResponse);

        } catch (HttpServerErrorException e) {
            System.err.println("HTTP Server Error: " + e.getStatusCode());
            System.err.println("Response body: " + e.getResponseBodyAsString());
            e.printStackTrace();

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Groq API server error: " + e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);

        } catch (Exception e) {
            System.err.println("Unexpected error: " + e.getClass().getName());
            System.err.println("Message: " + e.getMessage());
            e.printStackTrace();

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to get AI response: " + e.getMessage());
            errorResponse.put("type", e.getClass().getSimpleName());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    private String buildSystemPrompt(TripContext context) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("You are a helpful AI travel assistant. ");
        prompt.append("The user is planning a trip with the following details:\n\n");

        if (context != null) {
            if (context.getTripTitle() != null && !context.getTripTitle().isEmpty())
                prompt.append("Trip Title: ").append(context.getTripTitle()).append("\n");
            if (context.getDestination() != null && !context.getDestination().isEmpty())
                prompt.append("Destination: ").append(context.getDestination()).append("\n");
            if (context.getStartDate() != null && !context.getStartDate().isEmpty())
                prompt.append("Start Date: ").append(context.getStartDate()).append("\n");
            if (context.getEndDate() != null && !context.getEndDate().isEmpty())
                prompt.append("End Date: ").append(context.getEndDate()).append("\n");
            if (context.getBudget() != null && !context.getBudget().isEmpty())
                prompt.append("Budget: ").append(context.getCurrency()).append(" ").append(context.getBudget()).append("\n");
            if (context.getTransportationType() != null && !context.getTransportationType().isEmpty())
                prompt.append("Transportation: ").append(context.getTransportationType()).append("\n");
            if (context.getAccommodationType() != null && !context.getAccommodationType().isEmpty())
                prompt.append("Accommodation: ").append(context.getAccommodationType()).append("\n");
        }

        prompt.append("\nProvide helpful, friendly, and concise travel advice. ");
        prompt.append("Keep responses conversational and under 200 words unless more detail is specifically requested.");

        return prompt.toString();
    }
}