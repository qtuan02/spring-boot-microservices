package com.qtuan02.catalog.domain.authors;

public class AuthorMapper {
    public static Author toAuthor(AuthorEntity authorEntity) {
        return new Author(authorEntity.getId(), authorEntity.getName());
    }
}
