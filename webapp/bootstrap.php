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
$app->register(new App\Providers\Storyblok(), array(
    'storyblok.options' => array(
        'privateToken' => 'Lm42nyfqOZFr4DWV0Z9bIAtt',
        'spaceId' => '39821',
        'cacheProvider' => 'filesystem',
        'cacheFolder' => __DIR__ . '/../cache/'
    )
));

$app->boot();