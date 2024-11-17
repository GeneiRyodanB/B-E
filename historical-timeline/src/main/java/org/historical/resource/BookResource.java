package org.historical.resource;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.historical.model.BookContent;
import org.historical.service.BookContentService;

import java.util.List;


@Path("/books")
@Produces(MediaType.APPLICATION_JSON)
public class BookResource {

    @Inject
    BookContentService bookContentService;

    @GET
    @Path("/content")
    @Produces(MediaType.TEXT_PLAIN)
    public Response getBookContents(
            @QueryParam("title") String title,
            @QueryParam("author") String author
    ) {
        List<BookContent> books = bookContentService.getBookContent(title, author);

        if (books == null || books.isEmpty()) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Book content not found")
                    .build();
        }

        return Response.ok(books)
                .header("Content-Type", MediaType.APPLICATION_JSON)
                .build();
    }

    @POST
    @Path("/content")
    @Transactional
    public Response addBookContent(BookContent bookContent) {
        bookContentService.addBookContent(bookContent);
        return Response.status(Response.Status.CREATED)
                .entity(bookContent)
                .build();
    }
}



