
package com.artist.event.controller;

import com.artist.event.model.Event;
import com.artist.event.repository.EventRepository;
import com.artist.event.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventService eventService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate; // For WebSocket messaging

    @PostMapping("/{city}")
    public ResponseEntity<Event> createEvent(
            @PathVariable String city,
            @RequestParam("eventName") String eventName,
            @RequestParam("placeName") String placeName,
            @RequestParam("eventTiming") String eventTiming,
            @RequestParam("isLive") boolean isLive,
            @RequestParam(value = "eventImage", required = false) MultipartFile eventImage
    ) {
        try {
            Event event = new Event();
            event.setEventName(eventName);
            event.setPlaceName(placeName);
            event.setEventTiming(eventTiming);
            event.setLive(isLive);
            event.setCity(city);
            if (eventImage != null) {
                event.setEventImage(eventImage.getBytes());
            }
            Event savedEvent = eventService.saveEvent(event);

            // Broadcast event creation to WebSocket clients
            messagingTemplate.convertAndSend("/topic/events/" + city, savedEvent);

            return ResponseEntity.ok(savedEvent);
        } catch (IOException e) {
            return ResponseEntity.status(500).build();
        }
    }


@DeleteMapping("/{id}")
public ResponseEntity<String> deleteEvent(@PathVariable Long id) {
    Event event = eventRepository.findById(id).orElse(null);
    if (event != null) {
        String city = event.getCity(); // Save the city before deleting
        eventRepository.deleteById(id);

        // Notify clients about the deletion
        Map<String, Object> deletionMessage = new HashMap<>();
        deletionMessage.put("id", id);
        deletionMessage.put("deleted", true); // Mark as a deletion message
        messagingTemplate.convertAndSend("/topic/events/" + city, deletionMessage);

        return ResponseEntity.ok("Event deleted successfully");
    } else {
        return ResponseEntity.status(404).body("Event not found");
    }
}


    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateEventStatus(@PathVariable Long id, @RequestParam Boolean isLive) {
        Event event = eventRepository.findById(id).orElse(null);
        if (event != null) {
            event.setLive(isLive);
            eventRepository.save(event);

            // Broadcast event status update to WebSocket clients
            messagingTemplate.convertAndSend("/topic/events/" + event.getCity(), event);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Event live status updated");
            response.put("event", event); // Optionally include updated event data
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(404).body(Map.of("error", "Event not found"));
        }
    }

    @GetMapping("/{city}")
    public ResponseEntity<List<Event>> getEventsByCity(@PathVariable String city) {
        List<Event> events = eventService.getEventsByCity(city);
        return ResponseEntity.ok(events);
    }
}
