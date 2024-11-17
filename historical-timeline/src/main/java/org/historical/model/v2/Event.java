package org.historical.model.v2;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
public class Event extends PanacheEntity {
    @Column(nullable = false)
    public String year;

    @Column(nullable = false)
    public String eventName;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "event_id")
    public List<EventFigure> figures = new ArrayList<>();

    @Column(length = 2000)
    public String details;

    @Column(nullable = false)
    public String period;

    @Column(nullable = false)
    public String country;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "event_regions",
            joinColumns = @JoinColumn(name = "event_id"))
    @Column(name = "regions")
    public Set<String> regions;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "event_topics",
            joinColumns = @JoinColumn(name = "event_id"))
    @Column(name = "topics")
    public Set<String> topics;

    @Column(nullable = false)
    public String eventType;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "event_id")
    public List<Resource> resources;
}
