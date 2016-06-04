<?php

namespace App\Helpers;

use Silex\Application;
use Silex\ServiceProviderInterface;

/**
* Global Twig helpers
*/
class Twig implements ServiceProviderInterface
{
    public function register(Application $app)
    {   
        $app['twig']->addFunction(new \Twig_SimpleFunction('url', function ($path) use ($app) {
            return $path;
        }));

        $app['twig']->addFunction(new \Twig_SimpleFunction('asset', function ($asset) use ($app) {
            return '/' . $asset;
        }));
    }

    public function boot(Application $app)
    {

    }
}