package org.historical.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.historical.model.v2.Resource;

//@ApplicationScoped
public class ResourceRepository implements PanacheRepository<Resource> {
}