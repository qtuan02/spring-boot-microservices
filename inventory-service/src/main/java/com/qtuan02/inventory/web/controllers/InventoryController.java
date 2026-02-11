package com.qtuan02.inventory.web.controllers;

import com.qtuan02.inventory.domain.Inventory;
import com.qtuan02.inventory.domain.InventoryService;
import com.qtuan02.inventory.domain.models.InventoryDeductRequest;
import com.qtuan02.inventory.domain.models.Response;
import com.qtuan02.inventory.domain.models.Result;
import jakarta.validation.Valid;
import java.util.Set;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inventories")
public class InventoryController {
    private final InventoryService inventoryService;

    InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping("/stocks-by-product-codes")
    public Result<Inventory> getStocksByProductCodes(@RequestParam Set<String> productCodes) {
        return inventoryService.getStocksByProductCodes(productCodes);
    }

    @PostMapping("/deduct")
    public Response<Void> deductStock(@RequestBody @Valid InventoryDeductRequest request) {
        return inventoryService.deductStock(request.items(), request.orderCode());
    }
}
