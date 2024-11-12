package com.artist.event.service;

import com.artist.event.model.Subscriber;
import com.artist.event.repository.SubscriberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubscriptionService {

    @Autowired
    private SubscriberRepository subscriberRepository;

    public boolean addSubscriber(String email) {
        try {
            Subscriber subscriber = new Subscriber();
            subscriber.setEmail(email);
            subscriberRepository.save(subscriber);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public List<Subscriber> getAllSubscribers() {
        return subscriberRepository.findAll();
    }
}
