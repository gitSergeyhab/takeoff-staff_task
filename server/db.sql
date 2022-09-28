DROP DATABASE IF EXISTS takeoff_staff2;

CREATE DATABASE takeoff_staff2;

use takeoff_staff2;
SELECT * from users;

CREATE TABLE users ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    email VARCHAR(255) NOT NULL, 
    password VARCHAR(255) NOT NULL 
    );


CREATE TABLE contacts ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR(255) NOT NULL, 
    phone VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL
    );

INSERT INTO users (email, password) VALUES 
    ('no-mail@qq.com', 'pas-no-mail@qq.com'), 
    ('super-alex@qq.com', 'pas-super-alex@qq.com'), 
    ('goodman@qq.com', 'pas-goodman@qq.com');

INSERT INTO contacts (name, email, phone) VALUES 
    ('alex', 'no-mail@qq.com', '1411-22-22-22'), 
    ('ben', 'super-ben@qq.com', '3333-44-55-66'), 
    ('cavin', 'cavingoodman@qq.com', '666-777-828-99'),
    ('david', 'david-mail@qq.com', '111-22-22-122'), 
    ('elen', 'elen-alex@qq.com', '333-244-55-66'), 
    ('frank', 'goodman@qq.com', '666-777-88-992'),
    ('greg', 'no-greg@qq.com', '111-22-232-22'), 
    ('hanry', 'super-hanry@qq.com', '3233-44-55-66'), 
    ('izabel', 'goodman@izabel.com', '666-7377-88-99'),
    ('john', 'no-mail@john.com', '111-22-242-22'), 
    ('klaudia', 'super-klaudia@qq.com', '333-444-55-66'), 
    ('linda', 'goodman@linda.com', '6636-777-88-99');