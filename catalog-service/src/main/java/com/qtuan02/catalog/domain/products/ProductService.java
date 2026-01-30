package com.qtuan02.catalog.domain.products;

import com.qtuan02.catalog.domain.models.PagedResult;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
@Transactional
public class ProductService {
    private final ProductRepository productRepository;

    ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public PagedResult<Product> getProducts(
            Integer pageNo, Integer pageSize, String sortBy, boolean asc, String categoryCode) {
        Pageable pageable = handlePageable(pageNo, pageSize, sortBy, asc);
        Page<ProductEntity> productsPageEntity;

        if (StringUtils.hasText(categoryCode))
            productsPageEntity = productRepository.findProductsByCategoryCode(categoryCode, pageable);
        else productsPageEntity = productRepository.findAll(pageable);

        Page<Product> productsPage = productsPageEntity.map(ProductMapper::toProduct);

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
        return productRepository.findByCode(code).map(ProductMapper::toProduct);
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
}
