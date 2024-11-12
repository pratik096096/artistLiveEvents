package com.artist.event.service;

import com.artist.event.model.Subscriber;
import com.artist.event.repository.SubscriberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventNotificationService {

    @Autowired
    private SubscriberRepository subscriberRepository;

    @Autowired
    private EmailService emailService;

    // Base URL of your website (replace with your actual website URL)
    private static final String WEBSITE_URL = "https://artist-live-events.vercel.app/";

    public void notifySubscribers(String eventName, String placeName) {
        List<Subscriber> subscribers = subscriberRepository.findAll();
        String subject = "New Event: " + eventName+", "+"Place Name: "+ placeName;

        // Message body including the event details and the website link
        String body = "Dear Subscriber,\n\n"
                + "A new event has been added.\n\n"
                + "For more details, please visit our website:\n"
                + WEBSITE_URL + "\n\n"
                + "Thank you.";


        for (Subscriber subscriber : subscribers) {
            emailService.sendEmail(subscriber.getEmail(), subject, body);
        }
    }
}
