package com.artist.event.service;


import com.artist.event.model.Event;
import com.artist.event.repository.EventRepository;
import com.artist.event.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventNotificationService eventNotificationService;

//    public Event saveEvent(Event event) {
//        return eventRepository.save(event);
//    }
public Event saveEvent(Event event) {
    Event savedEvent = eventRepository.save(event);

    // Notify subscribers of the new event
    eventNotificationService.notifySubscribers(
            savedEvent.getEventName(),
            savedEvent.getPlaceName()
    );

    return savedEvent;
}

    public List<Event> getEventsByCity(String city) {
        return eventRepository.findByCity(city);
    }
}
