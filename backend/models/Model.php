<?php


class Model
{
    protected $_connection;
    function __construct() //reserved name for constructor
    {
        $host = '127.0.0.1:3306';
        $dbname = 'crypto_trading';
        $user = 'root';
        $pass = '';
        try{
            $this->_connection = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
            //this will build PDO object to access database
        }catch(PDOException $e) {
            echo $e->getMessage();
        }
    }
}