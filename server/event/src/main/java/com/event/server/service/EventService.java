package com.event.server.service;

import com.event.server.model.Event;
import com.event.server.model.User;
import com.event.server.repository.EventRepository;
import jakarta.persistence.OptimisticLockException;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;


    public List<Event> getEventsByUserLogin(String login) {
        return eventRepository.findByUserLogin(login);
    }


    public Optional<Event> getEventByIdAndUser(Long id, String login) {
        return eventRepository.findByIdAndUserLogin(id, login);
    }


    public Event saveEvent(@Validated Event event) {
        if (event == null) {
            throw new IllegalArgumentException("O evento não pode ser nulo");
        }
        return eventRepository.save(event);
    }

   
    public void deleteEvent(Long id) {
        if (!eventRepository.existsById(id)) {
            throw new IllegalArgumentException("O evento com o ID " + id + " não existe");
        }
        eventRepository.deleteById(id);
    }
}
