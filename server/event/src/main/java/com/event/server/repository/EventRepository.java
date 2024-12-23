package com.event.server.repository;
import com.event.server.model.Event;
import com.event.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {


    List<Event> findByUserLogin(String login);


    Optional<Event> findByIdAndUserLogin(Long id, String login);
}
