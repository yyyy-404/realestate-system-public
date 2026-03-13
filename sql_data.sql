CREATE DATABASE IF NOT EXISTS realestate;

USE realestate;

CREATE TABLE users(
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(50) UNIQUE,
password VARCHAR(255),
role VARCHAR(20)
);

CREATE TABLE properties(
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(200),
price FLOAT,
area FLOAT,
address VARCHAR(200),
owner_id INT
);

CREATE TABLE favorites(
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT,
property_id INT
);

CREATE TABLE contracts(
id INT AUTO_INCREMENT PRIMARY KEY,
property_id INT,
buyer_id INT,
seller_id INT,
price FLOAT,
created_at DATETIME
);

CREATE TABLE property_images(
id INT AUTO_INCREMENT PRIMARY KEY,
property_id INT,
image_url VARCHAR(255)
);