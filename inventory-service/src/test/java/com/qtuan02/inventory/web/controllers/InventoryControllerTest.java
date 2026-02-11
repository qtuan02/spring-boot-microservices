package com.qtuan02.inventory.web.controllers;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.hasSize;

import com.qtuan02.inventory.AbstractIT;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.jdbc.Sql;

@Sql("/test-data.sql")
class InventoryControllerTest extends AbstractIT {

    @Test
    void shouldReturnStocksByProductCodes() {
        given().contentType(ContentType.JSON)
                .when()
                .get("/api/inventories/stocks-by-product-codes?productCodes=P100,P101,P102")
                .then()
                .statusCode(200)
                .body("data", hasSize(3));
    }
}
