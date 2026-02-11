package com.qtuan02.inventory.domain;

import com.qtuan02.inventory.domain.models.Result;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class InventoryService {
    private final InventoryRepository inventoryRepository;

    InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public Result<Inventory> getStocksByProductCodes(Set<String> productCodes) {
        if (productCodes == null || productCodes.isEmpty()) return new Result<>(List.of());

        List<InventoryEntity> inventoryEntities = inventoryRepository.findByProductCodeIn(productCodes);

        Map<String, Integer> stockMap = inventoryEntities.stream()
                .collect(Collectors.toMap(
                        InventoryEntity::getProductCode,
                        InventoryEntity::getQuantity,
                        (existing, replacement) -> existing // Safe-guard
                        ));

        List<Inventory> inventories = productCodes.stream()
                .map(code -> new Inventory(code, stockMap.getOrDefault(code, 0)))
                .toList();

        return new Result<>(inventories);
    }
}
