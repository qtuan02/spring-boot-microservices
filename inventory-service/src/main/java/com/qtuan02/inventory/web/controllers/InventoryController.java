package com.qtuan02.inventory.web.controllers;

import com.qtuan02.inventory.domain.Inventory;
import com.qtuan02.inventory.domain.InventoryService;
import com.qtuan02.inventory.domain.models.Result;
import java.util.Set;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
}
