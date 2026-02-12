package com.qtuan02.order.clients.inventory;

import com.qtuan02.order.domain.models.InventoryDeductRequest;
import com.qtuan02.order.domain.models.Response;
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
    @Retry(name = "inventory-service", fallbackMethod = "deductStockFallback")
    public boolean deductStock(String orderCode, List<Inventory> items) {
        log.info("Deducting stock for order: {}", orderCode);
        var request = new InventoryDeductRequest(orderCode, items);
        Response<Void> response = restClient
                .post()
                .uri("/api/inventories/deduct")
                .body(request)
                .retrieve()
                .body(new ParameterizedTypeReference<Response<Void>>() {});
        if (response != null && response.statusCode() == 200) return true;
        return false;
    }

    boolean deductStockFallback(String orderCode, List<Inventory> items, Throwable t) {
        log.error("inventory-service deduct stock fallback: order:{}, Error: {}", orderCode, t.getMessage());
        return false;
    }
}
