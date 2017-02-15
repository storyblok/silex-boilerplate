# About

This is a very basic setup using the minimalistic silex framework and twig as rendering engine to help you kickstart your storyblok projects.

## Setup

Be sure to change privateToken in `webapp/config.php`. For a full guide just visit the [SETUP.md](https://github.com/storyblok/silex-boilerplate/blob/master/SETUP.md).

## Installation

```
php -r "readfile('https://getcomposer.org/installer');" | php
sudo mkdir /usr/local/bin/
sudo mv composer.phar /usr/local/bin/composer

composer install

npm install
```

## Run

```
gulp
```

## One Click deploy with heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)