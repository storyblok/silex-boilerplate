<?php

$app['debug']                   = true;
$app['config.twig.cache']       = false;
$app['config.show_help']        = true;
$app['config.redirect_home']    = true;

$app['config.version']           = @file_get_contents(PUBLIC_DIR . '/version.cache'); // initializes with git hash

$app['config.home']             = 'home';
$app['storyblok.privateToken']  = 'Iw3XKcJb6MwkdZEwoQ9BCQtt';