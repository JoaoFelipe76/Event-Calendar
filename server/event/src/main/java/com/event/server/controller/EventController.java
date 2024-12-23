package com.event.server.controller;
import com.event.server.model.Event;
import com.event.server.model.User;
import com.event.server.repository.UserRepository;
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

    @Autowired
    private UserRepository userRepository;


    @GetMapping
    public List<Event> getAllEvents() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails loggedInUser = (UserDetails) authentication.getPrincipal();

        if (authentication != null && authentication.isAuthenticated()) {

            return eventService.getEventsByUserLogin(loggedInUser.getUsername());
        } else {
            return (List<Event>) ResponseEntity.status(401).build();
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails loggedInUser = (UserDetails) authentication.getPrincipal();

        Optional<Event> event = eventService.getEventByIdAndUser(id, loggedInUser.getUsername());
        return event.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }


    @Transactional
    @PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            UserDetails loggedInUser = (UserDetails) authentication.getPrincipal();


            Optional<User> userOptional = userRepository.findByLogin(loggedInUser.getUsername());

            if (userOptional.isPresent()) {
                User user = userOptional.get();
                event.setUser(user);

                Event savedEvent = eventService.saveEvent(event);
                return ResponseEntity.ok(savedEvent);
            } else {
                return null;
            }
        } else {
            return ResponseEntity.status(401).build();
        }
    }



    @Transactional
    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event updatedEvent) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails loggedInUser = (UserDetails) authentication.getPrincipal();

        Optional<Event> existingEventOptional = eventService.getEventByIdAndUser(id, loggedInUser.getUsername());
        if (existingEventOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Event existingEvent = existingEventOptional.get();
        existingEvent.setText(updatedEvent.getText());
        existingEvent.setStartDate(updatedEvent.getStartDate());
        existingEvent.setEndDate(updatedEvent.getEndDate());

        Event savedEvent = eventService.saveEvent(existingEvent);
        return ResponseEntity.ok(savedEvent);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails loggedInUser = (UserDetails) authentication.getPrincipal();

        Optional<Event> event = eventService.getEventByIdAndUser(id, loggedInUser.getUsername());
        if (event.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }
}
