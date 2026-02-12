package com.qtuan02.inventory.domain;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class InventoryValidate {

    public static void validateProductsExist(List<String> sortedProductCodes, List<InventoryEntity> inventoryEntities) {
        if (inventoryEntities.size() != sortedProductCodes.size()) {
            Set<String> foundCodes = inventoryEntities.stream()
                    .map(InventoryEntity::getProductCode)
                    .collect(Collectors.toSet());

            List<String> missingCodes = sortedProductCodes.stream()
                    .filter(code -> !foundCodes.contains(code))
                    .toList();

            throw InventoryDeductException.forNotFound(missingCodes);
        }
    }

    public static void validateSufficientStock(
            Map<String, InventoryEntity> inventoryByCode, List<Inventory> productCodes) {
        List<String> insufficientProducts = productCodes.stream()
                .filter(item -> {
                    InventoryEntity entity = inventoryByCode.get(item.productCode());
                    return entity.getQuantity() < item.quantity();
                })
                .map(Inventory::productCode)
                .toList();

        if (!insufficientProducts.isEmpty()) throw InventoryDeductException.forNotEnoughQuantity(insufficientProducts);
    }
}
