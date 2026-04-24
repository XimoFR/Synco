<?php
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/jwt.php';
require_once __DIR__ . '/../../models/User.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed']);
    exit;
}

$body = json_decode(file_get_contents('php://input'), true);

$email    = trim($body['email']    ?? '');
$password = trim($body['password'] ?? '');

if (!$email || !$password) {
    http_response_code(422);
    echo json_encode(['message' => 'Email y contraseña son obligatorios']);
    exit;
}

$user = User::findByEmail($email);

if (!$user || !User::verifyPassword($password, $user['password_hash'])) {
    http_response_code(401);
    echo json_encode(['message' => 'Credenciales incorrectas']);
    exit;
}

$token = jwtGenerate([
    'sub'   => $user['id'],
    'name'  => $user['name'],
    'email' => $user['email'],
    'iat'   => time(),
    'exp'   => time() + JWT_TTL,
]);

echo json_encode([
    'token' => $token,
    'user'  => [
        'id'    => $user['id'],
        'name'  => $user['name'],
        'email' => $user['email'],
    ],
]);
