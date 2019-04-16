<?php
class Balance extends Model
{
    public $user_id;
    public $currency_code;
    public $balance;

    function __construct(){
        parent::__construct();
    }

	function createBalance($currency_code, $balance)
	{
		$stmt = $this->_connection->prepare("INSERT INTO Balance(:user_id, :currency_code, :balance)");
		$stmt->execute(['user_id'=>$_SESSION["user_id"], 'currency_code'=>$currency_code, 'balance'=>$balance]);
	}
	
	function withdraw($amount, $currency_code)
	{
		$stmt = $this->_connection->prepare("SELECT balance FROM balance WHERE user_id = :user_id AND currency_code = :currency_code");
		$currentVal = $stmt->execute(['user_id'=>$_SESSION["user_id"], 'currency_code'=>$currency_code]);
		$newBalance = $currentVal + $amount;
		
		$stmt = $this->_connection->prepare("UPDATE balance SET balance = :balance WHERE user_id = :user_id AND currency_code = :currency_code");
		$stmt->execute(['balance'=>$newBalance, 'user_id'=>$_SESSION["user_id"], 'currency_code'=>$currency_code]);
	}
	
	function deposit($amount, $currency_code)
	{
        $stmt = $this->_connection->prepare("SELECT balance FROM balance WHERE user_id = :user_id AND currency_code = :currency_code");
        $currentVal = $stmt->execute(['user_id'=>$_SESSION["user_id"], 'currency_code'=>$currency_code]);
        $newBalance = $currentVal - $amount;

        $stmt = $this->_connection->prepare("UPDATE balance SET balance = :balance WHERE user_id = :user_id AND currency_code = :currency_code");
        $stmt->execute(['balance'=>$newBalance, 'user_id'=>$_SESSION["user_id"], 'currency_code'=>$currency_code]);
	}

	function buy($pay_amount, $pay_currency_code, $buy_amount, $buy_currency_code)
    {
        $stmt = $this->_connection->prepare("SELECT balance FROM balance WHERE user_id = :user_id AND currency_code = :currency_code");
        $payCurrentVal = $stmt->execute(['user_id'=>$_SESSION["user_id"], 'currency_code'=>$pay_currency_code]);
        $payNewBalance = $payCurrentVal - $pay_amount;

        $stmt = $this->_connection->prepare("UPDATE balance SET balance = :balance WHERE user_id = :user_id AND currency_code = :currency_code");
        $stmt->execute(['balance'=>$payNewBalance, 'user_id'=>$_SESSION["user_id"], 'currency_code'=>$pay_currency_code]);

        $stmt = $this->_connection->prepare("SELECT balance FROM balance WHERE user_id = :user_id AND currency_code = :currency_code");
        $buyCurrentVal = $stmt->execute(['user_id'=>$_SESSION["user_id"], 'currency_code'=>$buy_currency_code]);
        $buyNewBalance = $buyCurrentVal - $buy_amount;

        $stmt = $this->_connection->prepare("UPDATE balance SET balance = :balance WHERE user_id = :user_id AND currency_code = :currency_code");
        $stmt->execute(['balance'=>$buyNewBalance, 'user_id'=>$_SESSION["user_id"], 'currency_code'=>$buy_currency_code]);
    }
}