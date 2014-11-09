<?php
header ('Content-Type: text/html; charset=UTF-8');
ini_set('display_errors', true);
require_once('TwitterAPIExchange.php');

$hashtag = urlencode( $_POST['twitterHashtag'] );

/** Set access tokens here **/
$settings = array(
  'oauth_access_token' => "2862630646-hLlZBWDUtkMn3But93056TK3TUuAYrBIIpOBiSH",
    'oauth_access_token_secret' => "29G2Uu4ph4J3PAN3be6eKGJ7GwVd4jCDEHaM1IQZ4RnjZ",
    'consumer_key' => "6hVQNYTS2y1q6ChKqbYYVTaNY",
    'consumer_secret' => "FiZ7NfWAvqO2lOIajXaDOkv7a8eWqKorQHaw9LuVaibvkuyYtw"
);


$url = 'https://api.twitter.com/1.1/search/tweets.json';
$getfield = "?q=%23{$hashtag}&result_type=recent&count=5";
$requestMethod = 'GET';

$twitter = new TwitterAPIExchange($settings);
$response = $twitter->setGetfield($getfield)
                    ->buildOauth($url, $requestMethod)
                    ->performRequest();

echo ($response);