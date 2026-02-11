package com.qtuan02.inventory.domain;

import java.util.Collection;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<InventoryEntity, Long> {
    List<InventoryEntity> findByProductCodeIn(Collection<String> productCodes);
}
