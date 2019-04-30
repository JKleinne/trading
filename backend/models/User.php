<?php

class User extends Model
{
    public $email;
    public $password;
    public $two_fa;
    public $role;
    public $status;


    function __construct()
    {
        parent::__construct();
    }

    public function getUser($email)
    {
        $stmt = $this->_connection->prepare("SELECT * FROM User WHERE email = :email");
        $stmt->execute(['email' => $email]);
        return $stmt->fetch();
    }

    public function getUserWithId($user_id)
    {
        $stmt = $this->_connection->prepare("SELECT * FROM User WHERE user_id = :user_id");
        $stmt->execute(['user_id' => $user_id]);
        return $stmt->fetch();
    }

    public function addUser($email, $password, $two_fa, $role, $status)
    {
        $hash = password_hash($password, PASSWORD_DEFAULT);

        $stmt = $this->_connection->prepare("INSERT INTO User(email, password, two_fa, role, status) VALUES(:email, :password, :two_fa, :role, :status)");
        $stmt->execute(['email' => $email, 'password' => $hash, 'two_fa' => $two_fa, 'role' => $role, 'status' => $status]);

        $user_id = $this->getUser($email)["user_id"];

        // Create wallets
        $this->_connection->prepare("INSERT INTO wallet(user_id, ticker, balance) VALUES(:user_id, 'ADA', 0)")
            ->execute(['user_id' => $user_id]);
        $this->_connection->prepare("INSERT INTO wallet(user_id, ticker, balance) VALUES(:user_id, 'BCH', 0)")
            ->execute(['user_id' => $user_id]);
        $this->_connection->prepare("INSERT INTO wallet(user_id, ticker, balance) VALUES(:user_id, 'BNB', 0)")
            ->execute(['user_id' => $user_id]);
        $this->_connection->prepare("INSERT INTO wallet(user_id, ticker, balance) VALUES(:user_id, 'BTC', 0)")
            ->execute(['user_id' => $user_id]);
        $this->_connection->prepare("INSERT INTO wallet(user_id, ticker, balance) VALUES(:user_id, 'CAD', 0)")
            ->execute(['user_id' => $user_id]);
        $this->_connection->prepare("INSERT INTO wallet(user_id, ticker, balance) VALUES(:user_id, 'EOS', 0)")
            ->execute(['user_id' => $user_id]);
        $this->_connection->prepare("INSERT INTO wallet(user_id, ticker, balance) VALUES(:user_id, 'ETC', 0)")
            ->execute(['user_id' => $user_id]);
        $this->_connection->prepare("INSERT INTO wallet(user_id, ticker, balance) VALUES(:user_id, 'LTC', 0)")
            ->execute(['user_id' => $user_id]);
        $this->_connection->prepare("INSERT INTO wallet(user_id, ticker, balance) VALUES(:user_id, 'TRX', 0)")
            ->execute(['user_id' => $user_id]);
        $this->_connection->prepare("INSERT INTO wallet(user_id, ticker, balance) VALUES(:user_id, 'XLM', 0)")
            ->execute(['user_id' => $user_id]);

        return $this->getUser($email)["user_id"];
    }

    /*
     *
     * Select t.transaction_id, a.ticker, b.ticker, t.pay_amount, t.buy_amount, t.fee, t.total, t.date, t.type
FROM transaction t
INNER JOIN wallet a ON t.pay_wallet_id = a.wallet_id
INNER JOIN wallet b ON t.buy_wallet_id = b.wallet_id
WHERE t.user_id = :user_id;
     */

    public function get2FA($userId)
    {
        $stmt = $this->_connection->prepare("SELECT two_fa FROM User WHERE user_id = :userId");
        $stmt->execute(['userId' => $userId]);

        return $stmt->fetch();
    }

    public function setup2FA($userId, $secret)
    {
        $stmt = $this->_connection->prepare("UPDATE User SET two_fa = :secret WHERE user_id =:user_id");
        $stmt->execute(['user_id' => $userId, 'secret' => $secret]);
    }

    public function getRole($userId) {
        $stmt = $this->_connection->prepare("SELECT role FROM User WHERE user_id = :userId");
        $stmt->execute(['userId' => $userId]);

        return $stmt->fetch();
    }

    public function getAllUsers() {
        $stmt = $this->_connection->query("SELECT * FROM User")->fetchAll();
        return $stmt;
    }

    public function getStatus($userId) {
        $stmt = $this->_connection->prepare("SELECT status FROM User WHERE user_id = :userId");
        $stmt->execute(['userId' => $userId]);

        return $stmt->fetch();
    }

    public function setStatus($userId, $status)
    {
        $stmt = $this->_connection->prepare("UPDATE User SET status = :status WHERE user_id =:user_id");
        $stmt->execute(['user_id' => $userId, 'status' => $status]);
    }

    public function disable2FA($userId)
    {
        $stmt = $this->_connection->prepare("UPDATE User SET two_fa = '' WHERE user_id =:user_id");
        $stmt->execute(['user_id' => $userId]);
    }
}