INSERT INTO product_tags(product_id, tag_id)
SELECT id, (SELECT id FROM tags WHERE name='Bestseller') FROM products
WHERE code IN ('P100', 'P101', 'P103', 'P106', 'P107', 'P109', 'P111', 'P114');

INSERT INTO product_tags(product_id, tag_id)
SELECT id, (SELECT id FROM tags WHERE name='New Arrival') FROM products
WHERE code IN ('P100', 'P102', 'P104', 'P105', 'P110', 'P112', 'P113', 'P114');

INSERT INTO product_tags(product_id, tag_id)
SELECT id, (SELECT id FROM tags WHERE name='Recommended') FROM products
WHERE code IN ('P101', 'P102', 'P104', 'P107', 'P108', 'P110', 'P112', 'P113');