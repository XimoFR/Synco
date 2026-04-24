<?php
// Credenciales XAMPP por defecto — ajusta si las tuyas son distintas
define('DB_HOST',    'localhost');
define('DB_NAME',    'synco');
define('DB_USER',    'root');
define('DB_PASS',    '');
define('DB_CHARSET', 'utf8mb4');

// Clave secreta para firmar los JWT — cámbiala por algo largo y aleatorio
define('JWT_SECRET', 'synco_secret_key_cambiar_en_produccion');

// Duración del token: 7 días
define('JWT_TTL', 60 * 60 * 24 * 7);

function getDB(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = sprintf('mysql:host=%s;dbname=%s;charset=%s', DB_HOST, DB_NAME, DB_CHARSET);
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
    }
    return $pdo;
}
