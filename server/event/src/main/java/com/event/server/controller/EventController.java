package com.event.server.controller;
import com.event.server.model.Event;
import com.event.server.model.User;
import com.event.server.service.EventService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:4200")
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping
    public List<Event> getAllEvents() {

        return eventService.getAllEvents();

    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        Optional<Event> event = eventService.getEventById(id);
        return event.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }


    @Transactional
    @PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();


        if (authentication != null && authentication.isAuthenticated()) {
            UserDetails loggedInUser = (UserDetails) authentication.getPrincipal();


            User user = (User) loggedInUser;
            event.setUser(user);


            if (!event.getUser().getLogin().equals(user.getLogin())) {
                return ResponseEntity.status(403).build();
            }

            Event savedEvent = eventService.saveEvent(event);
            return ResponseEntity.ok(savedEvent);
        } else {
            return ResponseEntity.status(401).build();
        }
    }


    @Transactional
    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event updatedEvent) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            UserDetails loggedInUser = (UserDetails) authentication.getPrincipal();
            User user = (User) loggedInUser;

            Optional<Event> existingEventOptional = eventService.getEventById(id);
            if (existingEventOptional.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Event existingEvent = existingEventOptional.get();


            if (!existingEvent.getUser().getLogin().equals(user.getLogin())) {
                return ResponseEntity.status(403).build();
            }


            existingEvent.setText(updatedEvent.getText());
            existingEvent.setStartDate(updatedEvent.getStartDate());
            existingEvent.setEndDate(updatedEvent.getEndDate());


            Event savedEvent = eventService.saveEvent(existingEvent);
            return ResponseEntity.ok(savedEvent);
        } else {
            return ResponseEntity.status(401).build();
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        Optional<Event> event = eventService.getEventById(id);
        if (event.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }

}