package org.historical.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.historical.model.BookContent;

import java.util.List;

@ApplicationScoped
public class BookContentRepository implements PanacheRepository<BookContent> {
    public List<BookContent> findByTitleAndAuthor(String title, String author) {
        return find("title = ?1 and author = ?2", title, author).list();
    }
}
