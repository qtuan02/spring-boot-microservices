CREATE SEQUENCE inventory_id_seq START WITH 1 INCREMENT BY 50;

CREATE TABLE inventory (
    id           BIGINT DEFAULT NEXTVAL('inventory_id_seq') NOT NULL,
    product_code VARCHAR(255) NOT NULL UNIQUE,
    quantity     INTEGER      NOT NULL DEFAULT 0,
    created_at   TIMESTAMP             DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP             DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT quantity_check CHECK (quantity >= 0)
);

CREATE INDEX idx_inventory_product_code ON inventory(product_code);