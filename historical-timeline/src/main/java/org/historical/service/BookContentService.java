package org.historical.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.historical.model.BookContent;
import org.historical.repository.BookContentRepository;

import java.util.List;

@ApplicationScoped
public class BookContentService {

    @Inject
    BookContentRepository repository;

    public List<BookContent> getBookContent(String title, String author) {
        return repository.findByTitleAndAuthor(title, author);
    }

    @Transactional
    public BookContent addBookContent(BookContent content) {
        repository.persist(content);
        return content;
    }
}
