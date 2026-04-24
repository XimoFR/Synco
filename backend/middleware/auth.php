<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/jwt.php';

function requireAuth(): array {
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? '';

    if (!str_starts_with($header, 'Bearer ')) {
        http_response_code(401);
        echo json_encode(['message' => 'No autenticado']);
        exit;
    }

    $token   = substr($header, 7);
    $payload = jwtVerify($token);

    if (!$payload) {
        http_response_code(401);
        echo json_encode(['message' => 'Token inválido o expirado']);
        exit;
    }

    return $payload;
}
