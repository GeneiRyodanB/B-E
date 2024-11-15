package org.historical.model.dto;

import java.util.List;

public class HistoricalEventDTO {
    public Long id;
    public String year;
    public String event;
    public String figure;
    public String details;
    public String period;
    public String country;
    public List<String> topics;
    public List<ResourceDTO> resources;
}