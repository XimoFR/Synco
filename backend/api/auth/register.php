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

$name     = trim($body['name']     ?? '');
$email    = trim($body['email']    ?? '');
$password = trim($body['password'] ?? '');

if (!$name || !$email || !$password) {
    http_response_code(422);
    echo json_encode(['message' => 'Nombre, email y contraseña son obligatorios']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['message' => 'Email no válido']);
    exit;
}

if (strlen($password) < 6) {
    http_response_code(422);
    echo json_encode(['message' => 'La contraseña debe tener al menos 6 caracteres']);
    exit;
}

if (User::findByEmail($email)) {
    http_response_code(409);
    echo json_encode(['message' => 'Ya existe una cuenta con ese email']);
    exit;
}

$user = User::create($name, $email, $password);

$token = jwtGenerate([
    'sub'   => $user['id'],
    'name'  => $user['name'],
    'email' => $user['email'],
    'iat'   => time(),
    'exp'   => time() + JWT_TTL,
]);

http_response_code(201);
echo json_encode([
    'token' => $token,
    'user'  => [
        'id'    => $user['id'],
        'name'  => $user['name'],
        'email' => $user['email'],
    ],
]);
