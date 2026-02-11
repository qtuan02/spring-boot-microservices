package com.qtuan02.inventory.domain;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public record Inventory(
        @NotBlank(message = "Product code must not be blank") String productCode,
        @Positive(message = "Quantity must be positive") Integer quantity) {}
