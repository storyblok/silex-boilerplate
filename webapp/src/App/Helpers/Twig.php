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
        
        $app['twig']->addFunction(new \Twig_SimpleFunction('getDatasourceEntries', function ($slug) use ($app) {
            try {
                return $app['storyblok']->getDatasourceEntries($slug)->getAsNameValueArray();
            } catch (\Exception $e) {
                throw new Exception($e);
            }
            return null;
        }));
        
        $app['twig']->addFilter(new \Twig_SimpleFilter('url', function ($link) use ($app) {
             if(!isset($app['storyblok.links'])) {
                $app['storyblok.links'] = $app['storyblok']->getLinks()->getBody()['links'];
             }
             if(isset($app['storyblok.links'][$link['id']])) {
                 return '/'. $app['storyblok.links'][$link['id']]['slug'];
             }
        }));
        
        $app['twig']->addFunction(new \Twig_SimpleFunction('getStories', function ($starts_with, $sort_by = null, $with_tag = null, $page = 0, $per_page = 25) use ($app) {
            try {

                $app['storyblok']->getStories(
                    array_filter(
                        array(
                        'starts_with' => $starts_with,
                        'with_tag' => $with_tag,
                        'sort_by' => $sort_by,
                        'per_page' => $per_page,
                        'page' => $page
                        )
                    )
                );

                $data = $app['storyblok']->getStoryContent();

                return $data['stories'];
            } catch (\Exception $e) {
                throw new Exception($e);
            }
            return null;
        }));
    }

    public function boot(Application $app)
    {

    }
}
