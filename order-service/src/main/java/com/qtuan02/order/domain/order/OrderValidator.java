package com.qtuan02.order.domain.order;

import com.qtuan02.order.ApplicationProperties;
import com.qtuan02.order.clients.catalog.Product;
import com.qtuan02.order.clients.catalog.ProductServiceClient;
import com.qtuan02.order.clients.inventory.Inventory;
import com.qtuan02.order.clients.inventory.InventoryServiceClient;
import com.qtuan02.order.domain.models.CreateOrderRequest;
import com.qtuan02.order.domain.models.OrderItem;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;

@Component
public class OrderValidator {
    private static final Logger log = LoggerFactory.getLogger(OrderValidator.class);

    private final ProductServiceClient clientProduct;
    private final InventoryServiceClient inventoryServiceClient;
    private final ApplicationProperties properties;

    OrderValidator(
            ProductServiceClient client,
            InventoryServiceClient inventoryServiceClient,
            ApplicationProperties properties) {
        this.clientProduct = client;
        this.inventoryServiceClient = inventoryServiceClient;
        this.properties = properties;
    }

    void validatePriceProduct(CreateOrderRequest request) {
        Set<OrderItem> items = request.items();
        double expectedTotal = 0;

        for (OrderItem item : items) {
            Product product = clientProduct
                    .getProductByCode(item.code())
                    .orElseThrow(() -> new InvalidOrderException("Invalid Product code:" + item.code()));
            if (item.price().compareTo(product.price()) != 0) {
                log.error(
                        "Product price not matching. Actual price:{}, received price:{}",
                        product.price(),
                        item.price());
                throw new InvalidOrderException("Product price not matching");
            }
            expectedTotal += item.price().doubleValue() * item.quantity();
        }

        if (expectedTotal != request.totalAmount().doubleValue()) {
            log.error("Total amount mismatch. Expected: {}, received: {}", expectedTotal, request.totalAmount());
            throw new InvalidOrderException(
                    "Total amount mismatch. Expected: " + expectedTotal + ", received: " + request.totalAmount());
        }

        double expectedTax = Math.round(expectedTotal * properties.bookTaxRate() * 100.0) / 100.0;

        if (expectedTax != request.taxAmount().doubleValue()) {
            log.error("Tax amount mismatch. Expected: {}, received: {}", expectedTax, request.taxAmount());
            throw new InvalidOrderException(
                    "Tax amount mismatch. Expected: " + expectedTax + ", received: " + request.taxAmount());
        }

        double expectedFinal = expectedTotal + expectedTax;

        if (expectedFinal != request.finalAmount().doubleValue()) {
            log.error("Final amount mismatch. Expected: {}, received: {}", expectedFinal, request.finalAmount());
            throw new InvalidOrderException(
                    "Final amount mismatch. Expected: " + expectedFinal + ", received: " + request.finalAmount());
        }
    }

    void validateDeductInventory(String orderCode, CreateOrderRequest request) {
        Set<OrderItem> items = request.items();
        List<Inventory> itemInventory = items.stream()
                .map(item -> new Inventory(item.code(), item.quantity()))
                .toList();
        log.info("Validating and deducting inventory for order: {}", orderCode);
        boolean deductionSuccessful = inventoryServiceClient.deductStock(orderCode, itemInventory);

        if (!deductionSuccessful) throw new InvalidOrderException("Failed to deduct stock from inventory");
    }
}
