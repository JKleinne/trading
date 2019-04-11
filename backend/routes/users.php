<?php
session_start();
$app = $_SESSION["app"];

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once './models/User.php';
require_once './models/Profile.php';

$app->get('/posts', function (Request $request, Response $response, array $args) {
    $user = new User("stuff", "stuff", "", "", "");

    $stuff = $user->getUser("qwe")["user_id"];

    $jsonobj = json_encode($stuff);

    $response->getBody()->write($jsonobj);

    return $response;
});

$app->post('/users/signup', function (Request $request, Response $response, array $args) {
    $data = $request->getParsedBody();

    $email = $data["email"];
    $password = $data["password"];

    $user = new User();
    $user->addUser($email, $password, '0', '0', '0');


    $user_id = $user->getUser($email)["user_id"];
    $firstName = $data["firstName"];
    $lastName = $data["lastName"];
    $country = $data["country"];
    $currency = $data["currency"];

    $profile = new Profile();
    $profile->addProfile($user_id, $firstName, $lastName, $country, $currency);


    $response->getBody()->write('Email: ' . $email . 'Country: ' . $country);
    /*
     * Add to Database here
     */

    return $response;
});