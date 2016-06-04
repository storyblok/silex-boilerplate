<?php

$app->before(function() use ($app) {
    $app['config.locale'] = $app['request']->attributes->get('_locale');
    $app['globaldata'] = array();
});

$app->get('/', function() use($app) {
    return $app->redirect('welcome');
});

$app->get('/welcome', function() use($app) {
    return $app['twig']->render('components/welcome.twig');
});

$app->mount('/{_locale}', new App\Controllers\Web());

$app->run();
