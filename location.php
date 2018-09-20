<?php

$woeid = $_GET['woeid'];
//var_dump($woeid);
$query = file_get_contents('http://weather-app.test/weather.php?command=location&woeid=' . $woeid );

if($query){
    return $query;
}