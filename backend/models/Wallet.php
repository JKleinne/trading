<?php
class Wallet extends Model {
    function __construct(){
        parent::__construct();
    }

    public function getWallet($user_id, $ticker)
    {
        $stmt = $this->_connection->prepare("SELECT * FROM Wallet WHERE user_id = :user_id AND ticker = :ticker");
        $stmt->execute(['user_id'=>$user_id, 'ticker'=>$ticker]);
        return $stmt->fetch();
    }

    public function updateBalance($wallet_id, $newBalance) {
        $stmt = $this->_connection->prepare("UPDATE Wallet SET balance =:newBalance WHERE wallet_id =:wallet_id");
        $stmt->execute(['wallet_id'=>$wallet_id, 'newBalance'=>$newBalance]);
    }

    public function getWalletBalance($wallet_id) {
        $stmt = $this->_connection->prepare("SELECT balance FROM Wallet WHERE wallet_id = :wallet_id");
        $stmt->execute(['wallet_id'=>$wallet_id]);
        return $stmt->fetch();
    }
}