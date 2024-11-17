package org.historical.resource;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.historical.model.HistoricalEvent;
import org.historical.model.Resource;
import org.historical.model.dto.DTOMapper;
import org.historical.model.dto.HistoricalEventDTO;
import org.historical.repository.HistoricalEventRepository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Path("/historical")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class HistoricalEventResource {

    @Inject
    HistoricalEventRepository repository;

    @GET
    public Response getAllEvents(
            @QueryParam("period") String period,
            @QueryParam("country") String country,
            @QueryParam("search") String search) {
        List<HistoricalEvent> events;

        // Apply filters
        if (search != null && !search.isEmpty()) {
            events = repository.search(search);
        } else if (period != null && !period.equals("All")) {
            events = repository.findByPeriod(period);
        } else if (country != null && !country.equals("All")) {
            events = repository.findByCountry(country);
        } else {
            events = repository.listAll();
        }

        // Group events by period and country
        Map<String, Map<String, List<HistoricalEventDTO>>> groupedEvents = events.stream()
                .map(DTOMapper::toDTO)
                .collect(Collectors.groupingBy(
                        dto -> dto.period,
                        Collectors.groupingBy(dto -> dto.country)
                ));

        return Response.ok(groupedEvents).build();
    }

    @GET
    @Path("/{id}")
    public Response getEvent(@PathParam("id") Long id) {
        return repository.findByIdOptional(id)
                .map(event -> Response.ok(DTOMapper.toDTO(event)).build())
                .orElse(Response.status(Response.Status.NOT_FOUND).build());
    }

    @POST
    @Transactional
    public Response createEvent(@Valid HistoricalEvent event) {
        repository.persist(event);
        return Response.status(Response.Status.CREATED)
                .entity(event)
                .build();
    }

    @POST
    @Path("/all")
    @Transactional
    public Response createAllEvent(@Valid List<HistoricalEvent> events) {
        repository.persist(events);
        return Response.status(Response.Status.CREATED)
                .entity(events)
                .build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response updateEvent(@PathParam("id") Long id, @Valid HistoricalEvent updatedEvent) {
        HistoricalEvent existingEvent = repository.findById(id);
        if (existingEvent == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        // Update the fields
        existingEvent.year = updatedEvent.year;
        existingEvent.event = updatedEvent.event;
        existingEvent.figure = updatedEvent.figure;
        existingEvent.details = updatedEvent.details;
        existingEvent.period = updatedEvent.period;
        existingEvent.country = updatedEvent.country;

        // The repository will automatically persist the changes due to @Transactional
        return Response.ok(existingEvent).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteEvent(@PathParam("id") Long id) {
        boolean wasDeleted = repository.deleteById(id);
        return wasDeleted ? 
            Response.noContent().build() : 
            Response.status(Response.Status.NOT_FOUND).build();
    }

    @GET
    @Path("/periods")
    public Response getPeriods() {
        List<String> periods = repository.find("select distinct e.period from HistoricalEvent e")
                .project(String.class)
                .list();
        return Response.ok(periods).build();
    }

    @GET
    @Path("/countries")
    public Response getCountries() {
        List<String> countries = repository.find("select distinct e.country from HistoricalEvent e")
                .project(String.class)
                .list();
        return Response.ok(countries).build();
    }

    @POST
    @Path("/bulk")
    @Transactional
    public Response createBulkEvents(List<@Valid HistoricalEvent> events) {
        repository.persist(events);
        return Response.status(Response.Status.CREATED)
                .entity(events)
                .build();
    }

    // Helper endpoint to initialize some sample data
    @POST
    @Path("/init")
    @Transactional
    public Response initializeData() {
        // Only initialize if the database is empty
        if (repository.count() > 0) {
            return Response.ok("Data already exists").build();
        }

        // Morocco Event
        HistoricalEvent moroccoEvent = new HistoricalEvent();
        moroccoEvent.year = "1912";
        moroccoEvent.event = "Establishment of French Protectorate in Morocco";
        moroccoEvent.figure = "Walter Harris";
        moroccoEvent.details = "Period of significant transformation in Morocco, documented by Times correspondent Walter Harris";
        moroccoEvent.period = "Modern Era";
        moroccoEvent.country = "Morocco";
        moroccoEvent.resources = new ArrayList<>();
        moroccoEvent.topics = List.of(
                "Colonialism",
                "European Imperialism",
                "North African History",
                "French Colonial Empire",
                "International Relations"
        );

        Resource moroccoThatWas = new Resource();
        moroccoThatWas.title = "Morocco That Was";
        moroccoThatWas.type = "Historical Account";
        moroccoThatWas.year = "1921";
        moroccoThatWas.description = "...";
        moroccoThatWas.resourceType = "book";
        moroccoThatWas.event = moroccoEvent;
        moroccoThatWas.topics = List.of("Pre-colonial Morocco", "European Journalism", "Diplomatic History");
        moroccoEvent.resources.add(moroccoThatWas);

        // Ancient Egypt - Narmer
        HistoricalEvent narmerEvent = new HistoricalEvent();
        narmerEvent.year = "3150 BCE";
        narmerEvent.event = "Unification of Upper and Lower Egypt";
        narmerEvent.figure = "King Narmer";
        narmerEvent.details = "First dynasty of Egypt established under King Narmer, unifying Upper and Lower Egypt";
        narmerEvent.period = "Ancient Period";
        narmerEvent.country = "Egypt";
        narmerEvent.resources = new ArrayList<>();
        narmerEvent.topics = List.of(
                "Ancient Civilizations",
                "State Formation",
                "Political Unification",
                "Early Dynasties",
                "Ancient Egyptian History"
        );

        Resource narmerPalette = new Resource();
        narmerPalette.title = "The Narmer Palette";
        narmerPalette.type = "Archaeological Artifact";
        narmerPalette.year = "3150 BCE";
        narmerPalette.description = "Ancient ceremonial palette depicting the unification of Upper and Lower Egypt";
        narmerPalette.resourceType = "artifact";
        narmerPalette.event = narmerEvent;
        narmerPalette.topics = List.of("Ancient Egyptian Art", "Early Dynastic Period", "Royal Artifacts");
        narmerEvent.resources.add(narmerPalette);

        Resource narmerBook = new Resource();
        narmerBook.title = "Early Dynastic Egypt";
        narmerBook.author = "Toby A. H. Wilkinson";
        narmerBook.year = "1999";
        narmerBook.type = "Academic Book";
        narmerBook.description = "Comprehensive study of the First Dynasty of Egypt";
        narmerBook.resourceType = "book";
        narmerBook.event = narmerEvent;
        narmerBook.topics = List.of("Egyptian Politics", "Ancient Egyptian History", "State Formation");
        narmerEvent.resources.add(narmerBook);

        // Julius Caesar
        HistoricalEvent caesarEvent = new HistoricalEvent();
        caesarEvent.year = "44 BCE";
        caesarEvent.event = "Assassination of Julius Caesar";
        caesarEvent.figure = "Julius Caesar";
        caesarEvent.details = "Julius Caesar was assassinated by Roman senators, marking a turning point in Roman history";
        caesarEvent.period = "Ancient Period";
        caesarEvent.country = "Rome";
        caesarEvent.resources = new ArrayList<>();

        Resource commentaries = new Resource();
        commentaries.title = "The Civil War";
        commentaries.author = "Julius Caesar";
        commentaries.year = "40 BCE";
        commentaries.type = "Primary Source";
        commentaries.description = "Caesar's firsthand account of the civil war that led to his dictatorship";
        commentaries.resourceType = "book";
        commentaries.event = caesarEvent;
        commentaries.topics = List.of("Roman Civil War", "Military History", "Political Commentary");
        caesarEvent.resources.add(commentaries);

        Resource caesarBiography = new Resource();
        caesarBiography.title = "The Death of Caesar";
        caesarBiography.author = "Barry Strauss";
        caesarBiography.year = "2015";
        caesarBiography.type = "Historical Study";
        caesarBiography.description = "Modern analysis of Caesar's assassination and its context";
        caesarBiography.resourceType = "book";
        caesarBiography.event = caesarEvent;
        caesarBiography.topics = List.of("Roman Politics", "Conspiracy", "Late Republic");
        caesarEvent.resources.add(caesarBiography);

        // Leonardo da Vinci
        HistoricalEvent daVinciEvent = new HistoricalEvent();
        daVinciEvent.year = "1503";
        daVinciEvent.event = "Mona Lisa Painted";
        daVinciEvent.figure = "Leonardo da Vinci";
        daVinciEvent.details = "Creation of the famous Mona Lisa portrait";
        daVinciEvent.period = "Renaissance";
        daVinciEvent.country = "Italy";
        daVinciEvent.topics = List.of(
                "Renaissance Art",
                "Italian Renaissance",
                "Art History",
                "Cultural History",
                "European Art"
        );
        daVinciEvent.resources = new ArrayList<>();

        Resource monalisaStudy = new Resource();
        monalisaStudy.title = "Mona Lisa: Inside the Painting";
        monalisaStudy.author = "Jean-Pierre Mohen";
        monalisaStudy.year = "2006";
        monalisaStudy.type = "Art Analysis";
        monalisaStudy.description = "Scientific and historical analysis of the Mona Lisa";
        monalisaStudy.resourceType = "study";
        monalisaStudy.event = daVinciEvent;
        monalisaStudy.topics = List.of("Renaissance Art", "Painting Techniques", "Art Conservation");
        daVinciEvent.resources.add(monalisaStudy);

        Resource leonardoNotebooks = new Resource();
        leonardoNotebooks.title = "Leonardo's Notebooks";
        leonardoNotebooks.author = "Leonardo da Vinci";
        leonardoNotebooks.year = "1503";
        leonardoNotebooks.type = "Primary Source";
        leonardoNotebooks.description = "Da Vinci's personal notebooks containing sketches and notes";
        leonardoNotebooks.resourceType = "document";
        leonardoNotebooks.event = daVinciEvent;
        leonardoNotebooks.topics = List.of("Renaissance Science", "Art Theory", "Engineering");
        daVinciEvent.resources.add(leonardoNotebooks);

        // Moon Landing
        HistoricalEvent moonLandingEvent = new HistoricalEvent();
        moonLandingEvent.year = "1969";
        moonLandingEvent.event = "Moon Landing";
        moonLandingEvent.figure = "Neil Armstrong";
        moonLandingEvent.details = "First human landing on the Moon during NASA's Apollo 11 mission";
        moonLandingEvent.period = "Modern Era";
        moonLandingEvent.country = "USA";
        moonLandingEvent.topics = List.of(
                "Space Exploration",
                "Cold War",
                "Scientific Achievement",
                "Technological Innovation",
                "Space Race"
        );
        moonLandingEvent.resources = new ArrayList<>();

        Resource apolloReport = new Resource();
        apolloReport.title = "Apollo 11 Mission Report";
        apolloReport.author = "NASA";
        apolloReport.year = "1969";
        apolloReport.type = "Technical Document";
        apolloReport.description = "Official NASA report on the Apollo 11 mission";
        apolloReport.resourceType = "document";
        apolloReport.event = moonLandingEvent;
        apolloReport.topics = List.of("Space Exploration", "Mission Documentation", "Technical Analysis");
        moonLandingEvent.resources.add(apolloReport);

        Resource armstrongBio = new Resource();
        armstrongBio.title = "First Man: The Life of Neil A. Armstrong";
        armstrongBio.author = "James R. Hansen";
        armstrongBio.year = "2005";
        armstrongBio.type = "Biography";
        armstrongBio.description = "Authorized biography of Neil Armstrong";
        armstrongBio.resourceType = "book";
        armstrongBio.event = moonLandingEvent;
        armstrongBio.topics = List.of("Space History", "NASA", "Personal Biography");
        moonLandingEvent.resources.add(armstrongBio);

        // Persist all events
        List<HistoricalEvent> events = List.of(
                moroccoEvent,
                narmerEvent,
                caesarEvent,
                daVinciEvent,
                moonLandingEvent
        );

        repository.persist(events);
        return Response.ok("Sample data initialized with " + events.size() + " events").build();
    }

    private HistoricalEvent createEvent(String year, String event, String figure, 
            String details, String period, String country) {
        HistoricalEvent historicalEvent = new HistoricalEvent();
        historicalEvent.year = year;
        historicalEvent.event = event;
        historicalEvent.figure = figure;
        historicalEvent.details = details;
        historicalEvent.period = period;
        historicalEvent.country = country;
        return historicalEvent;
    }
}