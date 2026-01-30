package com.qtuan02.catalog.domain.products;

import com.qtuan02.catalog.domain.authors.AuthorMapper;
import com.qtuan02.catalog.domain.categories.CategoryMapper;
import com.qtuan02.catalog.domain.tags.TagEntity;

public class ProductMapper {
    public static Product toProduct(ProductEntity productEntity) {
        return new Product(
                productEntity.getCode(),
                productEntity.getName(),
                productEntity.getDescription(),
                productEntity.getImageUrl(),
                productEntity.getPrice(),
                CategoryMapper.toCategory(productEntity.getCategory()),
                AuthorMapper.toAuthor(productEntity.getAuthor()),
                productEntity.getTags().stream().map(TagEntity::getName).toArray(String[]::new));
    }
}
