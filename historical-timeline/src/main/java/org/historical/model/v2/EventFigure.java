package org.historical.model.v2;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "event_figures")
public class EventFigure extends PanacheEntity {

    @Column(nullable = false)
    public String name;

    public EventFigure() {}

    public EventFigure(String name) {
        this.name = name;
    }
}

