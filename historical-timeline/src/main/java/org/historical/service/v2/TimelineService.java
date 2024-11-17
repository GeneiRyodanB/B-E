package org.historical.service.v2;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import org.historical.model.dto.v2.ResourceDTO;
import org.historical.model.v2.Event;
import org.historical.model.dto.v2.EventDTO;
import org.historical.model.v2.EventFigure;
import org.historical.model.v2.Resource;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@ApplicationScoped
public class TimelineService {

    @Transactional
    public List<EventDTO> getAllEvents() {
        return Event.<Event>listAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public EventDTO getEvent(Long id) {
        Event event = Event.findById(id);
        return event != null ? mapToDTO(event) : null;
    }

    @Transactional
    public List<EventDTO> getEventsByCountry(String country) {
        return Event.<Event>list("country", country).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<EventDTO> getEventsByPeriod(String period) {
        return Event.<Event>list("period", period).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public EventDTO createEvent(EventDTO eventDTO) {
        Event event = mapToEntity(eventDTO);
        event.persist();
        return mapToDTO(event);
    }

    @Transactional
    public List<EventDTO> createAllEvent(List<EventDTO> eventDTOs) {
        List<Event> events = eventDTOs.stream().map(this::mapToEntity).toList();
        Event.persist(events);
        return events.stream().map(this::mapToDTO).toList();
    }

    @Transactional
    public EventDTO updateEvent(Long id, EventDTO eventDTO) {
        Event event = Event.findById(id);
        if (event != null) {
            Event updated = mapToEntity(eventDTO);
            updated.id = id;
            updated.persistAndFlush();
            return mapToDTO(updated);
        }
        return null;
    }

    @Transactional
    public boolean deleteEvent(Long id) {
        return Event.deleteById(id);
    }

    // Helper methods for mapping between Entity and DTO
    private EventDTO mapToDTO(Event event) {
        EventDTO dto = new EventDTO();
        dto.id = event.id;
        dto.year = event.year;
        dto.eventName = event.eventName;
        if(event.figures != null) {
            dto.figures = event.figures.stream().map(eventFigure -> eventFigure.name).toList();

        }
        dto.details = event.details;
        dto.period = event.period;
        dto.country = event.country;
        dto.regions = new HashSet<>(event.regions);
        dto.topics = new HashSet<>(event.topics);
        dto.eventType = event.eventType;
        dto.resources = event.resources.stream()
                .map(this::mapToResourceDTO)
                .collect(Collectors.toList());
        return dto;
    }

    private Event mapToEntity(EventDTO dto) {
        Event event = new Event();
        event.year = dto.year;
        event.eventName = dto.eventName;
        if (dto.figures != null) {
            event.figures = dto.figures.stream().map(figure -> new EventFigure(figure)).toList();
        }
        event.details = dto.details;
        event.period = dto.period;
        event.country = dto.country;
        event.regions = new HashSet<>(dto.regions);
        event.topics = new HashSet<>(dto.topics);
        event.eventType = dto.eventType;
        event.resources = dto.resources.stream()
                .map(this::mapToResourceEntity)
                .collect(Collectors.toList());
        return event;
    }

    private ResourceDTO mapToResourceDTO(Resource resource) {
        ResourceDTO resourceDTO = new ResourceDTO();
        resourceDTO.id = resource.id;
        resourceDTO.title = resource.title;
        resourceDTO.author = resource.author;
        resourceDTO.description = resource.description;
        resourceDTO.year = resource.year;
        resourceDTO.type = resource.type;
        resourceDTO.resourceType = resource.resourceType;
        resourceDTO.topics = new HashSet<>(resource.topics);
        return resourceDTO;
    }

    private Resource mapToResourceEntity(ResourceDTO dto) {
        Resource resource = new Resource();
        resource.title = dto.title;
        resource.author = dto.author;
        resource.description = dto.description;
        resource.year = dto.year;
        resource.type = dto.type;
        resource.resourceType = dto.resourceType;
        resource.topics = new HashSet<>(dto.topics);
        return resource;
    }

}
