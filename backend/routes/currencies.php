<?php

session_start();
$app = $_SESSION["app"];

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once './models/Currency.php';

$app->get('/currencies/getFiatCurrencies', function (Request $request, Response $response, array $args) {
    $fiatCurrency = new Currency();
    $fiatCurrencies = $fiatCurrency->getFiatCurrencies();

    $jsonobj = json_encode($fiatCurrencies);

    $response->getBody()->write($jsonobj);
    return $response;
});

$app->get('/currencies/getCryptoCurrencies', function (Request $request, Response $response, array $args) {
    $cryptoCurrencies = new Currency();
    $cryptoCurrencies = $cryptoCurrencies->getCryptoCurrencies();

    $jsonobj = json_encode($cryptoCurrencies);

    $response->getBody()->write($jsonobj);
    return $response;
});