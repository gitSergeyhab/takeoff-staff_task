DROP DATABASE IF EXISTS takeoff_staff;

CREATE DATABASE takeoff_staff;

use takeoff_staff;

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


INSERT INTO contacts (name, email, phone) VALUES 
    ('alex', 'no-mail@qq.com', '89998887766'), 
    ('ben', 'super-ben@qq.com', '89998881166'), 
    ('cavin', 'cavingoodman@qq.com', '88008887766'),
    ('david', 'david-mail@qq.com', '89998887711'), 
    ('elen', 'elen-alex@qq.com', '89998887722'), 
    ('frank', 'goodman@qq.com', '89998887733'),
    ('greg', 'no-greg@qq.com', '89998887744'), 
    ('hanry', 'super-hanry@qq.com', '89998887755'), 
    ('izabel', 'goodman@izabel.com', '89998887777'),
    ('john', 'no-mail@john.com', '89998887799'), 
    ('klaudia', 'super-klaudia@qq.com', '899988877612'), 
    ('linda', 'goodman@linda.com', '89998887713');