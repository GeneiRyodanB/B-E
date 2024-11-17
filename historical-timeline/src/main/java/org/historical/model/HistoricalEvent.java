package org.historical.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.ArrayList;
import java.util.List;

//@Entity
@Table(name = "historical_events")
public class HistoricalEvent extends PanacheEntity {
    @NotBlank(message = "Year is required")
    @Column(nullable = false)
    public String year;
    
    @NotBlank(message = "Event name is required")
    @Column(nullable = false)
    public String event;
    
    @NotBlank(message = "Historical figure is required")
    @Column(nullable = false)
    public String figure;
    
    @Column(length = 1000)
    public String details;
    
    @NotBlank(message = "Period is required")
    @Column(nullable = false)
    public String period;
    
    @NotBlank(message = "Country is required")
    @Column(nullable = false)
    public String country;

    @ElementCollection
    @CollectionTable(name = "event_topics")
    @Column(name = "topic")
    public List<String> topics = new ArrayList<>();

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    public List<Resource> resources;

}
