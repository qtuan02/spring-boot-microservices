package com.qtuan02.catalog.domain.products;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    Optional<ProductEntity> findByCode(String code);

    @EntityGraph(attributePaths = {"category", "author", "tags"})
    Page<ProductEntity> findProductsByCategoryCode(String categoryCode, Pageable pageable);
}
