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

$app->get('/clear_cache', function() use($app) {
	$app['storyblok']->deleteCacheBySlug($app['request']->get('slug'));

	if ($app['request']->get('action') == 'published') {
		// Fill the cache immediatly after publishing the story
		$app['storyblok']->getStoryBySlug($app['request']->get('slug'));
	}

    return $app->json(array('success' => true));
});

$app->mount('/{_locale}', new App\Controllers\Web());

$app->run();
