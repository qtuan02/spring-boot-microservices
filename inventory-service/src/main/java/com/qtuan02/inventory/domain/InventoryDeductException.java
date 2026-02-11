package com.qtuan02.inventory.domain;

import java.util.List;

public class InventoryDeductException extends RuntimeException {
    public InventoryDeductException(String message) {
        super(message);
    }

    public static InventoryDeductException forNotFound(List<String> productCodes) {
        return new InventoryDeductException("Product with code " + productCodes + " not found");
    }

    public static InventoryDeductException forNotEnoughQuantity(List<String> productCodes) {
        return new InventoryDeductException("Product with code" + productCodes + " not enough quantity");
    }
}
