package com.qtuan02.order.domain.models;

import com.qtuan02.order.clients.inventory.Inventory;
import jakarta.validation.Valid;
import java.util.List;

public record InventoryDeductRequest(String orderCode, @Valid List<Inventory> items) {}
