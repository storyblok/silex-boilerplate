<?php

define('WEBAPP_DIR', realpath(__DIR__ . '/'));
define('ROOT_DIR', realpath(__DIR__ . '/../'));
define('PUBLIC_DIR', realpath(__DIR__ . '/../public/'));

require_once __DIR__ . '/vendor/autoload.php';

$app = new Silex\Application();

$app['debug']                   = true;
$app['config.twig.cache']       = false;

$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => WEBAPP_DIR . '/views',
    'twig.options' => array(
        'strict_variables' => false,
        'cache' => $app['config.twig.cache']
    )
));

$app->register(new Silex\Provider\UrlGeneratorServiceProvider());
$app->register(new App\Helpers\Twig());


// Get heroku postgres connection if exists
if (getenv('DATABASE_URL')) {
    $databaseParts = parse_url(getenv('DATABASE_URL'));
    $databasePdo = sprintf('pgsql:host=%s;dbname=%s', $databaseParts['host'], substr($databaseParts['path'], 1));
    $createTable = isset($_GET['_init']) ? true : false;

    $app->register(new App\Providers\Storyblok(), array(
        'storyblok.options' => array(
            'privateToken' => '###insert-private-token###',
            'cacheProvider' => 'postgres',
            'cacheOptions' => array(
                'pdo' => new \PDO($databasePdo, $databaseParts['user'], $databaseParts['pass']),
                'db_table' => 'storyblok',
                'preflight' => $createTable
            )
        )
    ));
} else {
    $app->register(new App\Providers\Storyblok(), array(
        'storyblok.options' => array(
            'privateToken' => '###insert-private-token###',
            'cacheProvider' => 'filesystem',
            'cacheOptions' => array('path' => __DIR__ . '/../cache/')
        )
    ));
}

$app->boot();