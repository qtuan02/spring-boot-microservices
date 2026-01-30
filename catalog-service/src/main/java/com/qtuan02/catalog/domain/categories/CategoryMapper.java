package com.qtuan02.catalog.domain.categories;

public class CategoryMapper {
    public static Category toCategory(CategoryEntity categoryEntity) {
        return new Category(categoryEntity.getCode(), categoryEntity.getName());
    }
}
