<?php
class Admin extends Model
{
    public function getAllUsers()
    {
        $stmt = $this->_connection->prepare("SELECT * FROM User WHERE role != 'admin'");
        return $stmt->execute()->fetchAll();
    }

    public function freezeAccount($user_id, $status)
    {
        $stmt = $this->_connection->prepare("UPDATE User SET status = :status WHERE user_id = :user_id");
        $stmt->execute(['user_id'=>$user_id, 'status'=>$status]);
    }

//    public function getAllInfo($user_id)
//    {
//        $stmt = $this->_connection->prepare("SELECT *
//                                                         FROM User u
//                                                   INNER JOIN Profile p ON u.user_id = p.user_id
//                                                   INNER JOIN Wallet w ON u.user_id = w.user_id
//                                                   INNER JOIN Transaction t ON u.user_id = t.user_id
//                                                   WHERE u.user_id = :user_id");
//        return $stmt->execute(['user_id'=>$user_id])->fetchAll();
//    }

    public function getProfile($user_id)
    {
        $stmt = $this->_connection->prepare("SELECT * FROM Profile WHERE user_id = :user_id");
        return $stmt->execute(['user_id'=>$user_id])->fetch();
    }

    public function getWallets($user_id)
    {
        $stmt = $this->_connection->prepare("SELECT * FROM Wallet WHERE user_id = :user_id");
        return $stmt->execute(['user_id'=>$user_id])->fetchAll();
    }

    public function getTransactions($user_id)
    {
        $stmt = $this->_connection->prepare("SELECT * FROM Transaction WHERE user_id = :user_id");
        return $stmt->execute(['user_id'=>$user_id])->fetchAll();
    }
}