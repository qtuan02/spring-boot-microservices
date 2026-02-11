package com.qtuan02.inventory.domain;

public class InventoryHistoryMapper {
    public static InventoryHistory toInventoryHistory(InventoryHistoryEntity entity) {
        return new InventoryHistory(
                entity.getId(),
                entity.getProductCode(),
                entity.getChangeQuantity(),
                entity.getReason(),
                entity.getReferenceId(),
                entity.getCreatedAt());
    }
}
