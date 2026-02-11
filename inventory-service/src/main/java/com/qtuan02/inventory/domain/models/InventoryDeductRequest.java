package com.qtuan02.inventory.domain.models;

import com.qtuan02.inventory.domain.Inventory;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public record InventoryDeductRequest(
        @NotBlank(message = "Order code must not be blank") String orderCode,
        @NotEmpty(message = "Items list must not be empty") @Valid List<Inventory> items) {}
