<?php

class Currency extends Model
{
    public $currency_code;
    public $currency_name;
    public $currency_type;


    function __construct() {
        parent::__construct();
    }

    public function getFiatCurrencies()
    {
        $stmt = $this->_connection->query("SELECT * FROM currency WHERE currency_type = 'fiat'")->fetchAll();
        return $stmt;
    }

    public function getCryptoCurrencies()
    {
        $stmt = $this->_connection->query("SELECT * FROM currency WHERE currency_type = 'crypto'")->fetchAll();
        return $stmt;
    }
}