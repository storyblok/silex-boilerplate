<?php

namespace App\Controllers;

use Silex\Application;
use Silex\ControllerProviderInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\Request;

class Web implements ControllerProviderInterface {

    public function connect(Application $app) {
        $controllers = $app['controllers_factory'];

        $controllers->get('/', function (Request $request, $slug) use ($app) {
            $data = [];

            try {
                // if home should be available on / it shouldn't be on /{{home_slug}}
                // except we are in storyblok or the redirect parameter is present.
                if ( !$app['config.redirect_home'] && $app['config.home'] == $slug && !$request->query->get('redirect') && !$request->query->get('_storyblok') ) {
                    $app->abort(404, "Story $slug does not exist.");
                }

                $app['storyblok']->getStoryBySlug($slug);
                $data = $app['storyblok']->getStoryContent();

            } catch (\Exception $e) {
                $app->abort(404, "Story $slug does not exist.");
            }

            return $app['twig']->render('components/root.twig', $data);
        })->assert('slug', '.*');

        return $controllers;
    }

}

