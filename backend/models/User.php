<?php

require_once '/Users/jonniequezada/Desktop/trading/backend/models/Model.php';

class User extends Model  //user is sub-class of database
{
	
	
	public $email;
	public $password;

	function __construct($email, $password) {
        parent::__construct();

        $this->email = $email;
        $this->password = $password;
    }

	public function getUser($username)
	{
		$stmt = $this->_connection->prepare("SELECT * FROM User WHERE username LIKE :username");
		$stmt->execute(['username'=>$username]);
		$stmt->setFetchMode(PDO::FETCH_CLASS, "User"); //datatype user
		return $stmt->fetch(); //it should return a user
	}
//	function getUser($username){
//		$stmt = $this->_connection->prepare("SELECT * FROM User WHERE username LIKE ?");
//		$stmt->execute([$username]);
//		$stmt->setFetchMode(PDO::FETCH_CLASS, "User");
//
//		return $stmt->fetch();
//	}
public function addUser($email, $password)
	{

		$stmt = $this->_connection->prepare("INSERT INTO User(email, password) VALUES(:email, :password)");
		$stmt->execute(['email'=>$email, 'password'=>$password]);
		return $this->email;


	}





}