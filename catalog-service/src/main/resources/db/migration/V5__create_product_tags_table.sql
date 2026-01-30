CREATE TABLE product_tags (
    product_id BIGINT NOT NULL REFERENCES products(id),
    tag_id     BIGINT NOT NULL REFERENCES tags(id),
    PRIMARY KEY (product_id, tag_id)
);