<?php
require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed']);
    exit;
}

$stmt = getDB()->query(
    'SELECT id, title, artist, venue, city, community, concert_date, image_url
     FROM concerts
     ORDER BY concert_date ASC'
);

echo json_encode($stmt->fetchAll());
