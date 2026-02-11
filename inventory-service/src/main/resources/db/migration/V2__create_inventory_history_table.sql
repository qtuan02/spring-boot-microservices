CREATE SEQUENCE inv_history_id_seq START WITH 1 INCREMENT BY 50;

CREATE TABLE inventory_history (
    id              BIGINT DEFAULT NEXTVAL('inv_history_id_seq') NOT NULL,
    product_code    VARCHAR(255) NOT NULL,
    change_quantity INTEGER      NOT NULL,
    reason          VARCHAR(50)  NOT NULL,
    reference_id    VARCHAR(255),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE INDEX idx_inv_history_product_code ON inventory_history(product_code);