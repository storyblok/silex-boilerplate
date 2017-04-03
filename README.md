<p align="center">
  <h1 align="center">silex-boilerplate for Storyblok</h1>
  <p align="center">A <a href="https://www.storyblok.com" target="_blank">Storyblok</a> boilerplate in php with silex to simply start your website with us.</p>
</p>
<br><br>

## What is a storyblok boilerplate
If you want to use your server or have already an existing project in which you want to integrate Storyblok you can use one of our boilerplates. 

## How can I start with a boilerplate

The most efficient way to start a storyblok project as a developer would be our [Command Line Interface](https://www.storyblok.com/docs/Guides/command-line-interface).

```
npm i storyblok-cli -g
storyblok
```

and choose your boilerplate. You can of course simply `download` or `clone` this repository as well.

```
git clone https://github.com/storyblok/silex-boilerplate
```

## Configuration
In the `webapp/config.php` all you need to change is the `STORYBLOK_CONFIGURATION` - by adding your space information. [What is a Space?](https://www.storyblok.com/docs/terminology/space):

```
$app['config.home']             = 'home'; #change this to your home story slug
$app['storyblok.privateToken']  = 'Iw3XKcJb6MwkdZEwoQ9BCQtt'; #change this to your private key.
```

## Start your local environment

Make sure [Composer](https://getcomposer.org/) and [npm](https://www.npmjs.com/) are installed:

```
## Install PHP dependencies.
composer install

## Install all frontend development related dependencies.
npm install

## This will start up a php server on :4040 and a proxy for browsersync on :4200. 
gulp
```


## Folder structure

- `/app/`
  The place where you should put all your scripts, styles source code - you can also add your images here
  but make sure to add a gulp task which copies that to the `public` folder.
- `/webapp/`
  The php application using silex and our [client library](https://github.com/storyblok/php-client).
- `/webapp/views/`
  All your layouts and components at one space - if you add a new or change an existing [Twig](http://twig.sensiolabs.org/) component (`.twig`)
  the gulp build will trigger an instant reload for you in the browser - also each component is a representation of a storyblok component.
  If you create a headline component in storyblok - make sure to create a `headline.twig` as well - so this application knows which component
  to render.
- `/public/`
  Once you run `gulp` the `app` source files will be prepared (prefixed, minified, uglified, ...) and copied to the `/public/` folder for delivery.
- `/cache/`
  Our [client library](https://github.com/storyblok/php-client) directly adds a file cache (you can change this setting as well) for every storyblok request you do - this folder is the place where we save the cached results. 


## You want to know more about storyblok?

- [Prologue - Introduction](https://www.storyblok.com/docs/Prologue/Introduction)
- [Terminology - Introduction](https://www.storyblok.com/docs/terminology/introduction)
- [Content Delivery API - Introduction](https://www.storyblok.com/docs/Delivery-Api/introduction)

## How to install composer?
```
php -r "readfile('https://getcomposer.org/installer');" | php
sudo mkdir /usr/local/bin/
sudo mv composer.phar /usr/local/bin/composer
```