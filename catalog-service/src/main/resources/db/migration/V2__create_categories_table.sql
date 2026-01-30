CREATE SEQUENCE category_id_seq START WITH 1 INCREMENT BY 50;

CREATE TABLE categories (
    id   BIGINT DEFAULT NEXTVAL('category_id_seq') NOT NULL,
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    PRIMARY KEY (id)
);