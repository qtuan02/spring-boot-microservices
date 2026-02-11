package com.qtuan02.inventory.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "inventory_history")
public class InventoryHistoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "inv_history_id_generator")
    @SequenceGenerator(name = "inv_history_id_generator", sequenceName = "inv_history_id_seq", allocationSize = 50)
    private Long id;

    @NotBlank(message = "Product code is required") @Column(nullable = false)
    private String productCode;

    @NotNull(message = "Change quantity is required") @Column(nullable = false)
    private Integer changeQuantity;

    @NotBlank(message = "Reason is required") @Column(nullable = false)
    private String reason;

    private String referenceId;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public InventoryHistoryEntity() {}

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public Integer getChangeQuantity() {
        return changeQuantity;
    }

    public void setChangeQuantity(Integer changeQuantity) {
        this.changeQuantity = changeQuantity;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getReferenceId() {
        return referenceId;
    }

    public void setReferenceId(String referenceId) {
        this.referenceId = referenceId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
