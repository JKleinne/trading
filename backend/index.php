<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require './vendor/autoload.php';

$app = new \Slim\App;

$_SESSION['app'] = $app;

// Require all route handlers here
require_once "./routes/users.php";

$app->run();
