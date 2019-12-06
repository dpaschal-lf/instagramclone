<?php

require_once('functions.php');
set_exception_handler('handleExceptions');
require_once('mysql_connect.php');

$postData = getBodyData();

if(empty($postData['email'])){
    throw new Exception('must supply a email');
}
if(empty($postData['password'])){
    throw new Exception('must supply a password');
}
$query = "SELECT `id`, `externalID`, `password`, `displayName`, `avatar` FROM `users` WHERE `email`=?";

$result = prepare_statement( $query , [$postData['email']]);

if(!$result){
    throw new Exception('error with user query');
}

if( $result->num_rows === 0){
    throw new Exception('invalid email or password');
}
$userData = $result->fetch_assoc();

if( password_verify( $postData['password'], $userData['password'])){
    $hashToken = md5( $postData['email'] . time() );
}
$insertQuery = "INSERT INTO `sessions` SET `userID`=?, `externalID`=?, `loggedIn`=NOW(), `token`=?";
$result = prepare_statement($insertQuery, [$userData['id'], $userData['externalID'], $hashToken]);
if(!$result || $db->affected_rows===0){
    throw new Exception('cannot create session');
}
unset ($userData['id']);
print(json_encode([
    'token'=>$hashToken,
    'userData'=>$userData
]));

?>