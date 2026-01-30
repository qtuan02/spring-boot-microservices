package com.qtuan02.catalog.domain.categories;

import com.qtuan02.catalog.domain.models.PagedResult;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CategoryService {
    private final CategoryRepository categoryRepository;

    CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public PagedResult<Category> getCategories(Integer pageNo, Integer pageSize, String sortBy, boolean asc) {
        Pageable pageable;
        Sort sort = asc ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

        if (pageNo == null) {
            pageable = Pageable.unpaged(sort);
        } else {
            int finalPageNo = pageNo <= 1 ? 0 : pageNo - 1;
            int finalPageSize = (pageSize == null || pageSize <= 0) ? 10 : pageSize;

            pageable = PageRequest.of(finalPageNo, finalPageSize, sort);
        }

        Page<Category> categriesPage = categoryRepository.findAll(pageable).map(CategoryMapper::toCategory);

        return new PagedResult<>(
                categriesPage.getContent(),
                categriesPage.getTotalElements(),
                categriesPage.getNumber() + 1,
                categriesPage.getTotalPages(),
                categriesPage.isFirst(),
                categriesPage.isLast(),
                categriesPage.hasNext(),
                categriesPage.hasPrevious());
    }
}
