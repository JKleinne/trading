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

    public function createTransaction($pay_curr_id, $buy_curr_id, $pay_amount, $buy_amount)
    {
        //be careful with date in the $currentdate
        $stmt = $this->_connection->prepare("INSERT INTO Transaction (user_id, pay_curr_id, buy_curr_id, pay_amount, buy_amount, tr_date) VALUES (:user_id, :pay_curr_id, :buy_curr_id, :pay_amount, :buy_amount, :tr_date)");
        $currentDate = date("M,d,Y h:i:s A");
        $stmt->execute(['user_id'=>$_SESSION["user_id"], 'pay_curr_id'=>$pay_curr_id, 'buy_curr_id'=>$buy_curr_id, 'pay_amount'=>$pay_amount, 'buy_amount'=>$buy_amount, 'tr_date'=>$currentDate]);
    }

    public function getTransactions($date)
    {
        $stmt = $this->_connection->prepare("SELECT * FROM Transaction WHERE tr_date = :tr_date");
        $stmt->execute(['date'=>$date]);
        return $stmt;
    }
}