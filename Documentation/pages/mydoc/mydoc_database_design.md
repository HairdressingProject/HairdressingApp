---
title: Database design
keywords: Admin portal, Database
last_updated: April 7, 2020
tags: [database]
summary: "This document outlines the database design"
sidebar: mydoc_sidebar
permalink: mydoc_database_design.html
folder: mydoc
---

## 1. Design

[Database design diagram](https://dbdiagram.io/d/5e82af534495b02c3b890292)


## 2. Database and user creation

```mysql
CREATE DATABASE IF NOT EXISTS hair_project_db CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

CREATE USER IF NOT EXISTS 'dev_admin'@'localhost' IDENTIFIED BY 'administrator';

GRANT ALL PRIVILEGES ON hair_project_db.* TO 'dev_admin'@'localhost' IDENTIFIED BY 'administrator';

FLUSH PRIVILEGES;
```



## 3. Tables

### 3.1 Users table

{% include image.html file="/DB_design/users_table.png" alt="Users table" caption="Users table" %}

```mysql
CREATE TABLE IF NOT EXISTS hair_project_db.users
(
    `id`            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
    `user_name`     VARCHAR(32) NOT NULL,
    `user_password` VARCHAR(512) NOT NULL,
    `user_email`    VARCHAR(512) NOT NULL,
    `first_name`    VARCHAR(128) NOT NULL DEFAULT 'user',
    `last_name`     VARCHAR(128),
    `user_role`     ENUM('admin', 'developer', 'user') NOT NULL DEFAULT 'user',
    `date_createdt` DATETIME NOT NULL DEFAULT NOW(),
    `date_modified` DATETIME DEFAULT NULL ON UPDATE NOW(),
    INDEX (`id`)
)
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci
ENGINE = INNODB;
```

### 3.2 User Features table

{% include image.html file="/DB_design/user_features_table.png" alt="User features table" caption="User features table" %}

```mysql
CREATE TABLE IF NOT EXISTS hair_project_db.user_features
(
    `id`             BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
    `user_id`        BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `face_shape_id`  BIGINT NOT NULL,
    `skin_tone_id`   BIGINT NOT NULL,
    `hair_style_id`  BIGINT NOT NULL,
    `hair_length_id` BIGINT NOT NULL,
    `hair_colour_id` BIGINT NOT NULL,
    `date_createdt`  DATETIME NOT NULL DEFAULT NOW(),
    `date_modified`  DATETIME DEFAULT NULL ON UPDATE NOW(),
    INDEX (`id`),
    FOREIGN KEY (`user_id`)
        REFERENCES hair_project_db.users (`id`)
        ON DELETE CASCADE
)
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci
ENGINE = INNODB;
```

### 3.3 Face shapes table

{% include image.html file="/DB_design/face_shapes_table.png" alt="Face shapes table" caption="Face shapes table" %}

```mysql
CREATE TABLE IF NOT EXISTS hair_project_db.face_shapes
(
    `id`            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
    `shape_name`    VARCHAR(128) NOT NULL DEFAULT '** ERROR: missing category **',
    `date_createdt` DATETIME NOT NULL DEFAULT NOW(),
    `date_modified` DATETIME DEFAULT NULL ON UPDATE NOW(),
    INDEX (`id`)
)
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci
ENGINE = INNODB;
```

### 3.4 Face shape links table

{% include image.html file="/DB_design/face_shape_links_table.png" alt="Face shape links table" caption="Face shape links table" %}

```mysql
CREATE TABLE IF NOT EXISTS hair_project_db.face_shape_links
(
    `id`            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
    `face_shape_id` BIGINT UNSIGNED NOT NULL,
    `link_name`     VARCHAR(128) NOT NULL DEFAULT '** ERROR: missing category **',
    `link_url`      VARCHAR(512) NOT NULL DEFAULT '** ERROR: missing category **',
    `date_createdt` DATETIME NOT NULL DEFAULT NOW(),
    `date_modified` DATETIME DEFAULT NULL ON UPDATE NOW(),
    INDEX(`id`),
    FOREIGN KEY (`face_shape_id`)
        REFERENCES hair_project_db.face_shapes (`id`)
        ON DELETE CASCADE
)
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci
ENGINE = INNODB;
```

### 3.5 Hair styles table

{% include image.html file="/DB_design/hair_styles_table.png" alt="Hair styles table" caption="Hair styles table" %}

```mysql
CREATE TABLE IF NOT EXISTS hair_project_db.hair_styles
(
    `id`              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
    `hair_style_name` VARCHAR(128) NOT NULL DEFAULT '** ERROR: missing category **',
    `date_createdt`   DATETIME NOT NULL DEFAULT NOW(),
    `date_modified`   DATETIME DEFAULT NULL ON UPDATE NOW(),
    INDEX (`id`)
)
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci
ENGINE = INNODB;
```

### 3.6 Hair style links table

{% include image.html file="/DB_design/hair_style_links_table.png" alt="Hair style links table" caption="Hair style links table" %}

```mysql
CREATE TABLE IF NOT EXISTS hair_project_db.hair_style_links
(
    `id`            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
    `hair_style_id` BIGINT UNSIGNED NOT NULL,
    `link_name`     VARCHAR(128) NOT NULL DEFAULT '** ERROR: missing category **',
    `link_url`      VARCHAR(512) NOT NULL DEFAULT '** ERROR: missing category **',
    `date_createdt` DATETIME NOT NULL DEFAULT NOW(),
    `date_modified` DATETIME DEFAULT NULL ON UPDATE NOW(),
    INDEX(`id`),
    FOREIGN KEY (`hair_style_id`)
        REFERENCES hair_project_db.hair_styles (`id`)
        ON DELETE CASCADE
)
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci
ENGINE = INNODB;
```

### 3.7 Hair lengths table

{% include image.html file="/DB_design/hair_lengths_table.png" alt="Hair lengths table" caption="Hair lengths table" %}

```mysql
CREATE TABLE IF NOT EXISTS hair_project_db.hair_lengths
(
    `id`               BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
    `hair_length_name` VARCHAR(128) NOT NULL DEFAULT '** ERROR: missing category **',
    `date_createdt`    DATETIME NOT NULL DEFAULT NOW(),
    `date_modified`    DATETIME DEFAULT NULL ON UPDATE NOW(),
    INDEX (`id`)
)
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci
ENGINE = INNODB;
```

### 3.8 Hair length links table

{% include image.html file="/DB_design/hair_length_links_table.png" alt="Hair length links table" caption="Hair length links table" %}

```mysql
CREATE TABLE IF NOT EXISTS hair_project_db.hair_length_links
(
    `id`             BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
    `hair_length_id` BIGINT UNSIGNED NOT NULL,
    `link_name`      VARCHAR(128) NOT NULL DEFAULT '** ERROR: missing category **',
    `link_url`       VARCHAR(512) NOT NULL DEFAULT '** ERROR: missing category **',
    `date_createdt`  DATETIME NOT NULL DEFAULT NOW(),
    `date_modified`  DATETIME DEFAULT NULL ON UPDATE NOW(),
    INDEX(`id`),
    FOREIGN KEY (`hair_length_id`)
        REFERENCES hair_project_db.hair_lengths (`id`)
        ON DELETE CASCADE
)
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci
ENGINE = INNODB;
```

### 3.9 Skin tones table

{% include image.html file="/DB_design/skin_tones_table.png" alt="Skin tones table" caption="Skin tones table" %}

```mysql
CREATE TABLE IF NOT EXISTS hair_project_db.skin_tones
(
    `id`             BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
    `skin_tone_name` VARCHAR(128) NOT NULL DEFAULT '** ERROR: missing category **',
    `date_createdt`  DATETIME NOT NULL DEFAULT NOW(),
    `date_modified`  DATETIME DEFAULT NULL ON UPDATE NOW(),
    INDEX (`id`)
)
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci
ENGINE = INNODB;
```

### 3.10 Skin tone links table

{% include image.html file="/DB_design/skin_tone_links_table.png" alt="Skin tone links table" caption="Skin tone links table" %}

```mysql
CREATE TABLE IF NOT EXISTS hair_project_db.skis_tone_links
(
    `id`            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
    `skin_tone_id`  BIGINT UNSIGNED NOT NULL,
    `link_name`     VARCHAR(128) NOT NULL DEFAULT '** ERROR: missing category **',
    `link_url`      VARCHAR(512) NOT NULL DEFAULT '** ERROR: missing category **',
    `date_createdt` DATETIME NOT NULL DEFAULT NOW(),
    `date_modified` DATETIME DEFAULT NULL ON UPDATE NOW(),
    INDEX(`id`),
    FOREIGN KEY (`skin_tone_id`)
        REFERENCES hair_project_db.skin_tones (`id`)
        ON DELETE CASCADE
)
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci
ENGINE = INNODB;
```

### 3.11 Colours table

{% include image.html file="/DB_design/colours_table.png" alt="Colours table" caption="Colours table" %}

```mysql
CREATE TABLE IF NOT EXISTS hair_project_db.colours
(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
    `colour_name`   VARCHAR(64) NOT NULL DEFAULT '** ERROR: missing category **',
    `colour_hash`   VARCHAR(64) NOT NULL DEFAULT '** ERROR: missing category **',
    `date_createdt` DATETIME NOT NULL DEFAULT NOW(),
    `date_modified` DATETIME DEFAULT NULL ON UPDATE NOW(),
    INDEX(`id`)
)
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci
ENGINE = INNODB;
```