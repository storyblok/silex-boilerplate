<?php

namespace App\Controllers;

use Silex\Application;
use Silex\ControllerProviderInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\Request;

class Web implements ControllerProviderInterface {

    public function connect(Application $app) {
        $controllers = $app['controllers_factory'];

        $controllers->get('/{slug}', function (Request $request, $slug) use ($app) {
            $data = [];

            try {
                // How to use WITHOUT the silex provider:
                //  
                // $client = new \Storyblok\Client('###insert-private-token###');
                // $client->setSpace('###insert-space-id###');
                // $client->setCache('filesytem', $app['config.cacheFolder']);
                // $client->getStoryBySlug($app['config.locale'] . '/' . $slug);
                // $data = $client->getStoryContent();

                // Easily retreive a story by using the silex provider
                $app['storyblok']->getStoryBySlug($app['config.locale'] . '/' . $slug);
                $data = $app['storyblok']->getStoryContent();
                
            } catch (\Exception $e) {
                $app->abort(404, "Story $slug does not exist.");
            }

            return $app['twig']->render('components/root.twig', $data);
        })->assert('_locale', '^(de|en)?$')->assert('slug', '.*');

        return $controllers;
    }

}

