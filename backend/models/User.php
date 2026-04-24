<?php
require_once __DIR__ . '/../config/database.php';

class User {
    static function findByEmail(string $email): ?array {
        $stmt = getDB()->prepare('SELECT * FROM users WHERE email = ? LIMIT 1');
        $stmt->execute([$email]);
        return $stmt->fetch() ?: null;
    }

    static function findById(int $id): ?array {
        $stmt = getDB()->prepare('SELECT id, name, email, avatar_url, created_at FROM users WHERE id = ? LIMIT 1');
        $stmt->execute([$id]);
        return $stmt->fetch() ?: null;
    }

    static function create(string $name, string $email, string $password): array {
        $hash = password_hash($password, PASSWORD_BCRYPT);
        $stmt = getDB()->prepare('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)');
        $stmt->execute([$name, $email, $hash]);
        $id = (int) getDB()->lastInsertId();
        return ['id' => $id, 'name' => $name, 'email' => $email];
    }

    static function verifyPassword(string $password, string $hash): bool {
        return password_verify($password, $hash);
    }
}
