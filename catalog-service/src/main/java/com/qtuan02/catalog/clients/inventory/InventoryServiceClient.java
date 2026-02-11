package com.qtuan02.catalog.clients.inventory;

import com.qtuan02.catalog.domain.models.Result;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class InventoryServiceClient {
    private static final Logger log = LoggerFactory.getLogger(InventoryServiceClient.class);

    private final RestClient restClient;

    InventoryServiceClient(@Qualifier("inventoryRestClient") RestClient restClient) {
        this.restClient = restClient;
    }

    @CircuitBreaker(name = "inventory-service")
    @Retry(name = "inventory-service", fallbackMethod = "getStocksByProductCodesFallback")
    public List<Inventory> getStocksByProductCodes(List<String> productCodes) {
        log.info("Fetching stocks for code: {}", productCodes);
        Result<Inventory> response = restClient
                .get()
                .uri(uriBuilder -> uriBuilder
                        .path("/api/inventories/stocks-by-product-codes")
                        .queryParam("productCodes", String.join(",", productCodes))
                        .build())
                .retrieve()
                .body(new ParameterizedTypeReference<Result<Inventory>>() {});

        if (response == null || response.data() == null) return List.of();

        return response.data();
    }

    List<Inventory> getStocksByProductCodesFallback(List<String> productCodes, Throwable t) {
        log.info("inventory-service get stocks by codes fallback: codes:{}, Error: {} ", productCodes, t.getMessage());
        return List.of();
    }
}
