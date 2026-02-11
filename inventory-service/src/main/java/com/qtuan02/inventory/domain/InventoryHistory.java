package com.qtuan02.inventory.domain;

import java.time.LocalDateTime;

public record InventoryHistory(
        Long id,
        String productCode,
        Integer changeQuantity,
        String reason,
        String referenceId,
        LocalDateTime createdAt) {}
