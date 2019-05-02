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
    $stuff = $user->addUser($email, $password, '', 'user', 'active');


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

$app->get('/users/2fa/{user_id}', function (Request $request, Response $response, array $args) {
    $user = $args['user_id'];
    $g    = new \Google\Authenticator\GoogleAuthenticator();
    $userModel = new User();

    //Check if user has 2fa already set up
    if($userModel->get2FA($user)['two_fa'] == 0) {

        // invent a secret for this user
        $secret = $g->generateSecret();

        $data = sprintf("otpauth://totp/%s%%3A%s%%3Fsecret%%3D%s", $_SERVER['HTTP_HOST'], $user, $secret);
        $qrCodeUrl = "https://chart.googleapis.com/chart?chs=200x200&chld=M|0&cht=qr&chl=" . $data;

        $response->getBody()->write($secret . '***' . $qrCodeUrl);
    }
    else
        $response->withStatus(400);

    return $response;
});

$app->post('/users/2fa', function (Request $request, Response $response, array $args) {
    $data = $request->getParsedBody();
    $secret = $data['secret'];
    $code   = $data['code'];
    $user = new User();
    $g = new \Google\Authenticator\GoogleAuthenticator();
    if ($g->checkCode($secret, $code) == true) {
        // code is valid - store into user record
        $user->setup2FA($data['userId'], $secret);

        $response->getBody()->write('Success');
    }
    else
        $response->getBody()->write('Fail');

    return $response;
});

$app->get('/users/has2FA/{user_id}', function (Request $request, Response $response, array $args) {
    $userId = $args['user_id'];
    $user = new User();

    if($user->get2FA($userId)['two_fa'] == "")
        $response->getBody()->write('false');
    else
        $response->getBody()->write('true');

    return $response;
});

$app->get('/users/get2FA/{user_id}', function (Request $request, Response $response, array $args) {
    $userId = $args['user_id'];
    $user = new User();

    $response->getBody()->write($user->get2FA($userId)['two_fa']);

    return $response;
});

$app->post('/users/verify2FA', function (Request $request, Response $response, array $args) {
    $data = $request->getParsedBody();
    $secret = $data['secret'];
    $code   = $data['code'];

    $g = new \Google\Authenticator\GoogleAuthenticator();
    if ($g->checkCode($secret, $code) == true) {
        $response->getBody()->write('Success');
    }
    else
        $response->getBody()->write('Fail');

    return $response;
});

$app->get('/users/getRole/{user_id}', function (Request $request, Response $response, array $args) {
    $userId = $args['user_id'];
    $user = new User();

    $response->getBody()->write($user->getRole($userId)["role"]);

    return $response;
});

$app->get('/users/getUserList', function (Request $request, Response $response, array $args) {
    $user = new User();
    $users = $user->getAllUsers();

    $jsonobj = json_encode($users);

    $response->getBody()->write($jsonobj);
    return $response;
});

$app->get('/users/getStatus/{user_id}', function (Request $request, Response $response, array $args) {
    $userId = $args['user_id'];
    $user = new User();

    $response->getBody()->write($user->getStatus($userId)["status"]);

    return $response;
});

$app->post('/users/setStatus', function (Request $request, Response $response, array $args) {
    $data = $request->getParsedBody();
    $userId = $data['userId'];
    $status = $data['status'];
    $user = new User();

    $user->setStatus($userId, $status);

    return $response;
});

$app->get('/users/disable2FA/{userId}', function (Request $request, Response $response, array $args) {
    $userId = $args['userId'];
    $user = new User();

    $user->disable2FA($userId);

    return $response;
});