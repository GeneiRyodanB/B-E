package org.historical.model.v2;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import java.util.Set;

@Entity
public class Resource extends PanacheEntity {
    @Column(nullable = false)
    public String title;

    public String author;

    public String year;

    public String type;

    @Column(length = 1000)
    public String description;

    @ElementCollection
    public Set<String> topics;

    public String resourceType;
}
