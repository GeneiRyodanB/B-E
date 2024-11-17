package org.historical.resource;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.historical.model.dto.v2.EventDTO;
import org.historical.service.v2.TimelineService;
import java.util.List;

@Path("v2/timeline")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TimelineResource {

    @Inject
    TimelineService timelineService;

    @GET
    public Response getAllEvents() {
        List<EventDTO> events = timelineService.getAllEvents();
        return Response.ok(events).build();
    }

    @GET
    @Path("/{id}")
    public Response getEvent(@PathParam("id") Long id) {
        EventDTO event = timelineService.getEvent(id);
        if (event != null) {
            return Response.ok(event).build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }

    @GET
    @Path("/country/{country}")
    public Response getEventsByCountry(@PathParam("country") String country) {
        List<EventDTO> events = timelineService.getEventsByCountry(country);
        return Response.ok(events).build();
    }

    @GET
    @Path("/period/{period}")
    public Response getEventsByPeriod(@PathParam("period") String period) {
        List<EventDTO> events = timelineService.getEventsByPeriod(period);
        return Response.ok(events).build();
    }

    @POST
    public Response createEvent(EventDTO eventDTO) {
        EventDTO created = timelineService.createEvent(eventDTO);
        return Response.status(Response.Status.CREATED)
                .entity(created)
                .build();
    }

    @POST
    @Path("/all")
    public Response createAllEvent(List<EventDTO> eventDTOs) {
        List<EventDTO> created = timelineService.createAllEvent(eventDTOs);
        return Response.status(Response.Status.CREATED)
                .entity(created)
                .build();
    }

    @PUT
    @Path("/{id}")
    public Response updateEvent(@PathParam("id") Long id, EventDTO eventDTO) {
        EventDTO updated = timelineService.updateEvent(id, eventDTO);
        if (updated != null) {
            return Response.ok(updated).build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteEvent(@PathParam("id") Long id) {
        boolean deleted = timelineService.deleteEvent(id);
        if (deleted) {
            return Response.noContent().build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }
}
