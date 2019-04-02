<?php
session_start();
$app = $_SESSION["app"];

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once './models/User.php';

$app->get('/posts', function (Request $request, Response $response, array $args) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://jsonplaceholder.typicode.com/posts');

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

    $data = curl_exec($ch);

    curl_close($ch);
    $response->getBody()->write($data);

    return $response
        ->withHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
});

$app->post('/users/signup', function (Request $request, Response $response, array $args) {
    $data = $request->getParsedBody();

    $email = $data["email"];
    $fullName = $data["fullName"];
    $password = $data["password"];

    $user = new User($email, $password);
    $user->addUser($email, $password);

    $response->getBody()->write($email);
    /*
     * Add to Database here
     */

    return $response;
});