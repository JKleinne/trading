<?php

session_start();
$app = $_SESSION["app"];

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once './models/Currency.php';
require_once './models/Transaction.php';
require_once './models/Wallet.php';

/* Payload example to be passed to /transactions/buy or /transactions/sell
 * {
  "ticker": "BTC",
  "pay_amount": "520",
  "buy_amount": 0.071932,
  "fee": 26,
  "total": 546,
  "userId": "62"
}
 */

$app->get('/transactions/getUserWallets/{user_id}', function (Request $request, Response $response, array $args) {
    $wallet = new Wallet();
    $wallets = $wallet->getAllUserWallets($args['user_id']);

    $jsonobj = json_encode($wallets);

    $response->getBody()->write($jsonobj);
    return $response;
});

$app->post('/transactions/buy', function (Request $request, Response $response, array $args) {
    $data = $request->getParsedBody();

    $transaction = new Transaction();
    $wallet = new Wallet();

    // Get wallet matching the payload ticker
    $pay_wallet_id = $wallet->getWalletByUserIdAndTicker($data["userId"], "CAD")["wallet_id"];
    $buy_wallet_id = $wallet->getWalletByUserIdAndTicker($data["userId"], $data["ticker"])["wallet_id"];

    $transaction->createTransaction(
        $data["userId"],
        $pay_wallet_id,
        $buy_wallet_id,
        $data["pay_amount"],
        $data["buy_amount"],
        $data["fee"],
        $data["total"],
        "buy"
    );

    $pay_updated_balance = $wallet->getWalletBalance($pay_wallet_id)["balance"];


    //Update balances
    $wallet->updateBalance($pay_wallet_id, (float)$wallet->getWalletBalance($pay_wallet_id)["balance"] - (float)$data["total"]);
    $wallet->updateBalance($buy_wallet_id, (float)$wallet->getWalletBalance($buy_wallet_id)["balance"] + (float)$data["buy_amount"]);

    $stuff = json_encode($pay_updated_balance);

    $response->getBody()->write($stuff);
    return $response;
});

$app->post('/transactions/sell', function (Request $request, Response $response, array $args) {
    /*
     * {
  "ticker": "BTC",
  "pay_amount": "0.001",
  "buy_amount": 7.211,
  "fee": 0.36,
  "total": 6.851
}
     */

    $data = $request->getParsedBody();

    $transaction = new Transaction();
    $wallet = new Wallet();

    // Get wallet matching the payload ticker
    $pay_wallet_id = $wallet->getWalletByUserIdAndTicker($data["userId"], "CAD")["wallet_id"];
    $buy_wallet_id = $wallet->getWalletByUserIdAndTicker($data["userId"], $data["ticker"])["wallet_id"];

    $transaction->createTransaction(
        $data["userId"],
        $buy_wallet_id,
        $pay_wallet_id,
        $data["pay_amount"],
        $data["buy_amount"],
        $data["fee"],
        $data["total"],
        "sell"
    );

    //Update balances
    $wallet->updateBalance($pay_wallet_id, (float)$wallet->getWalletBalance($pay_wallet_id)["balance"] + (float)$data["total"]);
    $wallet->updateBalance($buy_wallet_id, (float)$wallet->getWalletBalance($buy_wallet_id)["balance"] - (float)$data["pay_amount"]);


    $stuff = json_encode($pay_wallet_id);

    $response->getBody()->write($stuff);
    return $response;
});

$app->post('/transactions/deposit', function (Request $request, Response $response, array $args) {
    /*
     * {
  "checked": false,
  "amount": "200"
}
     */

    $data = $request->getParsedBody();

    $transaction = new Transaction();
    $wallet = new Wallet();

    // Get wallet matching the payload ticker
    $pay_wallet_id = $wallet->getWalletByUserIdAndTicker($data["userId"], "CAD")["wallet_id"];
    $buy_wallet_id = $pay_wallet_id;

    $transaction->createTransaction(
        $data["userId"],
        $pay_wallet_id,
        '',
        $data["amount"],
        '',
        '',
        '',
        "deposit"
    );

    //Update balances
    $wallet->updateBalance($pay_wallet_id, (float)$wallet->getWalletBalance($pay_wallet_id)["balance"] + (float)$data["amount"]);



    $stuff = json_encode($pay_wallet_id);

    $response->getBody()->write($stuff);
    return $response;
});

$app->post('/transactions/withdraw', function (Request $request, Response $response, array $args) {
    /*
     * {
  "checked": false,
  "amount": "200"
}
     */

    $data = $request->getParsedBody();

    $transaction = new Transaction();
    $wallet = new Wallet();

    // Get wallet matching the payload ticker
    $pay_wallet_id = $wallet->getWalletByUserIdAndTicker($data["userId"], "CAD")["wallet_id"];
    $buy_wallet_id = $pay_wallet_id;

    $transaction->createTransaction(
        $data["userId"],
        $pay_wallet_id,
        '',
        $data["amount"],
        '',
        '',
        '',
        "deposit"
    );

    //Update balances
    $wallet->updateBalance($pay_wallet_id, (float)$wallet->getWalletBalance($pay_wallet_id)["balance"] - (float)$data["amount"]);



    $stuff = json_encode($pay_wallet_id);

    $response->getBody()->write($stuff);
    return $response;
});

$app->get('/transactions/getUserTransactions/{user_id}', function (Request $request, Response $response, array $args) {
    $transaction = new Transaction();
    $transactions = $transaction->getTransactionsByUserId($args['user_id']);

    $jsonobj = json_encode($transactions);

    $response->getBody()->write($jsonobj);
    return $response;
});