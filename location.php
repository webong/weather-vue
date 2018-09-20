<?php

$woeid = $_GET['woeid'];
//var_dump($woeid);
$query = file_get_contents('${process.env.WEATHER_API}?command=location&woeid=' . $woeid );

if($query){
    return $query;
}