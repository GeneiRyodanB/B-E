package org.historical.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "book_contents")
public class BookContent extends PanacheEntity {
    @Column(nullable = false)
    public String title;

    @Column(nullable = false)
    public String author;

    @Column(nullable = false)
    public String language;

    @Column(columnDefinition = "TEXT")
    public String content;

    // Add reference to the resource
    //@OneToOne
    //@JoinColumn(name = "resource_id")
    //public Resource resource;
}
