

CREATE DATABASE IF NOT EXISTS store_rating;

USE store_rating;



CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(60) NOT NULL,

    email VARCHAR(100) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL,

    address VARCHAR(400) NOT NULL,

    role ENUM('ADMIN','USER','OWNER')
        NOT NULL DEFAULT 'USER',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP
);



CREATE TABLE stores (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(100) NOT NULL UNIQUE,

    address VARCHAR(400) NOT NULL,

    owner_id INT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_store_owner
    FOREIGN KEY (owner_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);



CREATE TABLE ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    store_id INT NOT NULL,

    rating TINYINT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT chk_rating
    CHECK (rating BETWEEN 1 AND 5),

    CONSTRAINT fk_rating_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

    CONSTRAINT fk_rating_store
    FOREIGN KEY (store_id)
    REFERENCES stores(id)
    ON DELETE CASCADE,

    CONSTRAINT unique_user_store
    UNIQUE(user_id, store_id)
);



CREATE INDEX idx_user_email
ON users(email);

CREATE INDEX idx_user_role
ON users(role);

CREATE INDEX idx_store_name
ON stores(name);

CREATE INDEX idx_store_address
ON stores(address);

CREATE INDEX idx_rating_store
ON ratings(store_id);

CREATE INDEX idx_rating_user
ON ratings(user_id);