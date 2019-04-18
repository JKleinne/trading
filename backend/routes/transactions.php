<?php

session_start();
$app = $_SESSION["app"];

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once './models/Currency.php';
require_once './models/Transaction.php';

$app->post('/transactions/buy', function (Request $request, Response $response, array $args) {
    $data = $request->getParsedBody();



    $response->getBody()->write('');
    return $response;
});