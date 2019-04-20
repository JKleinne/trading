<?php

session_start();
$app = $_SESSION["app"];

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once './models/Currency.php';
require_once './models/Transaction.php';
require_once './models/Wallet.php';

$app->post('/transactions/buy', function (Request $request, Response $response, array $args) {
    $data = $request->getParsedBody();

    $transaction = new Transaction();
    $wallet = new Wallet();

    // Get wallet matching the payload ticker
    $pay_wallet_id = $wallet->getWallet($data["userId"], "CAD")["wallet_id"];
    $buy_wallet_id = $wallet->getWallet($data["userId"], $data["ticker"])["wallet_id"];

    $transaction->createTransaction(
        $data["userId"],
        $pay_wallet_id,
        $buy_wallet_id,
        $data["pay_amount"],
        $data["buy_amount"],
        $data["fee"],
        $data["total"]
    );

    //Update balances
    $wallet->updateBalance($pay_wallet_id, -$data["total"]);
    $wallet->updateBalance($buy_wallet_id, $data["buy_amount"]);

    $stuff = json_encode($pay_wallet_id);

    $response->getBody()->write($stuff);
    return $response;
});

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