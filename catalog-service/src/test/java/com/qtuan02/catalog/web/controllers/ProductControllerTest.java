package com.qtuan02.catalog.web.controllers;

import static io.restassured.RestAssured.given;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;

import com.qtuan02.catalog.AbstractIT;
import com.qtuan02.catalog.domain.products.Product;
import io.restassured.http.ContentType;
import java.math.BigDecimal;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.jdbc.Sql;

@Sql("/test-data.sql")
class ProductControllerTest extends AbstractIT {

    @Test
    void shouldReturnProducts() {
        given().contentType(ContentType.JSON)
                .when()
                .get("/api/products")
                .then()
                .statusCode(200)
                .body("data", hasSize(15))
                .body("totalElements", is(15))
                .body("pageNumber", is(1))
                .body("totalPages", is(1))
                .body("isFirst", is(true))
                .body("isLast", is(true))
                .body("hasNext", is(false))
                .body("hasPrevious", is(false));
    }

    @Test
    void shouldReturnProductsWithPagination() {
        given().contentType(ContentType.JSON)
                .queryParam("page", 1)
                .queryParam("size", 5)
                .when()
                .get("/api/products")
                .then()
                .statusCode(200)
                .body("data", hasSize(5))
                .body("totalElements", is(15))
                .body("pageNumber", is(1))
                .body("totalPages", is(3))
                .body("isFirst", is(true))
                .body("isLast", is(false))
                .body("hasNext", is(true))
                .body("hasPrevious", is(false));
    }

    @Test
    void shouldGetProductByCode() {
        Product product = given().contentType(ContentType.JSON)
                .when()
                .get("/api/products/{code}", "P100")
                .then()
                .statusCode(200)
                .assertThat()
                .extract()
                .body()
                .as(Product.class);

        assertThat(product.code()).isEqualTo("P100");
        assertThat(product.name()).isEqualTo("The Hunger Games");
        assertThat(product.description()).isEqualTo("Winning will make you famous. Losing means certain death...");
        assertThat(product.price()).isEqualTo(new BigDecimal("34.0"));
    }

    @Test
    void shouldReturnNotFoundWhenProductCodeNotExists() {
        String code = "invalid_product_code";
        given().contentType(ContentType.JSON)
                .when()
                .get("/api/products/{code}", code)
                .then()
                .statusCode(404)
                .body("status", is(404))
                .body("title", is("Product Not Found"))
                .body("detail", is("Product with code " + code + " not found"));
    }

    @Test
    void shouldReturnProductsByCategory() {
        given().contentType(ContentType.JSON)
                .queryParam("category", "fiction")
                .when()
                .get("/api/products")
                .then()
                .statusCode(200)
                .body("data", hasSize(9))
                .body("totalElements", is(9));
    }

    @Test
    void shouldReturnProductsByCategoryWithPagination() {
        given().contentType(ContentType.JSON)
                .queryParam("category", "fiction")
                .queryParam("page", 1)
                .queryParam("size", 5)
                .when()
                .get("/api/products")
                .then()
                .statusCode(200)
                .body("data", hasSize(5))
                .body("totalElements", is(9))
                .body("totalPages", is(2))
                .body("hasNext", is(true));
    }
}
