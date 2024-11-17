package org.historical.model.dto.v2;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class EventDTO {
    public Long id;
    public String year;
    public String eventName;
    public List<String> figures = new ArrayList<>();;
    public String details;
    public String period;
    public String country;
    public Set<String> regions = new HashSet<>();
    public Set<String> topics = new HashSet<>();
    public String eventType;
    public List<ResourceDTO> resources = new ArrayList<>();
}
