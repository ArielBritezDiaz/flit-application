/* Creation DB */
CREATE DATABASE flit;

/* Select DB */
USE flit;

/* Creation tables */
CREATE TABLE User(
    id_user INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    passw VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255) NOT NULL
);

CREATE TABLE Category(
    id_category INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    icon VARCHAR(255),
    description VARCHAR(255)
);

CREATE TABLE MoneyRegistry(
    id_moneyregistry INT NOT NULL AUTO_INCREMENT,
    total_amount DECIMAL(19, 4) NOT NULL,
    entered_amount DECIMAL(19, 4) NOT NULL,
    gain_expense VARCHAR(255) NOT NULL,
    note VARCHAR(50),
    date DATETIME NOT NULL
);

CREATE TABLE Category_MoneyRegistry(
    id_category_moneyregistry INT NOT NULL  AUTO_INCREMENT,
    id_category INT,
    id_moneyregistry INT,
    FOREIGN KEY (id_category) REFERENCES Category(id_category),
    FOREIGN KEY (id_moneyregistry) REFERENCES MoneyRegistry(id_moneyregistry)
);

/* Insert data */