DROP DATABASE IF EXISTS hair_project;
CREATE DATABASE hair_project CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE hair_project;

DROP USER if EXISTS dev_Admin@localhost;
CREATE USER dev_Admin@localhost IDENTIFIED BY 'administrator';
GRANT ALL PRIVILEGES ON * . * TO dev_Admin@localhost;
GRANT USAGE ON * . * TO dev_Admin@localhost;

FLUSH PRIVILEGES;

DROP TABLE if EXISTS users;
create table if not exists users(
id BIGINT NOT NULL AUTO_INCREMENT,
user_name VARCHAR(32) NOT NULL,
user_password VARCHAR(512) NOT NULL,
date_created DATETIME DEFAULT NOW(),
date_modified DATETIME DEFAULT NULL ON UPDATE NOW(),
PRIMARY KEY(id)
);

DROP TABLE if EXISTS categories;
create table if not exists categories(
id BIGINT NOT NULL AUTO_INCREMENT,
category VARCHAR(64) NOT NULL DEFAULT '**ERROR: MISSING category **',
date_created DATETIME DEFAULT NOW(),
date_modified DATETIME DEFAULT NULL ON UPDATE NOW(),
PRIMARY KEY(id)
);

DROP TABLE if EXISTS colours;
create table if not exists colours(
id BIGINT NOT NULL AUTO_INCREMENT,
colour VARCHAR(64) NOT NULL DEFAULT '**ERROR: MISSING category **',
colour_hash VARCHAR(64) NOT NULL,
date_created DATETIME DEFAULT NOW(),
date_modified DATETIME DEFAULT NULL ON UPDATE NOW(),
PRIMARY KEY(id)
);

DROP TABLE if EXISTS style_links;
create table if not exists style_links(
id BIGINT NOT NULL AUTO_INCREMENT ,
url VARCHAR(255) DEFAULT '**ERROR: NO URL GIVEN**',
title VARCHAR(128) DEFAULT '**ERROR: NO TITLE GIVEN**',
date_created DATETIME DEFAULT NOW(),
date_modified DATETIME DEFAULT NULL ON UPDATE NOW(),
PRIMARY KEY(id)
);

DROP TABLE if EXISTS link_category;
create table if not exists link_category(
link_id BIGINT NOT NULL,
category_id BIGINT NOT NULL,
date_created DATETIME DEFAULT NOW(),
date_modified DATETIME DEFAULT NULL ON UPDATE NOW(),
PRIMARY KEY(link_id, category_id)
);

INSERT INTO
`users`(`user_name`, `user_password`)
VALUES
('admin', 'Password1');

INSERT INTO
`categories`(`category`)
VALUES
('Long'),
('Short'),
('Medium'),
('Trending');

INSERT INTO
`colours`(`colour`, `colour_hash`)
VALUES
('Ginger', '#d70025'),
('Blond', '#ffd85b'),
('Brunette', '#5c3000'),
('Grey', '#8e8e8e');

INSERT INTO 
`style_links`(`title`, `url`)
VALUES
('long','https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRtZb6OQx6uBkYGrym6BHdxI2uwT88aoj30wzRXLcZNZVZyiFu6'),
('short','https://icon2.cleanpng.com/20180227/jzq/kisspng-hair-capelli-gratis-stylish-short-hair-matting-material-free-5a95ff8c325aa0.5823530115197797242063.jpg')







