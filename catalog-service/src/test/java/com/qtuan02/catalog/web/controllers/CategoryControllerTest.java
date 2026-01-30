package com.qtuan02.catalog.web.controllers;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;

import com.qtuan02.catalog.AbstractIT;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.jdbc.Sql;

@Sql("/test-data.sql")
class CategoryControllerTest extends AbstractIT {

    @Test
    void shouldReturnCategories() {
        given().contentType(ContentType.JSON)
                .when()
                .get("/api/categories")
                .then()
                .statusCode(200)
                .body("data", hasSize(3))
                .body("totalElements", is(3))
                .body("pageNumber", is(1))
                .body("totalPages", is(1))
                .body("isFirst", is(true))
                .body("isLast", is(true));
    }

    @Test
    void shouldReturnCategoriesWithPagination() {
        given().contentType(ContentType.JSON)
                .queryParam("page", 1)
                .queryParam("size", 2)
                .when()
                .get("/api/categories")
                .then()
                .statusCode(200)
                .body("data", hasSize(2))
                .body("totalElements", is(3))
                .body("pageNumber", is(1))
                .body("totalPages", is(2))
                .body("isFirst", is(true))
                .body("isLast", is(false))
                .body("hasNext", is(true));
    }
}
