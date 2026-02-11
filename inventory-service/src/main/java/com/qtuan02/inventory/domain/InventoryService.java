package com.qtuan02.inventory.domain;

import com.qtuan02.inventory.ApplicationProperties;
import com.qtuan02.inventory.domain.models.Response;
import com.qtuan02.inventory.domain.models.Result;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class InventoryService {
    private final ApplicationProperties properties;
    private final InventoryRepository inventoryRepository;
    private final InventoryHistoryRepository inventoryHistoryRepository;
    private static final Logger log = LoggerFactory.getLogger(InventoryService.class);

    InventoryService(
            ApplicationProperties properties,
            InventoryRepository inventoryRepository,
            InventoryHistoryRepository inventoryHistoryRepository) {
        this.properties = properties;
        this.inventoryRepository = inventoryRepository;
        this.inventoryHistoryRepository = inventoryHistoryRepository;
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

    public Response<Void> deductStock(List<Inventory> items, String orderCode) {
        if (items == null || items.isEmpty()) {
            return Response.noContent("No items to deduct");
        }
        log.info("Starting stock deduction for order: {} ({} items)", orderCode, items.size());

        List<String> sortedProductCodes =
                items.stream().map(Inventory::productCode).sorted().toList();

        List<InventoryEntity> inventoryLocking =
                inventoryRepository.findAllByProductCodeInForUpdate(sortedProductCodes);

        InventoryValidate.validateProductsExist(sortedProductCodes, inventoryLocking);

        Map<String, InventoryEntity> inventoryByCode = inventoryLocking.stream()
                .collect(Collectors.toMap(InventoryEntity::getProductCode, Function.identity()));

        InventoryValidate.validateSufficientStock(inventoryByCode, items);

        List<InventoryHistoryEntity> inventoryHistories = items.stream()
                .map(item -> deductAndCreateHistory(inventoryByCode.get(item.productCode()), item, orderCode))
                .toList();

        inventoryHistoryRepository.saveAll(inventoryHistories);

        log.info("Successfully deducted stock and logged history for order: {}", orderCode);
        return Response.success("Stock deduction successful");
    }

    private InventoryHistoryEntity deductAndCreateHistory(
            InventoryEntity inventoryEntity, Inventory inventory, String orderCode) {
        inventoryEntity.setQuantity(inventoryEntity.getQuantity() - inventory.quantity());

        InventoryHistoryEntity history = new InventoryHistoryEntity();
        history.setProductCode(inventory.productCode());
        history.setChangeQuantity(-inventory.quantity());
        history.setReason(properties.newOrdersQueue());
        history.setReferenceId(orderCode);
        return history;
    }
}
