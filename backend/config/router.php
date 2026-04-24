<?php
$uri    = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

$routes = [
    'POST /api/auth/register' => 'api/auth/register.php',
    'POST /api/auth/login'    => 'api/auth/login.php',
    'POST /api/auth/logout'   => 'api/auth/logout.php',
    'GET  /api/concerts'      => 'api/concerts/index.php',
    'GET  /api/groups'        => 'api/groups/index.php',
    'POST /api/groups/join'   => 'api/groups/join.php',
    'GET  /api/messages'      => 'api/messages/index.php',
    'POST /api/messages'      => 'api/messages/index.php',
];

$key = "$method $uri";
if (isset($routes[$key])) {
    require_once __DIR__ . '/../' . $routes[$key];
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Not found']);
}
