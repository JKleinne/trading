<?php
class Transaction extends Model
{
    public $user_id;
    public $pay_curr_id;
    public $buy_curr_id;
    public $pay_amount;
    public $buy_amount;
    public $date;

    function __construct(){
        parent::__construct();
    }

    public function createTransaction($user_id, $pay_curr_id, $buy_curr_id, $pay_amount, $buy_amount, $fee, $total, $type)
    {
        //be careful with date in the $currentdate
        $stmt = $this->_connection->prepare("INSERT INTO Transaction (user_id, pay_wallet_id, buy_wallet_id, pay_amount, buy_amount, fee, total, date, type) VALUES (:user_id, :pay_wallet_id, :buy_wallet_id, :pay_amount, :buy_amount, :fee, :total, NOW(), :type)");
        $stmt->execute(['user_id'=>$user_id, 'pay_wallet_id'=>$pay_curr_id, 'buy_wallet_id'=>$buy_curr_id, 'pay_amount'=>$pay_amount, 'buy_amount'=>$buy_amount, 'fee'=>$fee, 'total'=>$total, 'type'=>$type]);
    }

    public function getTransactionsByUserId($userId) {
        $stmt = $this->_connection->prepare("Select t.transaction_id, a.ticker, b.ticker, t.pay_amount, t.buy_amount, t.fee, t.total, t.date, t.type
                                                        FROM transaction t
                                                        INNER JOIN wallet a ON t.pay_wallet_id = a.wallet_id
                                                        INNER JOIN wallet b ON t.buy_wallet_id = b.wallet_id
                                                        WHERE t.user_id = :user_id;");
        $stmt->execute(['user_id'=>$userId]);
        return $stmt->fetchAll();
    }
}