<?php

$app->before(function() use ($app) {
    $app['globaldata'] = array();
});

if($app['config.show_help']) {
	$app->error(function (\Exception $e, $code) use ($app) {
		if($code == '404') {
			return file_get_contents('https://github.com/storyblok/silex-boilerplate/blob/master/SETUP.md');
		}
	});
}

$app->get('/', function() use($app) {
    return $app->redirect($app['config.home']);
});

$app->get('/clear_cache', function() use($app) {
	$app['storyblok']->deleteCacheBySlug($app['request']->get('slug'));

	if ($app['request']->get('action') == 'published') {
		// Fill the cache immediatly after publishing the story
		$app['storyblok']->getStoryBySlug($app['request']->get('slug'));
	}

    return $app->json(array('success' => true));
});

$app->mount('/{slug}', new App\Controllers\Web());

$app->run();
