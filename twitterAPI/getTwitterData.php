<?php
ini_set('error_reporting', 0);
require_once('TwitterAPIExchange.php');

/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
    'oauth_access_token' => "2862630646-hLlZBWDUtkMn3But93056TK3TUuAYrBIIpOBiSH",
    'oauth_access_token_secret' => "29G2Uu4ph4J3PAN3be6eKGJ7GwVd4jCDEHaM1IQZ4RnjZ",
    'consumer_key' => $_POST["consumer_key"],
    'consumer_secret' => $_POST["consumer_secret"]
);


/** Perform a GET request and echo the response **/
/** Note: Set the GET field BEFORE calling buildOauth(); **/

$hashtag  = urlencode($_POST["hashtag"]);
$count    = $_POST["count"];

$url = 'https://api.twitter.com/1.1/search/tweets.json';
$getfield = "?q=%23{$hashtag}&result_type=recent&count={$count}";
$requestMethod = 'GET';

$twitter = new TwitterAPIExchange($settings);
echo $twitter->setGetfield($getfield)
    ->buildOauth($url, $requestMethod)
    ->performRequest();
