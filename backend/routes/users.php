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
    $stuff = $user->addUser($email, $password, '0', '0', '0');


    $user_id = $user->getUser($email)["user_id"];
    $firstName = $data["firstName"];
    $lastName = $data["lastName"];
    $country = $data["country"];
    $currency = $data["currency"];

    $profile = new Profile();
    $profile->addProfile($user_id, $firstName, $lastName, $country, $currency);


    $response->getBody()->write($stuff);
    /*
     * Add to Database here
     */

    return $response;
});

$app->post('/users/login', function (Request $request, Response $response, array $args) {
    $data = $request->getParsedBody();

    $email = $data["email"];
    $password = $data["password"];

    $user = new User();

    $user_email = $user->getUser($email)["email"];
    $user_password = $user->getUser($email)["password"];

    if(password_verify($password, $user_password))
        $response->getBody()->write($user->getUser($email)["user_id"]);
    else
        $response->withStatus(400);

    return $response;
});

$app->get('/users/getUser/{user_id}', function (Request $request, Response $response, array $args) {
    $user = new User();
    $profile = new Profile();

    $stuff = $profile->getProfile($args['user_id']);

    $jsonobj = json_encode($stuff);

    $response->getBody()->write($jsonobj);

    return $response;
});

$app->post('/users/updateProfile/{user_id}', function (Request $request, Response $response, array $args) {
    $data = $request->getParsedBody();
    $profile = new Profile();

   $profile->modifyProfile($args['user_id'], $data["fname"], $data["lname"], $data["country_id"]);

    $jsonobj = json_encode($data);

    $response->getBody()->write($jsonobj);

    return $response;
});