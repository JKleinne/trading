<?php
class Profile extends Model
{
    public $user_id;
	public $fname;
	public $lname;
	public $country_id;
	public $currency_code;
	
	public function __construct()
    {
        parent::__construct();

    }

    function addProfile($user_id, $fname, $lname, $country_id, $currency_code)
	{
		$stmt = $this->_connection->prepare("INSERT INTO profile (user_id, fname, lname, country_id, currency_code) VALUES (:user_id, :fname, :lname, :country_id, :currency_code)");
        $stmt->execute(['user_id'=>$user_id, 'fname'=>$fname, 'lname'=>$lname, 'country_id'=>$country_id, 'currency_code'=>$currency_code]);
	}

    public function addUser($email, $password, $two_fa, $role, $status)
    {
        $stmt = $this->_connection->prepare("INSERT INTO User(email, password, two_fa, role, status) VALUES(:email, :password, :two_fa, :role, :status)");
        $stmt->execute(['email'=>$email, 'password'=>$password, 'two_fa'=>$two_fa, 'role'=>$role, 'status'=>$status]);
    }
	
//	function modifyProfile($f, $l, $a, $ci, $cc)
//	{
//		$profile = new Profile($data["fname"], $data["lname"], $data["age"], $data["country_id"], $data["currency_code"]);
//
//		$stmt = $DBH->prepare("UPDATE profile SET fname = :fname, lname = :lname, age = :age, country_id = :country_id, currency_code = :currency_code WHERE user_id = :user_id");
//		$stmt = execute((array)$profile, $_SESSION["user_id"]);
//	}
}