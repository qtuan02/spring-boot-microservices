package com.qtuan02.inventory.domain;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;

@DataJpaTest(
        properties = {
            "spring.test.database.replace=none",
            "spring.datasource.url=jdbc:tc:postgresql:18-alpine:///db",
        })
// @Import(TestcontainersConfiguration.class)
@Sql("/test-data.sql")
public class InventoryRepositoryTest {
    @Autowired
    private InventoryRepository inventoryRepository;

    @Test
    void shouldGetInventoryByProductCodes() {
        List<InventoryEntity> inventoryItems = inventoryRepository.findByProductCodeIn(List.of("P100", "P101", "P102"));

        assertThat(inventoryItems).hasSize(3);
        assertThat(inventoryItems).extracting("productCode").containsExactlyInAnyOrder("P100", "P101", "P102");
    }
}
