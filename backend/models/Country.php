<?php

class Country extends Model
{
    public $country_id;
    public $country_name;


    function __construct() {
        parent::__construct();
    }

    public function getCountries()
    {
        $stmt = $this->_connection->query("SELECT * FROM country")->fetchAll();
        return $stmt;
    }
}