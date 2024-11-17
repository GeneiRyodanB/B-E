package org.historical.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.List;


//©@Entity
@Table(name = "resources")
public class Resource extends PanacheEntity {
    @NotBlank(message = "Title is required")
    @Column(nullable = false)
    public String title;
    
    public String author;
    
    @NotBlank(message = "Year is required")
    public String year;
    
    public String type;
    
    @Column(length = 1000)
    public String description;
    
    @ElementCollection
    @CollectionTable(name = "resource_topics")
    @Column(name = "topic")
    public List<String> topics;
    
    @NotBlank(message = "Resource type is required")
    @Column(nullable = false)
    public String resourceType;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id")
    public HistoricalEvent event;
}