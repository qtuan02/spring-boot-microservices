-- Clear all data
TRUNCATE TABLE product_tags, products, tags, categories, authors RESTART IDENTITY CASCADE;

-- Insert authors
INSERT INTO authors(id, name) VALUES
    (1, 'Suzanne Collins'),
    (2, 'Harper Lee'),
    (3, 'C.S. Lewis'),
    (4, 'Margaret Mitchell'),
    (5, 'John Green'),
    (6, 'Shel Silverstein'),
    (7, 'Dan Brown'),
    (8, 'Paulo Coelho'),
    (9, 'E.B. White'),
    (10, 'Antoine de Saint-Exupery'),
    (11, 'Khaled Hosseini'),
    (12, 'George R.R. Martin'),
    (13, 'Markus Zusak'),
    (14, 'Ken Kesey'),
    (15, 'E.L. James');

-- Insert categories
INSERT INTO categories(id, code, name) VALUES
    (1, 'fiction', 'Fiction'),
    (2, 'classic', 'Classics'),
    (3, 'fantasy', 'Fantasy and Sci-Fi');

-- Insert tags
INSERT INTO tags(id, name) VALUES
    (1, 'Bestseller'),
    (2, 'New Arrival'),
    (3, 'Recommended');

-- Insert products
INSERT INTO products(id, code, name, description, image_url, price, category_id, author_id) VALUES
    (1, 'P100', 'The Hunger Games', 'Winning will make you famous. Losing means certain death...', 'https://images.gr-assets.com/books/1447303603l/2767052.jpg', 34.0, 1, 1),
    (2, 'P101', 'To Kill a Mockingbird', 'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it...', 'https://images.gr-assets.com/books/1361975680l/2657.jpg', 45.40, 2, 2),
    (3, 'P102', 'The Chronicles of Narnia', 'Journeys to the end of the world, fantastic creatures, and epic battles between good and evil...', 'https://images.gr-assets.com/books/1449868701l/11127.jpg', 44.50, 3, 3),
    (4, 'P103', 'Gone with the Wind', 'Gone with the Wind is a novel written by Margaret Mitchell, first published in 1936.', 'https://images.gr-assets.com/books/1328025229l/18405.jpg', 44.50, 2, 4),
    (5, 'P104', 'The Fault in Our Stars', 'Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis.', 'https://images.gr-assets.com/books/1360206420l/11870085.jpg', 14.50, 1, 5),
    (6, 'P105', 'The Giving Tree', 'Once there was a tree...and she loved a little boy.', 'https://images.gr-assets.com/books/1174210942l/370493.jpg', 32.0, 1, 6),
    (7, 'P106', 'The Da Vinci Code', 'An ingenious code hidden in the works of Leonardo da Vinci. A desperate race through the cathedrals and castles of Europe', 'https://images.gr-assets.com/books/1303252999l/968.jpg', 14.50, 1, 7),
    (8, 'P107', 'The Alchemist', 'Paulo Coelho masterpiece tells the mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure', 'https://images.gr-assets.com/books/1483412266l/865.jpg', 12.0, 1, 8),
    (9, 'P108', 'Charlottes Web', 'This beloved book by E. B. White, author of Stuart Little and The Trumpet of the Swan, is a classic of childrens literature', 'https://images.gr-assets.com/books/1439632243l/24178.jpg', 14.0, 1, 9),
    (10, 'P109', 'The Little Prince', 'Moral allegory and spiritual autobiography, The Little Prince is the most translated book in the French language.', 'https://images.gr-assets.com/books/1367545443l/157993.jpg', 16.50, 2, 10),
    (11, 'P110', 'A Thousand Splendid Suns', 'A Thousand Splendid Suns is a breathtaking story set against the volatile events of Afghanistans last thirty years...', 'https://images.gr-assets.com/books/1345958969l/128029.jpg', 15.50, 1, 11),
    (12, 'P111', 'A Game of Thrones', 'Here is the first volume in George R. R. Martins magnificent cycle of novels that includes A Clash of Kings and A Storm of Swords.', 'https://images.gr-assets.com/books/1436732693l/13496.jpg', 32.0, 3, 12),
    (13, 'P112', 'The Book Thief', 'Nazi Germany. The country is holding its breath. Death has never been busier, and will be busier still.', 'https://images.gr-assets.com/books/1522157426l/19063.jpg', 30.0, 1, 13),
    (14, 'P113', 'One Flew Over the Cuckoos Nest', 'Tyrannical Nurse Ratched rules her ward in an Oregon State mental hospital with a strict and unbending routine...', 'https://images.gr-assets.com/books/1516211014l/332613.jpg', 23.0, 2, 14),
    (15, 'P114', 'Fifty Shades of Grey', 'When literature student Anastasia Steele goes to interview young entrepreneur Christian Grey, she encounters a man who is beautiful, brilliant, and intimidating.', 'https://images.gr-assets.com/books/1385207843l/10818853.jpg', 27.0, 1, 15);

-- Insert product_tags (Bestseller: tag_id=1)
INSERT INTO product_tags(product_id, tag_id) VALUES
    (1, 1), (2, 1), (4, 1), (7, 1), (8, 1), (10, 1), (12, 1), (15, 1);

-- Insert product_tags (New Arrival: tag_id=2)
INSERT INTO product_tags(product_id, tag_id) VALUES
    (1, 2), (3, 2), (5, 2), (6, 2), (11, 2), (13, 2), (14, 2), (15, 2);

-- Insert product_tags (Recommended: tag_id=3)
INSERT INTO product_tags(product_id, tag_id) VALUES
    (2, 3), (3, 3), (5, 3), (8, 3), (9, 3), (11, 3), (13, 3), (14, 3);