<?php

namespace App\Providers;

use Silex\Application;
use Silex\ServiceProviderInterface;

/**
 * Symfony Storyblok Provider.
 *
 */
class Storyblok implements ServiceProviderInterface
{
    /**
     * {@inheritdoc}
     *
     * This method registers a storyblok service
     *
     * @param Application $app
     */
    public function register(Application $app)
    {
        $app['storyblok'] = $app->share(function () use ($app) {
            $options = $app['storyblok.options'];
            $client = new \Storyblok\Client($options['privateToken']);
            $client->setSpace($options['spaceId']);

            if ($options['cacheProvider']) {
                $client->setCache($options['cacheProvider'], $options['cacheFolder']);
            }

            return $client;
        });
    }

    /**
     * {@inheritdoc}
     *
     * This provider does not execute any code when booting.
     *
     * @param Application $app
     */
    public function boot(Application $app)
    {
    }
}