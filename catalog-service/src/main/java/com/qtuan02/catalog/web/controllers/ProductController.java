package com.qtuan02.catalog.web.controllers;

import com.qtuan02.catalog.domain.models.PagedResult;
import com.qtuan02.catalog.domain.products.Product;
import com.qtuan02.catalog.domain.products.ProductNotFoundException;
import com.qtuan02.catalog.domain.products.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    PagedResult<Product> getProducts(
            @RequestParam(name = "page", required = false) Integer pageNo,
            @RequestParam(name = "size", required = false) Integer pageSize,
            @RequestParam(name = "sortBy", defaultValue = "name") String sortBy,
            @RequestParam(name = "asc", defaultValue = "true") boolean asc,
            @RequestParam(name = "category", required = false) String categoryCode) {
        return productService.getProducts(pageNo, pageSize, sortBy, asc, categoryCode);
    }

    @GetMapping("/{code}")
    ResponseEntity<Product> getProductByCode(@PathVariable String code) {
        return productService
                .getProductByCode(code)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> ProductNotFoundException.forCode(code));
    }
}
