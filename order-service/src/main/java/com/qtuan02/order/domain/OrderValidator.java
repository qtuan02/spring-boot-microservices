package com.qtuan02.order.domain;

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

    OrderValidator(ProductServiceClient client, InventoryServiceClient inventoryServiceClient) {
        this.clientProduct = client;
        this.inventoryServiceClient = inventoryServiceClient;
    }

    void validatePriceProduct(CreateOrderRequest request) {
        Set<OrderItem> items = request.items();
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
