<?php

ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(E_ALL);

$filename = $_SERVER["DOCUMENT_ROOT"] . preg_replace('#(\?.*)$#', '', $_SERVER['REQUEST_URI']);
if (php_sapi_name() === 'cli-server' && file_exists($filename) && is_file($filename)) {
    return false;
}

date_default_timezone_set('UTC');

require_once __DIR__ . '/../webapp/bootstrap.php';
require_once __DIR__ . '/../webapp/app.php';
