-- Synco — esquema de base de datos
-- Ejecutar una vez: mysql -u root -p < backend/schema.sql

CREATE DATABASE IF NOT EXISTS synco
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE synco;

-- ─── USERS ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            INT UNSIGNED     AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(100)     NOT NULL,
  email         VARCHAR(191)     NOT NULL UNIQUE,
  password_hash VARCHAR(255)     NOT NULL,
  avatar_url    VARCHAR(512)     DEFAULT NULL,
  created_at    DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── CONCERTS ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS concerts (
  id           INT UNSIGNED  AUTO_INCREMENT PRIMARY KEY,
  title        VARCHAR(200)  NOT NULL,
  artist       VARCHAR(200)  NOT NULL,
  venue        VARCHAR(200)  NOT NULL,
  city         VARCHAR(100)  NOT NULL,
  community    VARCHAR(100)  NOT NULL,
  concert_date DATE          NOT NULL,
  image_url    VARCHAR(512)  DEFAULT NULL,
  created_at   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── GROUPS ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `groups` (
  id          INT UNSIGNED  AUTO_INCREMENT PRIMARY KEY,
  concert_id  INT UNSIGNED  NOT NULL,
  name        VARCHAR(150)  NOT NULL,
  description TEXT          DEFAULT NULL,
  max_members TINYINT       NOT NULL DEFAULT 10,
  created_by  INT UNSIGNED  NOT NULL,
  created_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (concert_id) REFERENCES concerts(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id)    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── GROUP MEMBERS ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS group_members (
  id        INT UNSIGNED  AUTO_INCREMENT PRIMARY KEY,
  group_id  INT UNSIGNED  NOT NULL,
  user_id   INT UNSIGNED  NOT NULL,
  joined_at DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_group_user (group_id, user_id),
  FOREIGN KEY (group_id) REFERENCES `groups`(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id)  REFERENCES users(id)    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── MESSAGES ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS messages (
  id         INT UNSIGNED  AUTO_INCREMENT PRIMARY KEY,
  group_id   INT UNSIGNED  NOT NULL,
  user_id    INT UNSIGNED  NOT NULL,
  content    TEXT          NOT NULL,
  created_at DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (group_id) REFERENCES `groups`(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id)  REFERENCES users(id)    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── DATOS DE PRUEBA ─────────────────────────────────────────────────────────
INSERT IGNORE INTO concerts (title, artist, venue, city, community, concert_date) VALUES
  ('Mad Cool 2025',        'Massive Attack',  'Estadio Cívitas Metropolitano', 'Madrid',     'Comunidad de Madrid',   '2025-07-10'),
  ('Primavera Sound 2025', 'Rosalía',         'Parc del Fòrum',                'Barcelona',  'Cataluña',              '2025-06-05'),
  ('BBK Live 2025',        'The Cure',        'Kobetamendi',                   'Bilbao',     'País Vasco',            '2025-07-11'),
  ('FIB 2025',             'Arctic Monkeys',  'Recinto del FIB',               'Benicàssim', 'Comunidad Valenciana',  '2025-07-17'),
  ('SOS 4.8',              'Jungle',          'Recinto Ferial de Murcia',      'Murcia',     'Murcia',                '2025-05-02'),
  ('Cala Mijas 2025',      'Bicep',           'Playa de Calahonda',            'Mijas',      'Andalucía',             '2025-10-03');
