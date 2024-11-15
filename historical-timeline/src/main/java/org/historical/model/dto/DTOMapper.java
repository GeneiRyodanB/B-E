package org.historical.model.dto;

import org.historical.model.HistoricalEvent;
import org.historical.model.Resource;

import java.util.List;
import java.util.stream.Collectors;

public class DTOMapper {
    public static HistoricalEventDTO toDTO(HistoricalEvent event) {
        HistoricalEventDTO dto = new HistoricalEventDTO();
        dto.id = event.id;
        dto.year = event.year;
        dto.event = event.event;
        dto.figure = event.figure;
        dto.details = event.details;
        dto.period = event.period;
        dto.country = event.country;
        dto.topics = List.copyOf(event.topics);
        dto.resources = event.resources.stream()
                .map(DTOMapper::toDTO)
                .collect(Collectors.toList());
        return dto;
    }

    public static ResourceDTO toDTO(Resource resource) {
        ResourceDTO dto = new ResourceDTO();
        dto.id = resource.id;
        dto.title = resource.title;
        dto.author = resource.author;
        dto.year = resource.year;
        dto.type = resource.type;
        dto.description = resource.description;
        dto.resourceType = resource.resourceType;
        dto.topics = resource.topics;
        return dto;
    }
}
