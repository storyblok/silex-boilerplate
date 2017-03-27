<?php

namespace App\Helpers;

use Silex\Application;
use Silex\ServiceProviderInterface;
use \Parsedown;

/**
* Global Twig helpers
*/
class Twig implements ServiceProviderInterface
{
    public function register(Application $app)
    {
        /*
        * Allows to use Markdown in your templates
        *
        * Usage: `{{ $my_url | markdown }}`
        */
        $app['twig']->addFilter(new \Twig_SimpleFilter('markdown', function ($text) {
            if (is_string($text)) {
                return Parsedown::instance()
                    ->setMarkupEscaped(false)
                    ->setBreaksEnabled(true)
                    ->text($text);
            }
            return '';
        }));

        /*
        * Appends the version string to an url
        *
        * Usage: `{{ $my_url | version }}`
        */
        $app['twig']->addFilter(new \Twig_SimpleFilter('version', function ($url) use ($app) {
            return addToUrl($url, 'version', $app['config.version']);
        }));

        /*
        * Transforms an `url` object from the storyblok api to an URL.
        *
        * Usage: `{{ $my_url_object | url }}`
        */
        $app['twig']->addFilter(new \Twig_SimpleFilter('url', function ($link) use ($app) {
             if(is_string($link)) {
                return $link;
             }
             if(!isset($app['storyblok.links'])) {
                $app['storyblok.links'] = $app['storyblok']->getLinks()->getBody()['links'];
             }
             if(isset($link['id']) && isset($app['storyblok.links'][$link['id']])) {
                 return '/'. $app['storyblok.links'][$link['id']]['slug'];
             } else {
                 return $link['url'];
             }
        }));

        /*
        * Pretty dump a variable with pre tags.
        *
        * Usage: `{{ $my_variable | dump }}`
        */
        $app['twig']->addFilter(new \Twig_SimpleFilter('dump', function ($variable) use ($app) {
             echo '<pre>';
             var_dump($variable);
             echo '</pre>';
        }));

        /*
        * asset function (beta)
        *
        * Usage: `{{ asset('path') }}`
        */
        $app['twig']->addFunction(new \Twig_SimpleFunction('asset', function ($path) use ($app) {
            return '/' . $path;
        }));

        /*
        * allows you to access the storyblok tags of a folder
        *
        * Usage: `{% set tags = getTags(folder_name) %}`
        */
        $app['twig']->addFunction(new \Twig_SimpleFunction('getTags', function ($starts_with) use ($app) {
            try {
                return $app['storyblok']->getTags(array(
                    'starts_with' => $starts_with
                ))->getTagsAsStringArray();
            } catch (\Exception $e) {
                throw new \Exception($e);
            }
            return array();
        }));

        /*
        * allows you to access a storyblok datasource
        *
        * Usage: `{% set datasources = getDatasourceEntries(folder_name) %}`
        */
        $app['twig']->addFunction(new \Twig_SimpleFunction('getDatasourceEntries', function ($slug) use ($app) {
            try {
                return $app['storyblok']->getDatasourceEntries($slug)->getAsNameValueArray();
            } catch (\Exception $e) {
                throw new Exception($e);
            }
            return null;
        }));

        /*
        * allows you to access a list of stories from storyblok
        *
        * Usage: `{% set stories = getStories('starts_with') %}`
        */
        $app['twig']->addFunction(new \Twig_SimpleFunction('getStories', function ($starts_with, $page = 1, $per_page = 25, $options = array()) use ($app) {
            try {

                $app['storyblok']->getStories(
                    array_filter(
                        array_merge( $options, 
                            array(
                            'starts_with' => $starts_with,
                            'per_page' => $per_page,
                            'page' => $page,
                            )
                        ), function($var) { return !is_null($var); } // removes only NULL
                    )
                );

                $data = $app['storyblok']->getBody();

                return $data['stories'];
            } catch (\Exception $e) {
                throw new Exception($e);
            }
            return null;
        }));

        /*
        * allows you to use a json to configure the getStories options
        *
        * Usage: `{% set stories = getStories('starts_with', 1, 25, options({"sort_by":"name:asc","is_startpage":false})) %}`
        */
        $app['twig']->addFunction(new \Twig_SimpleFunction('options', function ($string) use ($app) {
            return (array) json_decode($string);
        }));

        /*
        * allows you to access a single story by slug
        * 
        * Hint: If you want to get the story from an Storylink just use the `| url` to generate the full slug.
        *
        * Usage: `{% set story = getStoryBySlug('/your/full/slug') %}`
        */
        $app['twig']->addFunction(new \Twig_SimpleFunction('getStoryBySlug', function ($full_slug) use ($app) {
            try {
                $app['storyblok']->getStoryBySlug($full_slug);
                
                $data = $app['storyblok']->getBody();

                return $data['story'];
            } catch (\Exception $e) {
                throw new Exception($e);
            }
            return null;
        }));

        function addToUrl($url, $key, $value = null) {
            $query = parse_url($url, PHP_URL_QUERY);
            if ($query) {
                parse_str($query, $queryParams);
                $queryParams[$key] = $value;
                $url = str_replace("?$query", '?' . http_build_query($queryParams), $url);
            } else {
                $url .= '?' . urlencode($key) . '=' . urlencode($value);
            }
            return $url;
        }
    }

    public function boot(Application $app)
    {

    }
}
