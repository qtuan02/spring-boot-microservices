package com.qtuan02.order.domain.models;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.Set;

public record CreateOrderRequest(
        @Valid @NotEmpty(message = "Items cannot be empty") Set<OrderItem> items,
        @Valid Customer customer,
        @Valid Address deliveryAddress,
        @NotNull BigDecimal totalAmount,
        @NotNull BigDecimal taxAmount,
        @NotNull BigDecimal finalAmount,
        String comments) {}
