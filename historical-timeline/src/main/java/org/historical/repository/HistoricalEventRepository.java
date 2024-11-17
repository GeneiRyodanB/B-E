package org.historical.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.historical.model.HistoricalEvent;
import java.util.List;

//@ApplicationScoped
public class HistoricalEventRepository implements PanacheRepository<HistoricalEvent> {
    public List<HistoricalEvent> findByPeriod(String period) {
        return list("period", period);
    }
    
    public List<HistoricalEvent> findByCountry(String country) {
        return list("country", country);
    }
    
    public List<HistoricalEvent> search(String query) {
        String likeQuery = "%" + query.toLowerCase() + "%";
        return list("lower(event) like ?1 or lower(figure) like ?1 or lower(details) like ?1", 
                   likeQuery);
    }
}
