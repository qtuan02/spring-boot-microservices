package com.qtuan02.catalog.web.controllers;

import com.qtuan02.catalog.domain.categories.Category;
import com.qtuan02.catalog.domain.categories.CategoryService;
import com.qtuan02.catalog.domain.models.PagedResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryService categoryService;

    CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    PagedResult<Category> getCategories(
            @RequestParam(name = "page", required = false) Integer pageNo,
            @RequestParam(name = "size", required = false) Integer pageSize,
            @RequestParam(name = "sortBy", defaultValue = "name") String sortBy,
            @RequestParam(name = "asc", defaultValue = "true") boolean asc) {
        return categoryService.getCategories(pageNo, pageSize, sortBy, asc);
    }
}
