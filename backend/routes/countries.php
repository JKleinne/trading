<?php
session_start();
$app = $_SESSION["app"];

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once './models/Country.php';

$app->get('/countries/getCountries', function (Request $request, Response $response, array $args) {
    $country = new Country();
    $countries = $country->getCountries();

    $jsonobj = json_encode($countries);

    $response->getBody()->write($jsonobj);
    return $response;
});