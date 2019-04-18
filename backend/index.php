<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require './vendor/autoload.php';
require_once './models/Model.php';

$app = new \Slim\App;

$_SESSION['app'] = $app;

// Require all route handlers here
require_once "./routes/users.php";
require_once "./routes/countries.php";
require_once "./routes/currencies.php";
require_once './routes/transactions.php';

$app->run();
