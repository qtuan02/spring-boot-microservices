package com.qtuan02.catalog.domain.products;

import com.qtuan02.catalog.clients.inventory.Inventory;
import com.qtuan02.catalog.clients.inventory.InventoryServiceClient;
import com.qtuan02.catalog.domain.models.PagedResult;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductService {
    private final ProductRepository productRepository;
    private final InventoryServiceClient inventoryServiceClient;

    ProductService(ProductRepository productRepository, InventoryServiceClient inventoryServiceClient) {
        this.productRepository = productRepository;
        this.inventoryServiceClient = inventoryServiceClient;
    }

    public PagedResult<Product> getProducts(
            Integer pageNo, Integer pageSize, String sortBy, boolean asc, String categoryCode) {
        Pageable pageable = handlePageable(pageNo, pageSize, sortBy, asc);
        Page<ProductEntity> productsPageEntity;

        if (StringUtils.hasText(categoryCode))
            productsPageEntity = productRepository.findProductsByCategoryCode(categoryCode, pageable);
        else productsPageEntity = productRepository.findAll(pageable);

        Page<Product> productsPage = handleProductsPageWithStocks(productsPageEntity);

        return new PagedResult<>(
                productsPage.getContent(),
                productsPage.getTotalElements(),
                productsPage.getNumber() + 1,
                productsPage.getTotalPages(),
                productsPage.isFirst(),
                productsPage.isLast(),
                productsPage.hasNext(),
                productsPage.hasPrevious());
    }

    public Optional<Product> getProductByCode(String code) {
        return productRepository.findByCode(code).map(entity -> {
            List<Inventory> stocks = inventoryServiceClient.getStocksByProductCodes(List.of(code));
            Integer stock = stocks.isEmpty() ? 0 : stocks.getFirst().quantity();
            return ProductMapper.toProduct(entity, stock);
        });
    }

    private Pageable handlePageable(Integer pageNo, Integer pageSize, String sortBy, boolean asc) {
        Pageable pageable;
        Sort sort = asc ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

        if (pageNo == null) {
            pageable = Pageable.unpaged(sort);
        } else {
            int finalPageNo = pageNo <= 1 ? 0 : pageNo - 1;
            int finalPageSize = (pageSize == null || pageSize <= 0) ? 10 : pageSize;
            pageable = PageRequest.of(finalPageNo, finalPageSize, sort);
        }

        return pageable;
    }

    private Page<Product> handleProductsPageWithStocks(Page<ProductEntity> productsPageEntity) {
        List<String> productCodes = productsPageEntity.getContent().stream()
                .map(ProductEntity::getCode)
                .toList();

        List<Inventory> stocks = inventoryServiceClient.getStocksByProductCodes(productCodes);

        System.out.println(stocks);

        Map<String, Integer> stockMap = stocks.stream()
                .collect(Collectors.toMap(
                        Inventory::productCode, Inventory::quantity, (existing, replacement) -> existing));

        return productsPageEntity.map(entity -> {
            Integer quantity = stockMap.getOrDefault(entity.getCode(), 0);
            return ProductMapper.toProduct(entity, quantity);
        });
    }
}
