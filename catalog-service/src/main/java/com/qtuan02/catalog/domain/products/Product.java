package com.qtuan02.catalog.domain.products;

import com.qtuan02.catalog.domain.authors.Author;
import com.qtuan02.catalog.domain.categories.Category;
import java.math.BigDecimal;

public record Product(
        String code,
        String name,
        String description,
        String imageUrl,
        BigDecimal price,
        Integer quantity,
        Category category,
        Author author,
        String[] tags) {}
