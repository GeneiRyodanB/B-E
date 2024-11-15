package org.historical;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

@QuarkusTest
class HistoricalResourceTest {

    @Disabled
    @Test
    void testHelloEndpoint() {
        given()
          .when().get("/api/historical")
          .then()
             .statusCode(200)
             .body(is("Hello from RESTEasy Reactive"));
    }

}